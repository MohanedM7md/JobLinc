import { useEffect, useState } from "react";
import "material-icons";

interface EditCoverPictureProps {
  coverPicture: string;
  onSave: (updatedCoverPicture: File) => void;
}

export default function EditCoverPicture(props: EditCoverPictureProps) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState(props.coverPicture);

  function fileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = event.target.files?.[0] || null;
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          setPreview(reader.result as string);
          setFile(selectedFile);
        }
      };
      reader.readAsDataURL(selectedFile);
    }
  }

  useEffect(() => {
    if (file) {
      console.log("File updated:", file);
    }
  }, [file]);

  function confirmPicture() {
    if (file) {
      const img = new Image();
      const reader = new FileReader();

      reader.onload = (event) => {
        if (event.target?.result) {
          img.src = event.target.result as string;
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
                  const resizedFile = new File([blob], file.name, {
                    type: file.type,
                    lastModified: Date.now(),
                  });
                  props.onSave(resizedFile);
                }
              }, file.type);
            }
          };
        }
      };

      reader.readAsDataURL(file);
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
      <div className="relative group w-full h-56">
        <img
          className="w-full h-full object-cover rounded-lg border-4 border-warmWhite shadow-lg cursor-pointer transition-transform duration-300 group-hover:brightness-50 group-hover:scale-105" // Adjusted for landscape
          src={
            preview === ""
              ? "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
              : preview
          }
          alt="Profile"
        />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
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
          />
        </div>
      </div>
      <span className="text-mutedSilver text-sm mt-2">
        Maximum Size: 5MB, Format: JPG, JPEG, PNG
      </span>
      <div className="flex justify-between mt-4 space-x-2">
        <button
          onClick={confirmPicture}
          className="bg-crimsonRed text-warmWhite px-4 py-1.5 rounded-3xl cursor-pointer hover:bg-red-700"
        >
          Confirm Picture
        </button>
        <button
          onClick={removePicture}
          className="bg-gray-500 text-warmWhite px-4 py-1.5 rounded-3xl cursor-pointer hover:bg-gray-700"
        >
          Remove Picture
        </button>
      </div>
    </div>
  );
}
