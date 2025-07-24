import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { editPost, uploadMedia } from "../../services/api/postServices";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Media, MediaTypes, MediaUpload } from "../../interfaces/postInterfaces";
import "material-icons";

export default function PostEdit() {
  const location = useLocation();
  const navigate = useNavigate();
  const [newText, setNewText] = useState<string>(location.state.postText);
  const [existingMedia] = useState<Media[]>(
    location.state.postMedia || [],
  );
  const [newMedia, setNewMedia] = useState<MediaUpload[]>([]);
  const [uploadingFiles, setUploadingFiles] = useState<Set<string>>(new Set());
  const [removedMediaUrls, setRemovedMediaUrls] = useState<string[]>([]);

  const postEdit = useMutation({
    mutationFn: editPost,
    onSuccess: () => {
      navigate("/home");
    },
  });

  const mediaUpload = useMutation({
    mutationFn: uploadMedia,
    onError: (error) => {
      toast.error(error.message);
    },
  });

  async function submitEdit() {
    try {
      const uploadedMediaResponses = await Promise.all(
        newMedia.map(async (media) => {
          const formData = new FormData();
          formData.append("file", media.file);
          formData.append("type", media.type);

          setUploadingFiles((prev) => {
            const updated = new Set(prev);
            updated.add(media.file.name);
            return updated;
          });

          const response = await mediaUpload.mutateAsync(formData);

          setUploadingFiles((prev) => {
            const updated = new Set(prev);
            updated.delete(media.file.name);
            return updated;
          });

          return response;
        }),
      );

      const remainingExistingMedia = existingMedia.filter(
        (media) => !removedMediaUrls.includes(media.url),
      );

      console.log(uploadedMediaResponses, remainingExistingMedia)

      toast.promise(
        postEdit.mutateAsync({
          postId: location.state.postId,
          text: newText,
          media: [...remainingExistingMedia, ...uploadedMediaResponses],
        }),
        {
          loading: "Saving post...",
          success: "Post edited successfully!",
          error: (error) => error.message,
        },
      );
    } catch (error) {
      console.error("Error updating post", error);
    }
  }

  function handleFileUpload(
    event: React.ChangeEvent<HTMLInputElement>,
    type: string,
  ) {
    const files = event.target.files;
    if (files) {
      const uploadedFiles: MediaUpload[] = [];
      Array.from(files).forEach((file) => {
        let mediaType: MediaTypes | null = null;

        switch (type) {
          case "image":
            mediaType = MediaTypes.Image;
            break;
          case "video":
            mediaType = MediaTypes.Video;
            break;
          case "audio":
            mediaType = MediaTypes.Audio;
            break;
          case "document":
            mediaType = MediaTypes.Document;
            break;
          default:
            mediaType = null;
        }

        if (mediaType) {
          uploadedFiles.push({ type: mediaType, file });
        } else {
          toast.error("Unsupported file type.");
        }
      });

      setNewMedia((prevMedia) => [...prevMedia, ...uploadedFiles]);
    }
  }

  function handleRemoveNewFile(index: number) {
    const updatedMedia = [...newMedia];
    const fileName = updatedMedia[index].file.name;

    setUploadingFiles((prev) => {
      const updated = new Set(prev);
      updated.delete(fileName);
      return updated;
    });

    updatedMedia.splice(index, 1);
    setNewMedia(updatedMedia);
  }

  function handleRemoveExistingFile(url: string) {
    setRemovedMediaUrls((prev) => [...prev, url]);
  }

  const isEditing = postEdit.isPending || mediaUpload.isPending;

  const filteredExistingMedia = existingMedia.filter(
    (media) => !removedMediaUrls.includes(media.url),
  );

  const getMediaTypeDisplay = (type: MediaTypes) => {
    switch (type) {
      case MediaTypes.Audio:
        return {
          icon: "audiotrack",
          bgClass: "bg-purple-50",
          textClass: "text-purple-600",
        };
      case MediaTypes.Document:
        return {
          icon: "description",
          bgClass: "bg-orange-50",
          textClass: "text-orange-600",
        };
      case MediaTypes.Video:
        return {
          icon: "videocam",
          bgClass: "bg-green-50",
          textClass: "text-green-600",
        };
      default:
        return {
          icon: "insert_drive_file",
          bgClass: "bg-blue-50",
          textClass: "text-blue-600",
        };
    }
  };

  return (
    <div className="flex flex-col h-screen bg-charcoalWhite m-0 justify-center items-center">
      <div className="flex flex-col bg-lightGray p-5 rounded-xl w-10/12 sm:w-8/12 md:w-7/12">
        <h1 className="font-bold text-[18px] text-warmBlack sm:text-[25px] mb-6">
          Edit Post
        </h1>

        <textarea
          id="postText"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          placeholder="Speak your mind..."
          disabled={isEditing}
          className="bg-white outline-[0.7px] text-[14px] text-charcoalBlack h-50 px-2 py-3 rounded-md hover:cursor-text hover:outline-[1px] hover:bg-gray-100 focus:outline-[1.5px] w-full mb-4"
        ></textarea>

        <div className="flex flex-row pt-2 mb-4">
          <label className="flex flex-col items-center mr-2 bg-blue-200 text-blue-600 p-1.5 rounded-full hover:bg-blue-300 transition cursor-pointer">
            <span className="material-icons">image</span>
            <input
              type="file"
              accept="image/*"
              className={`hidden ${isEditing ? "opacity-50" : ""}`}
              disabled={isEditing}
              onChange={(e) => handleFileUpload(e, "image")}
            />
          </label>
          <label className="flex flex-col items-center mr-2 bg-green-200 text-green-600 p-1.5 rounded-full hover:bg-green-300 transition cursor-pointer">
            <span className="material-icons">videocam</span>
            <input
              type="file"
              accept="video/*"
              className={`hidden ${isEditing ? "opacity-50" : ""}`}
              disabled={isEditing}
              onChange={(e) => handleFileUpload(e, "video")}
            />
          </label>
          <label className="flex flex-col items-center mr-2 bg-purple-200 text-purple-600 p-1.5 rounded-full hover:bg-purple-300 transition cursor-pointer">
            <span className="material-icons">audiotrack</span>
            <input
              type="file"
              accept="audio/*"
              className={`hidden ${isEditing ? "opacity-50" : ""}`}
              disabled={isEditing}
              onChange={(e) => handleFileUpload(e, "audio")}
            />
          </label>
          <label className="flex flex-col items-center bg-orange-200 text-orange-600 p-1.5 rounded-full hover:bg-orange-300 transition cursor-pointer">
            <span className="material-icons">description</span>
            <input
              type="file"
              accept=".txt,.pdf,.doc,.docx"
              className={`hidden ${isEditing ? "opacity-50" : ""}`}
              disabled={isEditing}
              onChange={(e) => handleFileUpload(e, "document")}
            />
          </label>
        </div>

        {filteredExistingMedia.length > 0 && (
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-2">
              Existing media ({filteredExistingMedia.length})
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {filteredExistingMedia.map((media, index) => {
                const { icon, bgClass, textClass } = getMediaTypeDisplay(
                  media.type,
                );
                return (
                  <div
                    key={index}
                    className="relative group rounded-lg shadow-md overflow-hidden bg-white"
                  >
                    <div className="relative h-32 w-full flex items-center justify-center bg-gray-100">
                      {media.type === MediaTypes.Image && (
                        <img
                          src={media.url}
                          alt="Media"
                          className="h-full w-full object-cover"
                        />
                      )}

                      {media.type === MediaTypes.Video && (
                        <div className="h-full w-full relative">
                          <video
                            src={media.url}
                            className="h-full w-full object-cover"
                          />
                          <span className="absolute inset-0 flex items-center justify-center">
                            <span className="material-icons text-white text-4xl bg-black bg-opacity-30 rounded-full p-2">
                              play_arrow
                            </span>
                          </span>
                        </div>
                      )}

                      {media.type !== MediaTypes.Image &&
                        media.type !== MediaTypes.Video && (
                          <div
                            className={`h-full w-full flex items-center justify-center ${bgClass}`}
                          >
                            <span
                              className={`material-icons ${textClass} text-5xl`}
                            >
                              {icon}
                            </span>
                          </div>
                        )}
                    </div>

                    <div className="px-2 py-1 border-t">
                      <p className="text-xs text-gray-700 truncate font-medium">
                        {media.url.split("/").pop() || "File"}
                      </p>
                    </div>

                    <button
                      onClick={() => handleRemoveExistingFile(media.url)}
                      disabled={isEditing}
                      className="absolute top-1 right-1 bg-white rounded-full shadow h-5 w-5 flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity group-hover:opacity-100"
                    >
                      <span className="material-icons text-crimsonRed text-sm">
                        clear
                      </span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {newMedia.length > 0 && (
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-2">
              New media ({newMedia.length})
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {newMedia.map((media, index) => {
                const isUploading = uploadingFiles.has(media.file.name);
                return (
                  <div
                    key={index}
                    className="relative group rounded-lg shadow-md overflow-hidden bg-white"
                  >
                    <div className="relative h-32 w-full flex items-center justify-center bg-gray-100">
                      {isUploading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
                          <div className="w-6 h-6 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                        </div>
                      )}

                      {media.type === MediaTypes.Image && (
                        <img
                          src={URL.createObjectURL(media.file)}
                          alt="Uploaded"
                          className={`h-full w-full object-cover ${isUploading ? "blur-sm" : ""}`}
                        />
                      )}

                      {media.type === MediaTypes.Video && (
                        <div className="h-full w-full relative">
                          <video
                            src={URL.createObjectURL(media.file)}
                            className={`h-full w-full object-cover ${isUploading ? "blur-sm" : ""}`}
                          />
                          <span className="absolute inset-0 flex items-center justify-center">
                            <span className="material-icons text-white text-4xl bg-black bg-opacity-30 rounded-full p-2">
                              play_arrow
                            </span>
                          </span>
                        </div>
                      )}

                      {media.type === MediaTypes.Audio && (
                        <div className="h-full w-full flex items-center justify-center bg-purple-50">
                          <span className="material-icons text-purple-600 text-5xl">
                            audiotrack
                          </span>
                        </div>
                      )}

                      {media.type === MediaTypes.Document && (
                        <div className="h-full w-full flex items-center justify-center bg-orange-50">
                          <span className="material-icons text-orange-600 text-5xl">
                            description
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="px-2 py-1 border-t">
                      <p className="text-xs text-gray-700 truncate font-medium">
                        {media.file.name}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {(media.file.size / 1024).toFixed(1)} KB
                      </p>
                    </div>

                    <button
                      onClick={() => handleRemoveNewFile(index)}
                      disabled={isEditing}
                      className="absolute top-1 right-1 bg-white rounded-full shadow h-6 w-6  flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity group-hover:opacity-100"
                    >
                      <span className="material-icons text-crimsonRed text-sm">
                        clear
                      </span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="flex flex-row justify-between mt-2">
          <button
            onClick={submitEdit}
            className={`bg-crimsonRed text-warmWhite px-6 py-2 rounded-3xl cursor-pointer hover:bg-red-700 transition duration-400 ease-in-out font-medium ${isEditing ? "opacity-50" : ""}`}
            disabled={isEditing}
          >
            {isEditing ? (
              <span className="flex items-center">
                <span className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin mr-2"></span>
                Saving...
              </span>
            ) : (
              "Save Changes"
            )}
          </button>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="bg-gray-500 text-warmWhite px-4 py-2 rounded-3xl cursor-pointer hover:bg-gray-700 transition duration-400 ease-in-out"
            disabled={isEditing}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
