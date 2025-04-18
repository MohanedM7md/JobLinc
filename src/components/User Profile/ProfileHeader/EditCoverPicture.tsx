import { useEffect, useState } from "react";
import "material-icons";
import { updateCoverPicture } from "@services/api/userProfileServices";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { LoaderCircle } from "lucide-react";

interface EditCoverPictureProps {
  coverPicture: string;
  onSave: () => void;
}

export default function EditCoverPicture(props: EditCoverPictureProps) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState(props.coverPicture);
  const [isImage, setIsImage] = useState<boolean>(true);
  const imageValidation = isImage
    ? ""
    : "Invalid image format. Please upload a JPG, JPEG, or PNG file.";

  const updateCoverPictureMutation = useMutation({
    mutationFn: updateCoverPicture,
    onSuccess: () => {
      props.onSave();
    },
  });

  const isPending = updateCoverPictureMutation.isPending;

  function fileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = event.target.files?.[0] || null;
    if (selectedFile) {
      try {
        if (
          selectedFile.type !== "image/jpeg" &&
          selectedFile.type !== "image/png" &&
          selectedFile.type !== "image/jpg"
        ) {
          setIsImage(false);
        } else {
          const reader = new FileReader();
          reader.onload = () => {
            if (reader.result) {
              const img = new Image();
              img.src = reader.result as string;
              img.onload = () => {
                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d");
                const targetHeight = 320;
                const scaleFactor = targetHeight / img.height;
                canvas.width = img.width * scaleFactor;
                canvas.height = targetHeight;

                if (ctx) {
                  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                  canvas.toBlob((blob) => {
                    if (blob) {
                      const resizedFile = new File([blob], selectedFile.name, {
                        type: selectedFile.type,
                        lastModified: Date.now(),
                      });
                      setPreview(reader.result as string);
                      setFile(resizedFile);
                      setIsImage(true);
                    }
                  }, selectedFile.type);
                }
              };
            }
          };
          reader.readAsDataURL(selectedFile);
        }
      } catch (error) {
        console.error("Error resizing image:", error);
        setIsImage(false);
      }
    }
  }

  useEffect(() => {
    if (file) {
      console.log("File updated:", file);
    }
  }, [file]);

  function confirmPicture() {
    if (file && isImage) {
      toast
        .promise(updateCoverPictureMutation.mutateAsync(file), {
          loading: "Updating cover picture...",
          success: "Cover picture updated successfully!",
          error: (error) => error.message,
        })
        .then(() => setFile(null));
    }
  }

  function removePicture() {
    setPreview(
      "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg",
    );
    setFile(null);
  }

  return (
    <div className="flex flex-col items-center mt-4">
      <div
        className={`relative group w-full h-56 ${isPending ? "opacity-50" : ""}`}
      >
        <img
          className={`w-full h-full object-cover rounded-lg border-4 border-warmWhite shadow-lg cursor-pointer transition-transform duration-300 group-hover:brightness-50 group-hover:scale-105 ${
            isPending ? "pointer-events-none" : ""
          }`}
          src={
            preview === ""
              ? "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
              : preview
          }
          alt="Profile"
        />
        {isPending && (
          <div className="absolute inset-0 flex items-center justify-center">
            <LoaderCircle className="animate-spin" />
          </div>
        )}
        <div
          className={`absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${
            isPending ? "pointer-events-none" : ""
          }`}
        >
          <label
            htmlFor="file-input"
            className="absolute inset-0 flex items-center justify-center cursor-pointer"
          >
            <span className="text-white text-xl bg-opacity-50 rounded-full p-2 material-icons">
              edit
            </span>
          </label>
          <input
            id="file-input"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={fileChange}
            disabled={isPending}
          />
        </div>
      </div>
      <span className="text-mutedSilver text-sm mt-2">
        Maximum Size: 5MB, Format: JPG, JPEG, PNG
      </span>
      <span className="text-red-500 font-medium text-sm mt-2">
        {imageValidation}
      </span>
      <div className="flex justify-between mt-4 space-x-2">
        <button
          onClick={confirmPicture}
          className="bg-crimsonRed text-warmWhite px-4 py-1.5 rounded-3xl cursor-pointer hover:bg-red-700"
          disabled={isPending}
        >
          {isPending ? "Saving" : "Confirm picture" }
        </button>
        <button
          onClick={removePicture}
          className="bg-gray-500 text-warmWhite px-4 py-1.5 rounded-3xl cursor-pointer hover:bg-gray-700"
          disabled={isPending}
        >
          Remove Picture
        </button>
      </div>
    </div>
  );
}
