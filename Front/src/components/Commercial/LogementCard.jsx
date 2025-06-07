import React from "react";
import { FiArrowRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const LogementCard = ({ logement }) => {
  const navigate = useNavigate();
  
  // Fixed color values (Tailwind needs full class names)
  const colors = {
    cardBg: "bg-[#1a1a1a]",
    primary: "bg-[#312b2b]",
    hover: "hover:bg-[#3d3636]",
    text: "text-[#f7f6f5]"
  };

  return (
    <div
      className={`${colors.cardBg} rounded-lg overflow-hidden shadow-lg transition-all hover:shadow-xl hover:translate-y-[-4px]`}
    >
      {/* Image */}
      {logement.imagesBase64?.[0] && (
        <div className="h-48 overflow-hidden relative">
          <img
            src={`data:image/jpeg;base64,${logement.imagesBase64[0]}`}
            alt={logement.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 right-2 bg-[#312b2b]/80 text-white px-2 py-1 rounded text-xs">
            {logement.type}
          </div>
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

        <button
          onClick={() => navigate(`/logement-details/${logement.id}`)}
          className={`w-full ${colors.primary} ${colors.hover} ${colors.text} py-2 rounded-lg flex items-center justify-center gap-2 transition-colors`}
        >
          View Details <FiArrowRight />
        </button>
      </div>
    </div>
  );
};

export default LogementCard;