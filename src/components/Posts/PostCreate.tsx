import { useState } from "react";
import { createPost, uploadMedia } from "../../services/api/postServices";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { MediaUpload, MediaTypes } from "../../interfaces/postInterfaces";
import "material-icons";


interface AddPostProps {
  onUpdate: () => void;
  onClose: () => void;
}

export default function PostCreate(props: AddPostProps) {
  const [newText, setNewText] = useState<string>("");
  const [newMedia, setNewMedia] = useState<MediaUpload[]>([]);


  const addPost = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      props.onUpdate()
      props.onClose()
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
          const response = await mediaUpload.mutateAsync(formData);
          return response;
        }),
      );

      toast.promise(
        addPost.mutateAsync({ text: newText, media: uploadedMediaResponses }),
        {
          loading: "Creating post...",
          success: "Post created successfully!",
          error: "Error creating post.",
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
    updatedMedia.splice(index, 1);
    setNewMedia(updatedMedia);
  }

  const isPosting = addPost.isPending || mediaUpload.isPending;

  return (
    <div className="flex flex-col">
      <h1 className="font-bold text-[18px] text-warmBlack sm:text-[25px] mb-6">
        Create a new Post
      </h1>
      <textarea
        id="postText"
        value={newText}
        disabled={isPosting}
        placeholder="Speak your mind..."
        onChange={(e) => setNewText(e.target.value)}
        className="bg-white outline-[0.7px] text-[14px] text-charcoalBlack h-50 px-2 rounded-sm hover:cursor-text hover:outline-[1px] hover:bg-gray-100 focus:outline-[1.5px]"
      ></textarea>
      <div className="flex flex-row pt-2">
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
      <div className="flex flex-wrap gap-2 mt-2">
        {newMedia.map((media, index) => (
          <div
            key={index}
            className="relative flex items-center justify-center w-20 h-20 border rounded bg-gray-100"
          >
            <button
              onClick={() => handleRemoveFile(index)}
              className="material-icons absolute top-0 right-0 text-crimsonRed hover:text-hoverSoftRed rounded-full w-5 h-5 flex items-center justify-center text-xs transition duration:300"
            >
              clear
            </button>
            {media.type === MediaTypes.Image && (
              <img
                src={URL.createObjectURL(media.file)}
                alt="Uploaded"
                className="w-full h-full object-cover rounded"
              />
            )}
            {media.type === MediaTypes.Video && (
              <video
                src={URL.createObjectURL(media.file)}
                className="w-full h-full object-cover rounded"
                controls={false}
              >
                Your browser does not support the video tag.
              </video>
            )}
            {media.type === MediaTypes.Audio && (
              <span className="material-icons text-purple-600 text-3xl">
                audiotrack
              </span>
            )}
            {media.type === MediaTypes.Document && (
              <span className="material-icons text-orange-600 text-3xl">
                description
              </span>
            )}
            <span className="absolute bottom-0 left-0 text-xs text-center bg-white bg-opacity-75 w-full truncate px-1">
              {media.file.name}
            </span>
          </div>
        ))}
      </div>
      <div className="flex flex-row w-1/1 m-auto pt-2">
        <button
          onClick={handleAddPost}
          className={`bg-crimsonRed text-warmWhite px-4 py-1.5 rounded-3xl cursor-pointer hover:bg-red-700 transition duration-400 ease-in-out ${isPosting ? "opacity-50" : ""}`}
          disabled={isPosting}
        >
          {isPosting ? "Posting..." : "Post"}
        </button>
      </div>
    </div>
  );
}
