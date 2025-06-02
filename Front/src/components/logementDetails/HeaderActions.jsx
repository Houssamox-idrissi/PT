import { FiArrowLeft, FiSave } from "react-icons/fi";

export default function HeaderActions({ isEditing, setIsEditing, navigate, handleSubmit, isLoading }) {
  return (
    <div className="flex justify-between items-center mb-8">
      <button
        onClick={() => navigate("/logements")}
        className="bg-primary hover:bg-hover text-white px-4 py-2 rounded-lg flex items-center gap-2"
      >
        <FiArrowLeft /> Back
      </button>
      
      {!isEditing ? (
        <button
          onClick={() => setIsEditing(true)}
          className="bg-primary hover:bg-hover text-white px-4 py-2 rounded-lg"
        >
          Edit Logement
        </button>
      ) : (
        <div className="flex gap-2">
          <button
            onClick={() => setIsEditing(false)}
            className="bg-secondary hover:bg-hover text-white px-4 py-2 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-primary hover:bg-hover text-white px-4 py-2 rounded-lg flex items-center gap-2"
            disabled={isLoading}
          >
            <FiSave /> {isLoading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      )}
    </div>
  );
}