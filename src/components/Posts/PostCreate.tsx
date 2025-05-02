import { useState } from "react";
import { createPost, uploadMedia } from "../../services/api/postServices";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { MediaUpload, MediaTypes } from "../../interfaces/postInterfaces";
import "material-icons";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import { Globe, Users, ChevronDown } from "lucide-react";

interface AddPostProps {
  onUpdate: () => void;
  onClose: () => void;
}

export default function PostCreate(props: AddPostProps) {
  const [newText, setNewText] = useState<string>("");
  const [newMedia, setNewMedia] = useState<MediaUpload[]>([]);
  const [isPublic, setIsPublic] = useState<boolean>(true);
  const [uploadingFiles, setUploadingFiles] = useState<Set<string>>(new Set());

  const addPost = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      props.onUpdate();
      props.onClose();
    },
  });

  const mediaUpload = useMutation({
    mutationFn: uploadMedia,
    onError: (error) => {
      toast.error(error.message);
    },
  });

  async function handleAddPost() {
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

      toast.promise(
        addPost.mutateAsync({ text: newText, media: uploadedMediaResponses, isPublic }),
        {
          loading: "Creating post...",
          success: "Post created successfully!",
          error: (error) => error.message,
        },
      );
    } catch (error) {
      console.error("Error posting", error);
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

  function handleRemoveFile(index: number) {
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

  const isPosting = addPost.isPending || mediaUpload.isPending;

  return (
    <div className="flex flex-col">
      <h1 className="font-bold text-[18px] text-warmBlack sm:text-[25px] mb-6">
        Create a new Post
      </h1>

      <div className="mb-4">
        <p className="font-bold text-[16px] text-warmBlack mb-2 flex items-center">
          <span className="mr-1">Who should see this?</span>
        </p>

        <Menu as="div" className="relative inline-block">
          {({ open }) => (
            <>
              <MenuButton className="flex items-center justify-between px-4 py-2 bg-gray-100 hover:bg-gray-200 text-warmBlack rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-crimsonRed focus:ring-opacity-50 shadow-sm">
                <span className="flex items-center">
                  {isPublic ? (
                    <Globe className="w-4 h-4 mr-2 text-blue-600" />
                  ) : (
                    <Users className="w-4 h-4 mr-2 text-green-600" />
                  )}
                  <span className="font-medium">
                    {isPublic ? "Everyone" : "Connections"}
                  </span>
                </span>
                <ChevronDown className="w-4 h-4 ml-2 text-gray-500" />
              </MenuButton>

              <AnimatePresence>
                {open && (
                  <MenuItems
                    static
                    modal={false}
                    className="absolute left-0 mt-1 w-48 origin-top-left bg-white border border-gray-200 rounded-lg shadow-lg focus:outline-none z-50 overflow-hidden"
                    as={motion.div}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <MenuItem>
                      
                        <button
                          onClick={() => setIsPublic(true)}
                          className={`${
                            isPublic ? "bg-blue-50" : ""
                          } w-full flex items-center px-4 py-3 text-sm transition duration-200 ease-in-out border-b border-gray-100`}
                        >
                          <Globe className="w-5 h-5 mr-3 text-blue-600" />
                          <div className="flex flex-col items-start">
                            <span className="font-medium text-warmBlack">
                              Everyone
                            </span>
                            <span className="text-xs text-gray-500">
                              Visible to all users
                            </span>
                          </div>
                        </button>
                      
                    </MenuItem>
                    <MenuItem>
                      
                        <button
                          onClick={() => setIsPublic(false)}
                          className={`${
                            !isPublic ? "bg-blue-50" : ""
                          } w-full flex items-center px-4 py-3 text-sm transition duration-200 ease-in-out`}
                        >
                          <Users className="w-5 h-5 mr-3 text-green-600" />
                          <div className="flex flex-col items-start">
                            <span className="font-medium text-warmBlack">
                              Connections
                            </span>
                            <span className="text-xs text-gray-500">
                              Only visible to your connections
                            </span>
                          </div>
                        </button>
                      
                    </MenuItem>
                  </MenuItems>
                )}
              </AnimatePresence>
            </>
          )}
        </Menu>
      </div>

      <textarea
        id="postText"
        value={newText}
        disabled={isPosting}
        placeholder="Speak your mind..."
        onChange={(e) => setNewText(e.target.value)}
        className="bg-white outline-[0.7px] text-[14px] text-charcoalBlack h-50 px-2 py-3 rounded-md hover:cursor-text hover:outline-[1px] hover:bg-gray-100 focus:outline-[1.5px]"
      ></textarea>
      <div className="flex flex-row pt-4">
        <label className="flex flex-col items-center mr-2 bg-blue-200 text-blue-600 p-1.5 rounded-full hover:bg-blue-300 transition cursor-pointer">
          <span className="material-icons">image</span>
          <input
            type="file"
            accept="image/*"
            className={`hidden ${isPosting ? "opacity-50" : ""}`}
            disabled={isPosting}
            onChange={(e) => handleFileUpload(e, "image")}
          />
        </label>
        <label className="flex flex-col items-center mr-2 bg-green-200 text-green-600 p-1.5 rounded-full hover:bg-green-300 transition cursor-pointer">
          <span className="material-icons">videocam</span>
          <input
            type="file"
            accept="video/*"
            className={`hidden ${isPosting ? "opacity-50" : ""}`}
            disabled={isPosting}
            onChange={(e) => handleFileUpload(e, "video")}
          />
        </label>
        <label className="flex flex-col items-center mr-2 bg-purple-200 text-purple-600 p-1.5 rounded-full hover:bg-purple-300 transition cursor-pointer">
          <span className="material-icons">audiotrack</span>
          <input
            type="file"
            accept="audio/*"
            className={`hidden ${isPosting ? "opacity-50" : ""}`}
            disabled={isPosting}
            onChange={(e) => handleFileUpload(e, "audio")}
          />
        </label>
        <label className="flex flex-col items-center bg-orange-200 text-orange-600 p-1.5 rounded-full hover:bg-orange-300 transition cursor-pointer">
          <span className="material-icons">description</span>
          <input
            type="file"
            accept=".txt,.pdf,.doc,.docx"
            className={`hidden ${isPosting ? "opacity-50" : ""}`}
            disabled={isPosting}
            onChange={(e) => handleFileUpload(e, "document")}
          />
        </label>
      </div>
      
      {newMedia.length > 0 && (
        <div className="mt-4 mb-4">
          <p className="text-sm text-gray-600 mb-2">
            Attached files ({newMedia.length})
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
                    onClick={() => handleRemoveFile(index)}
                    disabled={isPosting}
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

      <div className="flex flex-row w-full pt-2">
        <button
          onClick={handleAddPost}
          className={`bg-crimsonRed text-warmWhite px-6 py-2 rounded-3xl cursor-pointer hover:bg-red-700 transition duration-400 ease-in-out font-medium ${isPosting ? "opacity-50" : ""}`}
          disabled={isPosting}
        >
          {isPosting ? (
            <span className="flex items-center">
              <span className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin mr-2"></span>
              Posting...
            </span>
          ) : (
            "Post"
          )}
        </button>
      </div>
    </div>
  );
}
