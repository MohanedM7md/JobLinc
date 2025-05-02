import { useState, useEffect, ReactElement } from "react";

interface DocumentPreviewProps {
  url: string;
  mimeType: string;
}

export default function DocumentPreview({
  url,
  mimeType,
}: DocumentPreviewProps) {
  const [previewContent, setPreviewContent] = useState<ReactElement | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAndProcessDocument(): Promise<void> {
      try {
        setIsLoading(true);
        setError(null);

        if (!url) {
          throw new Error("No document URL provided");
        }

        if (mimeType.includes("pdf")) {
          await handleDocumentPreview(url, "PDF");
        } else if (
          mimeType.includes("docx") ||
          mimeType.includes(
            "vnd.openxmlformats-officedocument.wordprocessingml.document",
          )
        ) {
          await handleDocumentPreview(url, "DOCX");
        } else if (mimeType.includes("doc") || mimeType.includes("msword")) {
          await handleDocumentPreview(url, "DOC");
        } else if (mimeType.includes("text/plain")) {
          await handleDocumentPreview(url, "TXT");
        } else {
          await handleDocumentPreview(url, "GENERIC");
        }
      } catch (err) {
        console.error("Error loading document:", err);
        setError(
          `Failed to load document: ${err instanceof Error ? err.message : "Unknown error"}`,
        );
      } finally {
        setIsLoading(false);
      }
    }

    fetchAndProcessDocument();
  }, [url, mimeType]);

  async function handleDocumentPreview(
    docUrl: string,
    docType: string,
  ): Promise<void> {
    try {
      let viewerUrl = docUrl;
      let viewerLabel = "Download Document";

      if (docType === "DOCX" || docType === "DOC") {
        viewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(docUrl)}&embedded=true`;
        viewerLabel = `Download ${docType}`;
      }

      setPreviewContent(
        <div className="flex flex-col items-center w-full">
          <div className="w-full border border-gray-200 rounded overflow-hidden">
            <iframe
              src={viewerUrl}
              className="w-full h-96"
              title={`${docType} Document`}
              sandbox="allow-scripts allow-same-origin allow-popups"
            />
          </div>

          <a
            href={docUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded"
          >
            {viewerLabel}
          </a>
        </div>,
      );
    } catch (error) {
      throw new Error(
        `Document preview failed: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64 bg-gray-100">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 bg-gray-100">
        <div className="text-red-500 mb-2">{error}</div>
        <p className="text-gray-600 text-sm mb-4">
          We couldn't display this document. Please download it to view.
        </p>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-block bg-blue-500 text-white px-4 py-2 rounded"
        >
          Download Document
        </a>
      </div>
    );
  }

  return <div className="document-preview w-full">{previewContent}</div>;
}
