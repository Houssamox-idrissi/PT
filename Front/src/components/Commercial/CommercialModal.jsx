import React from "react";
import { FiX } from "react-icons/fi";

const CommercialModal = ({
  isOpen,
  onClose,
  onSubmit,
  formData,
  onInputChange,
  isEditing,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#312b2b] p-6 rounded-2xl w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            {isEditing ? "Modifier Commercial" : "Ajouter un Commercial"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <FiX size={24} />
          </button>
        </div>
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label className="block mb-2">Nom</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={onInputChange}
              className="w-full px-4 py-2 bg-[#473e3e] rounded-lg text-white"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={onInputChange}
              className="w-full px-4 py-2 bg-[#473e3e] rounded-lg text-white"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">
              {isEditing ? "Nouveau mot de passe (laisser vide pour ne pas changer)" : "Mot de passe"}
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={onInputChange}
              className="w-full px-4 py-2 bg-[#473e3e] rounded-lg text-white"
              required={!isEditing}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Rôle</label>
            <select
              name="role"
              value={formData.role}
              onChange={onInputChange}
              className="w-full px-4 py-2 bg-[#473e3e] rounded-lg text-white"
              required
            >
              <option value="Commercial">COMMERCIAL</option>
              <option value="Commercial Senior">Commercial Senior</option>
              <option value="Commercial Junior">Commercial Junior</option>
            </select>
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-gray-600 text-white"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-[#d1671b] text-white"
            >
              {isEditing ? "Enregistrer" : "Ajouter"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CommercialModal;