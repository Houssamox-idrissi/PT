import { FiUpload } from "react-icons/fi";

export default function ImageUploader({ images, isEditing, handleImageUpload }) {
  return (
    <div className="relative h-64 w-full overflow-hidden">
      {images.length > 0 ? (
        <div className="flex h-full">
          <img
            src={`data:image/jpeg;base64,${images[0]}`}
            alt="Main logement"
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <div className="flex items-center justify-center h-full bg-secondary">
          <span className="text-gray-400">No images available</span>
        </div>
      )}
      {isEditing && (
        <div className="absolute bottom-4 right-4">
          <label className="bg-primary hover:bg-hover text-white px-4 py-2 rounded-lg flex items-center gap-2 cursor-pointer">
            <FiUpload /> Upload Image
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
        </div>
      )}
    </div>
  );
}