import { Media, MediaTypes } from "../../interfaces/postInterfaces";
import { useState } from "react";
import "material-icons";
import DocumentPreview from "./DocumentPreview";

interface MediaProps {
  media: Media[];
}

export default function PostMedia(props: MediaProps) {
  const [showMediaModal, setShowMediaModal] = useState(false);
  const [selectedMediaIndex, setSelectedMediaIndex] = useState(0);

  const MAX_PREVIEW_ITEMS = 4;
  const hasMoreItems = props.media.length > MAX_PREVIEW_ITEMS;

  const previewMedia = props.media.slice(0, MAX_PREVIEW_ITEMS);

  const getGridClasses = (): string => {
    switch (previewMedia.length) {
      case 1:
        return "grid-cols-1 grid-rows-1";
      case 2:
        return "grid-cols-2 grid-rows-1";
      case 3:
        return "grid-cols-2 grid-rows-2";
      case 4:
      default:
        return "grid-cols-2 grid-rows-2";
    }
  };

  // Dynamic height class based on media type
  const getHeightClass = (mediaItems = previewMedia): string => {
    // Check if any item is a document
    const hasDocuments = mediaItems.some(item => item.type === MediaTypes.Document);
    
    if (hasDocuments) {
      return "h-128";
    }
    
    return mediaItems.length <= 2 ? "h-72" : "h-96";
  };

  const getDocumentMimeType = (url: string): string => {
    if (url.endsWith(".pdf")) return "application/pdf";
    if (
      url.endsWith(".docx") ||
      url.includes(
        "vnd.openxmlformats-officedocument.wordprocessingml.document",
      )
    )
      return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
    if (url.endsWith(".doc")) return "application/msword";
    if (url.endsWith(".txt")) return "text/plain";
    if (url.includes("vnd_openxmlformats_officedocument_wordprocessingml"))
      return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
    return "application/octet-stream";
  };

  const renderMediaItem = (
    mediaItem: Media,
    index: number,
    inModal: boolean = false,
  ) => {
    const isLastPreviewItem =
      index === MAX_PREVIEW_ITEMS - 1 && hasMoreItems && !inModal;

    let classes = "w-full h-full object-cover overflow-hidden ";

    if (!inModal) {
      if (previewMedia.length === 1) {
        classes += "rounded-lg";
      } else if (previewMedia.length === 2) {
        classes += index === 0 ? "rounded-l-lg pr-1" : "rounded-r-lg pl-1";
      } else if (previewMedia.length === 3) {
        if (index === 0) {
          classes += "rounded-tl-lg rounded-bl-lg pr-1";
        } else {
          classes += index === 1 ? "rounded-tr-lg pb-1" : "rounded-br-lg pt-1";
        }
      } else {
        if (index === 0) {
          classes += "rounded-tl-lg pr-1 pb-1";
        } else if (index === 1) {
          classes += "rounded-tr-lg pl-1 pb-1";
        } else if (index === 2) {
          classes += "rounded-bl-lg pr-1 pt-1";
        } else {
          classes += "rounded-br-lg pl-1 pt-1";
        }
      }
    } else {
      classes += "rounded-lg";
    }

    switch (mediaItem.type) {
      case MediaTypes.Image:
        return (
          <div
            key={index}
            className={`relative ${classes}`}
            onClick={() => {
              setSelectedMediaIndex(index);
              setShowMediaModal(true);
            }}
          >
            <img
              src={mediaItem.url}
              alt={`media-${index}`}
              className="w-full h-full object-cover"
            />
            {isLastPreviewItem && (
              <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">
                  +{props.media.length - MAX_PREVIEW_ITEMS}
                </span>
              </div>
            )}
          </div>
        );

      case MediaTypes.Video:
        return (
          <div
            key={index}
            className={`relative ${classes}`}
            onClick={() => {
              setSelectedMediaIndex(index);
              setShowMediaModal(true);
            }}
          >
            {inModal ? (
              <video controls className="w-full h-full object-contain">
                <source src={mediaItem.url} type="video/mp4" />
                Your browser does not support video playback.
              </video>
            ) : (
              <>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="material-icons text-white text-5xl bg-black bg-opacity-40 rounded-full p-2">
                    play_arrow
                  </span>
                </div>
                <video
                  src={mediaItem.url}
                  className="w-full h-full object-cover"
                  preload="metadata"
                />
              </>
            )}
            {isLastPreviewItem && (
              <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">
                  +{props.media.length - MAX_PREVIEW_ITEMS}
                </span>
              </div>
            )}
          </div>
        );

      case MediaTypes.Audio:
        return (
          <div
            key={index}
            className={`relative ${classes} bg-gray-800 flex items-center justify-center`}
            onClick={() => {
              setSelectedMediaIndex(index);
              setShowMediaModal(true);
            }}
          >
            {inModal ? (
              <audio controls className="w-full">
                <source src={mediaItem.url} type="audio/mpeg" />
                Your browser does not support audio playback.
              </audio>
            ) : (
              <div className="text-center p-4">
                <span className="material-icons text-white text-5xl">
                  audiotrack
                </span>
                <p className="text-white mt-2 text-sm truncate">
                  {"Audio file"}
                </p>
              </div>
            )}
            {isLastPreviewItem && (
              <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">
                  +{props.media.length - MAX_PREVIEW_ITEMS}
                </span>
              </div>
            )}
          </div>
        );

      case MediaTypes.Document:
        return (
          <div
            key={index}
            className={`relative ${classes} ${!inModal ? 'bg-gray-50' : ''} flex items-center justify-center`}
            onClick={() => {
              setSelectedMediaIndex(index);
              setShowMediaModal(true);
            }}
          >
            {inModal ? (
              <DocumentPreview
                url={mediaItem.url}
                mimeType={getDocumentMimeType(mediaItem.url)}
              />
            ) : (
              <div className="text-center p-4">
                <span className="material-icons text-gray-700 text-5xl">
                  {mediaItem.url.includes(".pdf")
                    ? "picture_as_pdf"
                    : mediaItem.url.includes(".doc")
                      ? "description"
                      : "article"}
                </span>
                <p className="text-gray-700 mt-2 text-sm truncate">
                  {mediaItem.url.split("/").pop() || "Document"}
                </p>
              </div>
            )}
            {isLastPreviewItem && (
              <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">
                  +{props.media.length - MAX_PREVIEW_ITEMS}
                </span>
              </div>
            )}
          </div>
        );

      default:
        return (
          <div
            key={index}
            className={`relative ${classes} bg-gray-800 flex items-center justify-center`}
            onClick={() => {
              setSelectedMediaIndex(index);
              setShowMediaModal(true);
            }}
          >
            <div className="text-center">
              <span className="material-icons text-white text-5xl">
                insert_drive_file
              </span>
              <p className="text-white mt-2 text-sm truncate">{"File"}</p>
            </div>
            {isLastPreviewItem && (
              <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">
                  +{props.media.length - MAX_PREVIEW_ITEMS}
                </span>
              </div>
            )}
          </div>
        );
    }
  };

  const MediaModal = () => {
    if (!showMediaModal) return null;

    const currentMedia = props.media[selectedMediaIndex];
    const isDocument = currentMedia.type === MediaTypes.Document;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center">
        <div className="w-full max-w-4xl max-h-screen flex flex-col p-4">
          <button
            className="material-icons text-white text-3xl self-end mb-2"
            onClick={() => setShowMediaModal(false)}
          >
            close
          </button>

          <div className={`${isDocument ? 'h-128' : 'h-96'} mb-4 bg-white rounded-lg overflow-hidden`}>
            {renderMediaItem(
              props.media[selectedMediaIndex],
              selectedMediaIndex,
              true,
            )}
          </div>
          <div className="flex overflow-x-auto py-2 gap-2">
            {props.media.map((item, index) => (
              <div
                key={`thumb-${index}`}
                className={`w-16 h-16 flex-shrink-0 cursor-pointer ${selectedMediaIndex === index ? "border-2 border-blue-400" : ""}`}
                onClick={() => setSelectedMediaIndex(index)}
              >
                {item.type === MediaTypes.Image ? (
                  <img
                    src={item.url}
                    alt={`thumb-${index}`}
                    className="w-full h-full object-cover"
                  />
                ) : item.type === MediaTypes.Video ? (
                  <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                    <span className="material-icons text-white">
                      play_arrow
                    </span>
                  </div>
                ) : item.type === MediaTypes.Audio ? (
                  <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                    <span className="material-icons text-white">
                      audiotrack
                    </span>
                  </div>
                ) : item.type === MediaTypes.Document ? (
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                    <span className="material-icons text-gray-600">
                      {item.url.includes(".pdf")
                        ? "picture_as_pdf"
                        : item.url.includes(".doc")
                          ? "description"
                          : "article"}
                    </span>
                  </div>
                ) : (
                  <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                    <span className="material-icons text-white">
                      insert_drive_file
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  if (!props.media || props.media.length === 0) {
    return null;
  }

  return (
    <>
      <div
        data-testid="media-rendering"
        className={`grid ${getGridClasses()} gap-1 ${getHeightClass()} w-full cursor-pointer`}
      >
        {previewMedia.map((item, index) => renderMediaItem(item, index))}
      </div>
      <MediaModal />
    </>
  );
}