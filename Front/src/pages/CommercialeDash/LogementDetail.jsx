import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { useNavigate, useParams } from "react-router-dom";
import {
    FiHome, FiUsers, FiLayers, FiAlignLeft, FiCheckCircle, FiCheck,
    FiMapPin, FiMap, FiGlobe, FiArrowLeft, FiSave, FiUpload, FiTrash2, FiPlus,
    FiUser, FiMessageSquare, FiChevronDown, FiLoader
} from "react-icons/fi";
import { dakhl } from "../../services/Agence/authService";
import { getLogementById, ModifyLogement } from "../../services/logements/logementService";

export default function LogementDetails() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [theme] = useState("dark");
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

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
            // Ensure equipement is an array and imagesBase64 exists
            const formattedData = {
                ...data,
                equipement: Array.isArray(data.equipement) ? data.equipement : [],
                imagesBase64: data.imagesBase64 || []
            };
            setFormData(formattedData);
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

    const handleToggleAmenity = (amenity) => {
        setFormData(prev => {
            const currentAmenities = Array.isArray(prev.equipement) ? prev.equipement : [];
            if (currentAmenities.includes(amenity)) {
                return {
                    ...prev,
                    equipement: currentAmenities.filter(item => item !== amenity)
                };
            } else {
                return {
                    ...prev,
                    equipement: [...currentAmenities, amenity]
                };
            }
        });
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
                const base64String = reader.result.split(',')[1];
                setFormData(prev => ({
                    ...prev,
                    imagesBase64: [...prev.imagesBase64, base64String]
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
            // Ensure equipement is properly formatted
            const submissionData = {
                ...formData,
                equipement: Array.isArray(formData.equipement) ? formData.equipement : []
            };
            await ModifyLogement(id, submissionData);
            setIsEditing(false);
            setIsLoading(false);
            fetchLogement(); // Refresh data after successful update
        } catch (error) {
            setError(error.message);
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-[#0a0400] text-[#f7f6f5] min-h-screen">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <button
                        onClick={() => navigate("/logements")}
                        className="bg-[#312b2b] hover:bg-[#3d3636] text-white px-4 py-2 rounded-lg flex items-center gap-2"
                    >
                        <FiArrowLeft /> Back
                    </button>

                    {!isEditing ? (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="bg-[#312b2b] hover:bg-[#3d3636] text-white px-4 py-2 rounded-lg flex items-center gap-2"
                        >
                            Edit Logement
                        </button>
                    ) : (
                        <div className="flex gap-2">
                            <button
                                onClick={() => setIsEditing(false)}
                                className="bg-[#473e3e] hover:bg-[#3d3636] text-white px-4 py-2 rounded-lg"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmit}
                                className="bg-[#312b2b] hover:bg-[#3d3636] text-white px-4 py-2 rounded-lg flex items-center gap-2"
                                disabled={isLoading}
                            >
                                <FiSave /> {isLoading ? "Saving..." : "Save Changes"}
                            </button>
                        </div>
                    )}
                </div>

                {/* Main Content */}
                <div className="bg-[#1a1a1a] rounded-lg shadow-lg overflow-hidden">
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
                            <div className="flex items-center justify-center h-full bg-[#473e3e]">
                                <span className="text-gray-400">No images available</span>
                            </div>
                        )}
                        {isEditing && (
                            <div className="absolute bottom-4 right-4">
                                <label className="bg-[#312b2b] hover:bg-[#3d3636] text-white px-4 py-2 rounded-lg flex items-center gap-2 cursor-pointer">
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
                            <form onSubmit={handleSubmit} className="space-y-8">
                                {/* Form Grid Layout */}
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                    {/* Card 1: Basic Information */}
                                    <div className="bg-[#262222] p-6 rounded-xl shadow-lg border border-[#5a4f4f]/20">
                                        <h3 className="text-xl font-bold mb-6 pb-2 border-b border-[#5a4f4f]/30 flex items-center">
                                            <span className="bg-[#312b2b]/10 text-[#312b2b] px-2 py-1 rounded-md mr-2">1</span>
                                            Logement Information
                                        </h3>

                                        <div className="space-y-5">
                                            <div className="form-group">
                                                <label className="block text-sm font-medium mb-1 text-gray-300">Title</label>
                                                <input
                                                    type="text"
                                                    name="title"
                                                    value={formData.title}
                                                    onChange={handleInputChange}
                                                    className="w-full bg-[#302b2b] border border-[#5a4f4f]/30 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#312b2b]/50 focus:border-[#312b2b] transition-all"
                                                    required
                                                />
                                            </div>

                                            <div className="form-group">
                                                <label className="block text-sm font-medium mb-1 text-gray-300">Property Type</label>
                                                <div className="relative">
                                                    <select
                                                        name="type"
                                                        value={formData.type}
                                                        onChange={handleInputChange}
                                                        className="w-full bg-[#302b2b] text-white border border-[#5a4f4f]/30 rounded-lg px-4 py-3 appearance-none focus:ring-2 focus:ring-[#312b2b]/50 focus:border-[#312b2b] transition-all"
                                                    >
                                                        <option value="Maison">House</option>
                                                        <option value="Appartement">Apartment</option>
                                                        <option value="Villa">Villa</option>
                                                        <option value="Studio">Studio</option>
                                                    </select>
                                                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                                        <FiChevronDown className="text-gray-400" />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <label className="block text-sm font-medium mb-1 text-gray-300">Description</label>
                                                <textarea
                                                    name="description"
                                                    value={formData.description}
                                                    onChange={handleInputChange}
                                                    rows="4"
                                                    className="w-full bg-[#302b2b] border border-[#5a4f4f]/30 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#312b2b]/50 focus:border-[#312b2b] transition-all"
                                                    placeholder="Tell guests about your space..."
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Card 2: Pricing & Capacity */}
                                    <div className="bg-[#262222] p-6 rounded-xl shadow-lg border border-[#5a4f4f]/20">
                                        <h3 className="text-xl font-bold mb-6 pb-2 border-b border-[#5a4f4f]/30 flex items-center">
                                            <span className="bg-[#312b2b]/10 text-[#312b2b] px-2 py-1 rounded-md mr-2">2</span>
                                            Pricing & Capacity
                                        </h3>

                                        <div className="space-y-5">
                                            <div className="form-group">
                                                <label className="block text-sm font-medium mb-1 text-gray-300">Price Per Night (€)</label>
                                                <div className="relative">
                                                    <span className="absolute left-3 top-3 text-gray-400">€</span>
                                                    <input
                                                        type="number"
                                                        name="pricePerNight"
                                                        value={formData.pricePerNight}
                                                        onChange={handleInputChange}
                                                        min="0"
                                                        className="w-full bg-[#302b2b] border border-[#5a4f4f]/30 rounded-lg px-4 py-3 pl-8 focus:ring-2 focus:ring-[#312b2b]/50 focus:border-[#312b2b] transition-all"
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="form-group">
                                                    <label className="block text-sm font-medium mb-1 text-gray-300">Max Guests</label>
                                                    <div className="relative">
                                                        <FiUsers className="absolute left-3 top-4 text-gray-400" />
                                                        <input
                                                            type="number"
                                                            name="capacity"
                                                            value={formData.capacity}
                                                            onChange={handleInputChange}
                                                            min="1"
                                                            className="w-full bg-[#302b2b] border border-[#5a4f4f]/30 rounded-lg px-4 py-3 pl-10 focus:ring-2 focus:ring-[#312b2b]/50 focus:border-[#312b2b] transition-all"
                                                            required
                                                        />
                                                    </div>
                                                </div>

                                                <div className="form-group">
                                                    <label className="block text-sm font-medium mb-1 text-gray-300">Bedrooms</label>
                                                    <div className="relative">
                                                        <FiHome className="absolute left-3 top-4 text-gray-400" />
                                                        <input
                                                            type="number"
                                                            name="nombreOfChambres"
                                                            value={formData.nombreOfChambres}
                                                            onChange={handleInputChange}
                                                            min="1"
                                                            className="w-full bg-[#302b2b] border border-[#5a4f4f]/30 rounded-lg px-4 py-3 pl-10 focus:ring-2 focus:ring-[#312b2b]/50 focus:border-[#312b2b] transition-all"
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Card 3: Address */}
                                    <div className="bg-[#262222] p-6 rounded-xl shadow-lg border border-[#5a4f4f]/20">
                                        <h3 className="text-xl font-bold mb-6 pb-2 border-b border-[#5a4f4f]/30 flex items-center">
                                            <span className="bg-[#312b2b]/10 text-[#312b2b] px-2 py-1 rounded-md mr-2">3</span>
                                            Location Details
                                        </h3>

                                        <div className="space-y-5">
                                            <div className="form-group">
                                                <label className="block text-sm font-medium mb-1 text-gray-300">Street Address</label>
                                                <input
                                                    type="text"
                                                    name="street"
                                                    value={formData.address.street}
                                                    onChange={handleAddressChange}
                                                    className="w-full bg-[#302b2b] border border-[#5a4f4f]/30 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#312b2b]/50 focus:border-[#312b2b] transition-all"
                                                />
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="form-group">
                                                    <label className="block text-sm font-medium mb-1 text-gray-300">City</label>
                                                    <input
                                                        type="text"
                                                        name="city"
                                                        value={formData.address.city}
                                                        onChange={handleAddressChange}
                                                        className="w-full bg-[#302b2b] border border-[#5a4f4f]/30 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#312b2b]/50 focus:border-[#312b2b] transition-all"
                                                    />
                                                </div>

                                                <div className="form-group">
                                                    <label className="block text-sm font-medium mb-1 text-gray-300">Postal Code</label>
                                                    <input
                                                        type="text"
                                                        name="postalCode"
                                                        value={formData.address.postalCode}
                                                        onChange={handleAddressChange}
                                                        className="w-full bg-[#302b2b] border border-[#5a4f4f]/30 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#312b2b]/50 focus:border-[#312b2b] transition-all"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Card 4: Amenities */}
                                    <div className="bg-[#262222] p-6 rounded-xl shadow-lg border border-[#5a4f4f]/20">
                                        <h3 className="text-xl font-bold mb-6 pb-2 border-b border-[#5a4f4f]/30 flex items-center">
                                            <span className="bg-[#312b2b]/10 text-[#312b2b] px-2 py-1 rounded-md mr-2">4</span>
                                            Amenities
                                        </h3>

                                        <div className="space-y-5">
                                            <div className="form-group">
                                                <label className="block text-sm font-medium mb-1 text-gray-300">Select Amenities</label>

                                                {/* Available Amenities Checkboxes */}
                                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
                                                    {['wifi', 'pool', 'parking', 'tv', 'kitchen'].map((amenity) => (
                                                        <label
                                                            key={amenity}
                                                            className={`flex items-center space-x-2 p-3 rounded-lg border ${formData.equipement.includes(amenity)
                                                                ? 'border-[#312b2b] bg-[#312b2b]/10'
                                                                : 'border-[#5a4f4f]/30 bg-[#302b2b] hover:bg-[#3a3434]'}`}
                                                        >
                                                            <input
                                                                type="checkbox"
                                                                checked={formData.equipement.includes(amenity)}
                                                                onChange={() => handleToggleAmenity(amenity)}
                                                                className="hidden"
                                                            />
                                                            <div className={`w-5 h-5 rounded border flex items-center justify-center 
                                                                ${formData.equipement.includes(amenity)
                                                                    ? 'bg-[#312b2b] border-[#312b2b]'
                                                                    : 'border-gray-400'}`}>
                                                                {formData.equipement.includes(amenity) && (
                                                                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                                    </svg>
                                                                )}
                                                            </div>
                                                            <span className="capitalize">{amenity}</span>
                                                        </label>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Current Amenities Display */}
                                            <div className="space-y-2">
                                                <h4 className="text-sm font-medium text-gray-300">Selected Amenities</h4>
                                                {formData.equipement.length > 0 ? (
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                                        {formData.equipement.map((item, index) => (
                                                            <div key={index} className="flex justify-between items-center bg-[#302b2b] px-4 py-2 rounded-lg border border-[#5a4f4f]/20">
                                                                <span className="flex items-center">
                                                                    <FiCheckCircle className="text-green-400 mr-2" />
                                                                    <span className="capitalize">{item}</span>
                                                                </span>
                                                                <button
                                                                    type="button"
                                                                    onClick={() => handleRemoveEquipment(index)}
                                                                    className="text-red-400 hover:text-red-300 transition-colors"
                                                                >
                                                                    <FiTrash2 size={16} />
                                                                </button>
                                                            </div>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <p className="text-sm text-gray-400 italic">No amenities selected yet</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Image Management Card */}
                                <div className="bg-[#262222] p-6 rounded-xl shadow-lg border border-[#5a4f4f]/20">
                                    <h3 className="text-xl font-bold mb-6 pb-2 border-b border-[#5a4f4f]/30 flex items-center">
                                        <span className="bg-[#312b2b]/10 text-[#312b2b] px-2 py-1 rounded-md mr-2">5</span>
                                        Property Photos
                                    </h3>

                                    <div className="space-y-5">
                                        <div className="flex flex-wrap gap-4">
                                            {formData.imagesBase64.map((image, index) => (
                                                <div key={index} className="relative group w-full sm:w-48 h-48">
                                                    <img
                                                        src={`data:image/jpeg;base64,${image}`}
                                                        alt={`Property ${index + 1}`}
                                                        className="w-full h-full object-cover rounded-lg shadow-md"
                                                    />
                                                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                                                        <button
                                                            type="button"
                                                            onClick={() => handleRemoveImage(index)}
                                                            className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-colors"
                                                            title="Remove image"
                                                        >
                                                            <FiTrash2 size={18} />
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}

                                            <label className="w-full sm:w-48 h-48 flex flex-col items-center justify-center border-2 border-dashed border-[#5a4f4f]/30 rounded-lg cursor-pointer hover:border-[#312b2b]/50 transition-colors">
                                                <FiUpload className="text-2xl text-gray-400 mb-2" />
                                                <span className="text-sm text-gray-400">Upload Photo</span>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleImageUpload}
                                                    className="hidden"
                                                />
                                            </label>
                                        </div>
                                        <p className="text-xs text-gray-400">Recommended size: 1200x800px (max 10 photos)</p>
                                    </div>
                                </div>

                                {/* Form Actions */}
                                <div className="flex justify-end gap-4 pt-4 border-t border-[#5a4f4f]/20">
                                    <button
                                        type="button"
                                        onClick={() => setIsEditing(false)}
                                        className="bg-[#262222] px-6 py-3 rounded-lg hover:bg-[#473e3e]/50 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-6 py-3 rounded-lg bg-[#312b2b] hover:bg-[#312b2b]/90 text-white flex items-center gap-2 transition-colors"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            <>
                                                <FiLoader className="animate-spin" />
                                                Saving...
                                            </>
                                        ) : (
                                            <>
                                                <FiSave />
                                                Save Changes
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        ) : (
                            /* View Mode */
                            <div className="space-y-8">
                                {/* Property Header */}
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                    <div>
                                        <h2 className="text-3xl font-bold">{formData.title}</h2>
                                        <div className="flex items-center flex-wrap gap-2 mt-3">
                                            <span className="bg-[#312b2b]/10 text-[#312b2b] px-3 py-1 rounded-full text-sm font-medium flex items-center">
                                                <FiHome className="mr-1" /> {formData.type}
                                            </span>
                                            <span className="bg-[#473e3e]/50 text-gray-300 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                                                <FiUsers className="mr-1" /> {formData.capacity} guests
                                            </span>
                                            <span className="bg-[#473e3e]/50 text-gray-300 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                                                <FiLayers className="mr-1" /> {formData.nombreOfChambres} bedrooms
                                            </span>
                                        </div>
                                    </div>
                                    <div className="text-3xl font-bold bg-[#312b2b]/10 px-4 py-3 rounded-lg">
                                        {formData.pricePerNight}€ <span className="text-base font-normal text-gray-400">/ night</span>
                                    </div>
                                </div>

                                {/* Gallery Preview */}
                                {formData.imagesBase64.length > 0 && (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {formData.imagesBase64.slice(0, 3).map((image, index) => (
                                            <div key={index} className="relative h-64 rounded-xl overflow-hidden shadow-lg">
                                                <img
                                                    src={`data:image/jpeg;base64,${image}`}
                                                    alt={`Property ${index + 1}`}
                                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                                />
                                                {index === 2 && formData.imagesBase64.length > 3 && (
                                                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                                        <span className="text-white text-xl font-bold">
                                                            +{formData.imagesBase64.length - 3} more
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Property Details Grid */}
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                    {/* Left Column */}
                                    <div className="lg:col-span-2 space-y-8">
                                        {/* Description */}
                                        <div className="bg-[#262222] p-6 rounded-xl shadow-lg border border-[#5a4f4f]/20">
                                            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                                <FiAlignLeft className="text-[#312b2b]" />
                                                Description
                                            </h3>
                                            <p className="whitespace-pre-line text-gray-300">{formData.description || "No description provided"}</p>
                                        </div>

                                        {/* Amenities */}
                                        {formData.equipement.length > 0 && (
                                            <div className="bg-[#262222] p-6 rounded-xl shadow-lg border border-[#5a4f4f]/20">
                                                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                                    <FiCheckCircle className="text-[#312b2b]" />
                                                    Amenities
                                                </h3>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                    {formData.equipement.map((item, index) => (
                                                        <div key={index} className="flex items-center gap-3">
                                                            <div className="bg-[#312b2b]/10 p-2 rounded-full">
                                                                <FiCheck className="text-[#312b2b]" />
                                                            </div>
                                                            <span className="text-gray-300 capitalize">{item}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Right Column */}
                                    <div className="space-y-8">
                                        {/* Location */}
                                        <div className="bg-[#262222] p-6 rounded-xl shadow-lg border border-[#5a4f4f]/20">
                                            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                                <FiMapPin className="text-[#312b2b]" />
                                                Location
                                            </h3>
                                            <address className="not-italic space-y-2 text-gray-300">
                                                <p className="flex items-center gap-2">
                                                    <FiMap /> {formData.address.street}
                                                </p>
                                                <p className="flex items-center gap-2">
                                                    <FiMap /> {formData.address.city}, {formData.address.postalCode}
                                                </p>
                                                <p className="flex items-center gap-2">
                                                    <FiGlobe /> {formData.address.country}
                                                </p>
                                            </address>
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