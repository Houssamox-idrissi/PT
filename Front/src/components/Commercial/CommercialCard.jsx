import React from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";

const CommercialCard = ({ commercial, onEdit, onDelete }) => {
  return (
    <div className="rounded-2xl p-6 border border-white/10 shadow-xl group relative overflow-hidden bg-[#312b2b] transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:bg-[#372f2f] min-h-[180px]">
      <div className="mb-3">
        <div className="text-xl font-bold text-[#f2eded] group-hover:underline">
          {commercial.firstName} {commercial.lastName}
        </div>
        <div className="text-sm text-gray-400 mb-1">{commercial.role}</div>
      </div>
      <div className="text-base text-white/90 mb-1">
        <span className="font-semibold">Email:</span> {commercial.email}
      </div>
      {/* <div className="text-base text-white/90 mb-4">
        <span className="font-semibold">Agence ID:</span> {commercial.agenceId}
      </div> */}
      
      <div className="absolute right-0 top-0 w-2 h-full bg-gradient-to-b from-[#d1671b]/80 to-transparent opacity-0 group-hover:opacity-80 transition-all duration-300"></div>
      
      <div className="flex justify-end gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button
          onClick={() => onEdit(commercial)}
          className="p-2 rounded-full bg-[#473e3e] text-white hover:bg-[#d1671b]"
          aria-label="Modifier"
        >
          <FiEdit size={18} />
        </button>
        <button
          onClick={() => onDelete(commercial.id)}
          className="p-2 rounded-full bg-[#473e3e] text-white hover:bg-red-600"
          aria-label="Supprimer"
        >
          <FiTrash2 size={18} />
        </button>
      </div>
    </div>
  );
};

export default CommercialCard;