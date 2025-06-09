import React, { useState } from "react";
import { FiArrowRight, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { deleteLogement } from "../../services/logements/logementService";

const LogementCard = ({ logement, onDeleteSuccess }) => {
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const colors = {
    cardBg: "bg-[#1a1a1a]",
    primary: "bg-[#312b2b]",
    hover: "hover:bg-[#3d3636]",
    text: "text-[#f7f6f5]",
    danger: "bg-red-600 hover:bg-red-700",
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteLogement(logement.id);
      onDeleteSuccess(); 
    } catch (error) {
      console.error("Delete error:", error);
    } finally {
      setIsDeleting(false);
      setShowConfirm(false);
    }
  };

  return (
    <div className={`${colors.cardBg} rounded-lg overflow-hidden shadow-lg transition-all hover:shadow-xl hover:translate-y-[-4px] relative`}>
      {showConfirm && (
        <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center p-4 z-10">
          <div className="bg-[#262222] p-6 rounded-lg max-w-xs">
            <h3 className="text-lg font-semibold mb-3">Confirm Deletion</h3>
            <p className="text-gray-300 mb-4">
              Are you sure you want to delete this logement? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowConfirm(false);
                }}
                className="px-4 py-2 rounded-lg bg-gray-600 hover:bg-gray-500 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete();
                }}
                className={`${colors.danger} px-4 py-2 rounded-lg flex items-center gap-2 transition-colors`}
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Image */}
      {logement.imagesBase64?.[0] && (
        <div className="h-48 overflow-hidden relative group">
          <img
            src={`data:image/jpeg;base64,${logement.imagesBase64[0]}`}
            alt={logement.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 left-2 bg-[#312b2b]/80 text-white px-2 py-1 rounded text-xs">
            {logement.type}
          </div>
          
          {/* Trash icon that appears on image hover */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowConfirm(true);
            }}
            className={`absolute top-2 right-2 p-2 rounded-full ${colors.danger} opacity-0 group-hover:opacity-70 hover:opacity-100 transition-opacity`}
            title="Delete"
            disabled={isDeleting}
          >
            <FiTrash2 size={16} />
          </button>
        </div>
      )}

      {/* Details */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <h2 className="text-xl font-semibold line-clamp-1">
            {logement.title}
          </h2>
          <span className="text-lg font-bold">
            {logement.pricePerNight}€
          </span>
        </div>

        <p className="text-gray-400 line-clamp-2 mb-4">
          {logement.description}
        </p>

        <div className="flex gap-3">
          <button
            onClick={() => navigate(`/logement-details/${logement.id}`)}
            className={`flex-1 ${colors.primary} ${colors.hover} ${colors.text} py-2 rounded-lg flex items-center justify-center gap-2 transition-colors`}
          >
            View Details <FiArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogementCard;