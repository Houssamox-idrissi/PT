import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { useNavigate, useParams } from "react-router-dom";
import {
    FiHome, FiUsers, FiLayers, FiAlignLeft, FiCheckCircle, FiCheck,
    FiMapPin, FiMap, FiGlobe, FiArrowLeft, FiSave, FiUpload, FiTrash2, FiPlus,
    FiUser, FiMessageSquare, FiChevronDown, FiLoader
} from "react-icons/fi";
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
                            <form onSubmit={handleSubmit} className="space-y-8">
                                {/* Form Grid Layout */}
                                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                    {/* Card 1: Basic Information */}
                                    <div className="bg-[#262222] p-6 rounded-xl shadow-lg border border-accent/20">
                                        <h3 className="text-xl font-bold mb-6 pb-2 border-b border-accent/30 flex items-center">
                                            <span className="bg-primary/10 text-primary px-2 py-1 rounded-md mr-2">1</span>
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
                                                    className="w-full bg-[#302b2b] border border-accent/30 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
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
                                                        className="w-full bg-[#302b2b] text-white border border-accent/30 rounded-lg px-4 py-3 appearance-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
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
                                                    className="w-full bg-[#302b2b] border border-accent/30 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                                                    placeholder="Tell guests about your space..."
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Card 2: Pricing & Capacity */}
                                    <div className="bg-[#262222] p-6 rounded-xl shadow-lg border border-accent/20">
                                        <h3 className="text-xl font-bold mb-6 pb-2 border-b border-accent/30 flex items-center">
                                            <span className="bg-primar/10 text-primary px-2 py-1 rounded-md mr-2">2</span>
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
                                                        className="w-full bg-[#302b2b] border border-accent/30 rounded-lg px-4 py-3 pl-8 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
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
                                                            className="w-full bg-[#302b2b] border border-accent/30 rounded-lg px-4 py-3 pl-10 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
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
                                                            className="w-full bg-[#302b2b] border border-accent/30 rounded-lg px-4 py-3 pl-10 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Card 3: Address */}
                                    <div className="bg-[#262222] p-6 rounded-xl shadow-lg border border-accent/20">
                                        <h3 className="text-xl font-bold mb-6 pb-2 border-b border-accent/30 flex items-center">
                                            <span className="bg-primary/10 text-primary px-2 py-1 rounded-md mr-2">3</span>
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
                                                    className="w-full bg-[#302b2b] border border-accent/30 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
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
                                                        className="w-full bg-[#302b2b] border border-accent/30 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                                                    />
                                                </div>

                                                <div className="form-group">
                                                    <label className="block text-sm font-medium mb-1 text-gray-300">Postal Code</label>
                                                    <input
                                                        type="text"
                                                        name="postalCode"
                                                        value={formData.address.postalCode}
                                                        onChange={handleAddressChange}
                                                        className="w-full bg-[#302b2b] border border-accent/30 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Card 4: Amenities */}
                                    <div className="bg-[#262222] p-6 rounded-xl shadow-lg border border-accent/20">
                                        <h3 className="text-xl font-bold mb-6 pb-2 border-b border-accent/30 flex items-center">
                                            <span className="bg-primary/10 text-primary px-2 py-1 rounded-md mr-2">4</span>
                                            Amenities
                                        </h3>

                                        <div className="space-y-5">
                                            <div className="form-group">
                                                <label className="block text-sm font-medium mb-1 text-gray-300">Add Amenities</label>
                                                <div className="flex gap-2">
                                                    <input
                                                        type="text"
                                                        value={newEquipment}
                                                        onChange={(e) => setNewEquipment(e.target.value)}
                                                        placeholder="WiFi, Parking, etc."
                                                        className="flex-1 bg-[#302b2b] border border-accent/30 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={handleAddEquipment}
                                                        className="bg-[#302b2b] hover:bg-primary/90 text-white px-4 py-3 rounded-lg flex items-center justify-center transition-colors"
                                                        disabled={!newEquipment.trim()}
                                                    >
                                                        <FiPlus />
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <h4 className="text-sm font-medium text-gray-300">Current Amenities</h4>
                                                {formData.equipement.length > 0 ? (
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                                        {formData.equipement.map((item, index) => (
                                                            <div key={index} className="flex justify-between items-center bg-[#302b2b]                                               px-4 py-2 rounded-lg border border-accent/20">
                                                                <span className="flex items-center">
                                                                    <FiCheckCircle className="text-green-400 mr-2" />
                                                                    {item}
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
                                                    <p className="text-sm text-gray-400 italic">No amenities added yet</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Image Management Card */}
                                <div className="bg-[#262222] p-6 rounded-xl shadow-lg border border-accent/20">
                                    <h3 className="text-xl font-bold mb-6 pb-2 border-b border-accent/30 flex items-center">
                                        <span className="bg-primary/10 text-primary px-2 py-1 rounded-md mr-2">5</span>
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

                                            <label className="w-full sm:w-48 h-48 flex flex-col items-center justify-center border-2 border-dashed border-accent/30 rounded-lg cursor-pointer hover:border-primary/50 transition-colors">
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
                                <div className="flex justify-end gap-4 pt-4 border-t border-accent/20">
                                    <button
                                        type="button"
                                        onClick={() => setIsEditing(false)}
                                        className=" bg-[#262222] px-6 py-3 rounded-lg hover:bg-secondary/50 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-6 py-3 rounded-lg bg-[#262222] hover:bg-primary/90 text-white flex items-center gap-2 transition-colors"
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
                                            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium flex items-center">
                                                <FiHome className="mr-1" /> {formData.type}
                                            </span>
                                            <span className="bg-secondary/50 text-gray-300 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                                                <FiUsers className="mr-1" /> {formData.capacity} guests
                                            </span>
                                            <span className="bg-secondary/50 text-gray-300 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                                                <FiLayers className="mr-1" /> {formData.nombreOfChambres} bedrooms
                                            </span>
                                        </div>
                                    </div>
                                    <div className="text-3xl font-bold bg-primary/10 px-4 py-3 rounded-lg">
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
                                        <div className="bg-[#262222] p-6 rounded-xl shadow-lg border border-accent/20">
                                            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                                <FiAlignLeft className="text-primary" />
                                                Description
                                            </h3>
                                            <p className="whitespace-pre-line text-gray-300">{formData.description || "No description provided"}</p>
                                        </div>

                                        {/* Amenities */}
                                        {formData.equipement.length > 0 && (
                                            <div className="bg-[#262222] p-6 rounded-xl shadow-lg border border-accent/20">
                                                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                                    <FiCheckCircle className="text-primary" />
                                                    Amenities
                                                </h3>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                    {formData.equipement.map((item, index) => (
                                                        <div key={index} className="flex items-center gap-3">
                                                            <div className="bg-primary/10 p-2 rounded-full">
                                                                <FiCheck className="text-primary" />
                                                            </div>
                                                            <span className="text-gray-300">{item}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Right Column */}
                                    <div className="space-y-8">
                                        {/* Location */}
                                        <div className="bg-[#262222] p-6 rounded-xl shadow-lg border border-accent/20">
                                            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                                <FiMapPin className="text-primary" />
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