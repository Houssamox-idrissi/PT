import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { useNavigate, useParams } from "react-router-dom";
import { FiArrowLeft, FiSave, FiUpload, FiTrash2, FiPlus, FiMinus } from "react-icons/fi";
import { dakhl } from "../../services/Agence/authService";
import { getLogementById } from "../../services/logements/logementService";

export default function LogementDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [theme] = useState("dark");
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Color palette matching your style
  const colors = {
    primary: "#312b2b",
    secondary: "#473e3e",
    accent: "#5a4f4f",
    text: "#f7f6f5",
    background: "#0a0400",
    cardBg: "#1a1a1a",
    hover: "#3d3636",
  };

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    address: {
      street: "",
      city: "",
      state: "",
      country: "",
      postalCode: "",
      latitude: 0,
      longitude: 0
    },
    type: "Maison",
    capacity: 1,
    description: "",
    nombreOfChambres: 1,
    pricePerNight: 0,
    equipement: [],
    imagesBase64: []
  });

  const [newEquipment, setNewEquipment] = useState("");
  const [newImage, setNewImage] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      if (!dakhl()) {
        navigate("/Commerciale");
      }
      fetchLogement();
    };
    checkAuth();
  }, [navigate, id]);

  const fetchLogement = async () => {
    try {
      setIsLoading(true);
      const data = await getLogementById(id);
      setFormData(data);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      address: {
        ...prev.address,
        [name]: value
      }
    }));
  };

  const handleAddEquipment = () => {
    if (newEquipment.trim() && !formData.equipement.includes(newEquipment.trim())) {
      setFormData(prev => ({
        ...prev,
        equipement: [...prev.equipement, newEquipment.trim()]
      }));
      setNewEquipment("");
    }
  };

  const handleRemoveEquipment = (index) => {
    setFormData(prev => ({
      ...prev,
      equipement: prev.equipement.filter((_, i) => i !== index)
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          imagesBase64: [...prev.imagesBase64, reader.result.split(',')[1]]
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = (index) => {
    setFormData(prev => ({
      ...prev,
      imagesBase64: prev.imagesBase64.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await updateLogement(id, formData);
      setIsEditing(false);
      setIsLoading(false);
      navigate("/logements");
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className={`flex items-center justify-center h-screen bg-[${colors.background}]`}>
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[${colors.primary}]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`flex flex-col items-center justify-center h-screen bg-[${colors.background}] text-[${colors.text}]`}>
        <h2 className="text-2xl font-bold mb-4">Error Loading Logement</h2>
        <p className="mb-6">{error}</p>
        <button
          onClick={() => navigate("/logements")}
          className={`bg-[${colors.primary}] hover:bg-[${colors.hover}] text-white px-6 py-2 rounded-lg flex items-center gap-2`}
        >
          <FiArrowLeft /> Back to Logements
        </button>
      </div>
    );
  }

  return (
    <div className={`bg-[${colors.background}] text-[${colors.text}] min-h-screen`}>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => navigate("/logements")}
            className={`bg-[${colors.primary}] hover:bg-[${colors.hover}] text-white px-4 py-2 rounded-lg flex items-center gap-2`}
          >
            <FiArrowLeft /> Back
          </button>
          
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className={`bg-[${colors.primary}] hover:bg-[${colors.hover}] text-white px-4 py-2 rounded-lg flex items-center gap-2`}
            >
              Edit Logement
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={() => setIsEditing(false)}
                className={`bg-[${colors.secondary}] hover:bg-[${colors.hover}] text-white px-4 py-2 rounded-lg`}
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className={`bg-[${colors.primary}] hover:bg-[${colors.hover}] text-white px-4 py-2 rounded-lg flex items-center gap-2`}
                disabled={isLoading}
              >
                <FiSave /> {isLoading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className={`bg-[${colors.cardBg}] rounded-lg shadow-lg overflow-hidden`}>
          {/* Image Gallery */}
          <div className="relative h-64 w-full overflow-hidden">
            {formData.imagesBase64.length > 0 ? (
              <div className="flex h-full">
                <img
                  src={`data:image/jpeg;base64,${formData.imagesBase64[0]}`}
                  alt={formData.title}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="flex items-center justify-center h-full bg-[${colors.secondary}]">
                <span className="text-gray-400">No images available</span>
              </div>
            )}
            {isEditing && (
              <div className="absolute bottom-4 right-4">
                <label className={`bg-[${colors.primary}] hover:bg-[${colors.hover}] text-white px-4 py-2 rounded-lg flex items-center gap-2 cursor-pointer`}>
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

          {/* Details Section */}
          <div className="p-6">
            {isEditing ? (
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {/* Basic Info */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold border-b pb-2 border-[${colors.secondary}]">Basic Information</h3>
                    
                    <div>
                      <label className="block mb-1">Title</label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className={`w-full bg-[${colors.secondary}] border border-[${colors.accent}] rounded-lg px-4 py-2`}
                        required
                      />
                    </div>

                    <div>
                      <label className="block mb-1">Type</label>
                      <select
                        name="type"
                        value={formData.type}
                        onChange={handleInputChange}
                        className={`w-full bg-[${colors.secondary}] border border-[${colors.accent}] rounded-lg px-4 py-2`}
                      >
                        <option value="Maison">Maison</option>
                        <option value="Appartement">Appartement</option>
                        <option value="Villa">Villa</option>
                        <option value="Studio">Studio</option>
                      </select>
                    </div>

                    <div>
                      <label className="block mb-1">Description</label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        rows="4"
                        className={`w-full bg-[${colors.secondary}] border border-[${colors.accent}] rounded-lg px-4 py-2`}
                      />
                    </div>
                  </div>

                  {/* Pricing & Capacity */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold border-b pb-2 border-[${colors.secondary}]">Pricing & Capacity</h3>
                    
                    <div>
                      <label className="block mb-1">Price Per Night (€)</label>
                      <input
                        type="number"
                        name="pricePerNight"
                        value={formData.pricePerNight}
                        onChange={handleInputChange}
                        min="0"
                        className={`w-full bg-[${colors.secondary}] border border-[${colors.accent}] rounded-lg px-4 py-2`}
                        required
                      />
                    </div>

                    <div>
                      <label className="block mb-1">Capacity</label>
                      <input
                        type="number"
                        name="capacity"
                        value={formData.capacity}
                        onChange={handleInputChange}
                        min="1"
                        className={`w-full bg-[${colors.secondary}] border border-[${colors.accent}] rounded-lg px-4 py-2`}
                        required
                      />
                    </div>

                    <div>
                      <label className="block mb-1">Number of Bedrooms</label>
                      <input
                        type="number"
                        name="nombreOfChambres"
                        value={formData.nombreOfChambres}
                        onChange={handleInputChange}
                        min="1"
                        className={`w-full bg-[${colors.secondary}] border border-[${colors.accent}] rounded-lg px-4 py-2`}
                        required
                      />
                    </div>
                  </div>

                  {/* Address */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold border-b pb-2 border-[${colors.secondary}]">Address</h3>
                    
                    <div>
                      <label className="block mb-1">Street</label>
                      <input
                        type="text"
                        name="street"
                        value={formData.address.street}
                        onChange={handleAddressChange}
                        className={`w-full bg-[${colors.secondary}] border border-[${colors.accent}] rounded-lg px-4 py-2`}
                      />
                    </div>

                    <div>
                      <label className="block mb-1">City</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.address.city}
                        onChange={handleAddressChange}
                        className={`w-full bg-[${colors.secondary}] border border-[${colors.accent}] rounded-lg px-4 py-2`}
                      />
                    </div>

                    <div>
                      <label className="block mb-1">Postal Code</label>
                      <input
                        type="text"
                        name="postalCode"
                        value={formData.address.postalCode}
                        onChange={handleAddressChange}
                        className={`w-full bg-[${colors.secondary}] border border-[${colors.accent}] rounded-lg px-4 py-2`}
                      />
                    </div>
                  </div>

                  {/* Equipment */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold border-b pb-2 border-[${colors.secondary}]">Equipment</h3>
                    
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newEquipment}
                        onChange={(e) => setNewEquipment(e.target.value)}
                        placeholder="Add equipment"
                        className={`flex-1 bg-[${colors.secondary}] border border-[${colors.accent}] rounded-lg px-4 py-2`}
                      />
                      <button
                        type="button"
                        onClick={handleAddEquipment}
                        className={`bg-[${colors.primary}] hover:bg-[${colors.hover}] text-white px-4 py-2 rounded-lg`}
                      >
                        <FiPlus />
                      </button>
                    </div>

                    <div className="space-y-2">
                      {formData.equipement.map((item, index) => (
                        <div key={index} className="flex justify-between items-center bg-[${colors.secondary}] px-4 py-2 rounded-lg">
                          <span>{item}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveEquipment(index)}
                            className="text-red-400 hover:text-red-300"
                          >
                            <FiMinus />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Image Management */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold border-b pb-2 border-[${colors.secondary}] mb-4">Images</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {formData.imagesBase64.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={`data:image/jpeg;base64,${image}`}
                          alt={`Logement ${index + 1}`}
                          className="h-32 w-full object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(index)}
                          className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <FiTrash2 size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </form>
            ) : (
              /* View Mode */
              <div className="space-y-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold">{formData.title}</h2>
                    <div className="flex items-center gap-2 mt-2">
                      <span className={`bg-[${colors.primary}] text-white px-3 py-1 rounded-full text-sm`}>
                        {formData.type}
                      </span>
                      <span className="text-gray-400">{formData.capacity} guests</span>
                      <span className="text-gray-400">{formData.nombreOfChambres} bedrooms</span>
                    </div>
                  </div>
                  <div className="text-2xl font-bold">{formData.pricePerNight}€ <span className="text-sm font-normal text-gray-400">/ night</span></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-4 border-b pb-2 border-[${colors.secondary}]">Description</h3>
                    <p className="whitespace-pre-line">{formData.description}</p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-4 border-b pb-2 border-[${colors.secondary}]">Address</h3>
                    <address className="not-italic">
                      <p>{formData.address.street}</p>
                      <p>{formData.address.city}, {formData.address.postalCode}</p>
                      <p>{formData.address.country}</p>
                    </address>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-4 border-b pb-2 border-[${colors.secondary}]">Equipment</h3>
                    <ul className="grid grid-cols-2 gap-2">
                      {formData.equipement.map((item, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-[${colors.primary}]"></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-4 border-b pb-2 border-[${colors.secondary}]">Gallery</h3>
                    <div className="grid grid-cols-3 gap-2">
                      {formData.imagesBase64.map((image, index) => (
                        <img
                          key={index}
                          src={`data:image/jpeg;base64,${image}`}
                          alt={`Logement ${index + 1}`}
                          className="h-24 w-full object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                          onClick={() => {/* Implement lightbox here */}}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}