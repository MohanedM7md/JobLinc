import { useMemo } from "react";
import { TaggedObject } from "@interfaces/postInterfaces";

interface FormattedPostTextProps {
  text: string;
  taggedUsers: TaggedObject[];
  taggedCompanies: TaggedObject[];
}

// Function to extract URLs from text
const extractUrls = (
  text: string,
): { url: string; startIndex: number; endIndex: number }[] => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const urls: { url: string; startIndex: number; endIndex: number }[] = [];

  let match;
  while ((match = urlRegex.exec(text)) !== null) {
    urls.push({
      url: match[0],
      startIndex: match.index,
      endIndex: match.index + match[0].length - 1,
    });
  }

  return urls;
};

export default function FormattedPostText({
  text,
  taggedUsers,
  taggedCompanies,
}: FormattedPostTextProps) {
  // Combine and sort all tagged items by index (ascending)
  const sortedTaggedItems = useMemo(() => {
    const allTagged = [...taggedUsers, ...taggedCompanies].sort(
      (a, b) => a.index - b.index,
    );
    return allTagged;
  }, [taggedUsers, taggedCompanies]);

  // Extract URLs from the text
  const urls = useMemo(() => extractUrls(text), [text]);

  // Process text to create formatted segments
  const formattedSegments = useMemo(() => {
    // First, create a map of all character positions and their styles/actions
    const characterStyles = new Array(text.length).fill(null);
    const linkMap = new Map<number, string>(); // Maps start indices to URLs

    // Mark tag positions
    sortedTaggedItems.forEach((item) => {
      const textBeforeIndex = text.substring(0, item.index + 1);
      const atIndex = textBeforeIndex.lastIndexOf("@");

      if (atIndex !== -1) {
        // Mark all characters from @ to the index as "tag"
        for (let i = atIndex; i <= item.index; i++) {
          characterStyles[i] = "tag";
        }
      }
    });

    // Mark URL positions
    urls.forEach((urlInfo) => {
      // Store the URL for later use
      linkMap.set(urlInfo.startIndex, urlInfo.url);

      // Mark all characters in the URL
      for (let i = urlInfo.startIndex; i <= urlInfo.endIndex; i++) {
        characterStyles[i] = "url";
      }
    });

    // Now build the segments by grouping consecutive characters with the same style
    const segments = [];
    let currentStyle = null;
    let currentSegmentStart = 0;
    let currentUrl = "";
    let segmentCounter = 0;

    for (let i = 0; i <= text.length; i++) {
      // We check if we're at the end or if the style has changed
      if (i === text.length || characterStyles[i] !== currentStyle) {
        // If we have collected characters, add the segment
        if (i > currentSegmentStart) {
          const segmentText = text.substring(currentSegmentStart, i);
          const key = `segment-${segmentCounter++}`;

          if (currentStyle === "tag") {
            segments.push(
              <span key={key} className="text-blue-400">
                {segmentText}
              </span>,
            );
          } else if (currentStyle === "url") {
            segments.push(
              <a
                key={key}
                href={currentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                {segmentText}
              </a>,
            );
          } else {
            segments.push(<span key={key}>{segmentText}</span>);
          }
        }

        // Start a new segment
        currentSegmentStart = i;
        currentStyle = i < text.length ? characterStyles[i] : null;

        // If this is the start of a URL, store the URL
        if (currentStyle === "url") {
          currentUrl = linkMap.get(i) || "";
        }
      }
    }

    return segments;
  }, [text, sortedTaggedItems, urls]);

  return <>{formattedSegments}</>;
}
