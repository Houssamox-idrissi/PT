import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getLogementById } from '../../services/logements/logementService';
import { createReservation } from '../../services/Reservation/Reservation';
import { FiHeart, FiShare2, FiMapPin, FiHome, FiUsers, FiCalendar, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { FaAirbnb } from 'react-icons/fa';
import { addMonths, format, isSameDay, isWithinInterval } from 'date-fns';
import { fr } from 'date-fns/locale';
import '../../styles/PropertyDetails.css';

const PropertyDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [guests, setGuests] = useState(1);
    const [isBooking, setIsBooking] = useState(false);
    const [bookingError, setBookingError] = useState(null);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);

    // Fetch property data
    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const data = await getLogementById(id);
                setProperty(data);
            } catch (err) {
                setError('Échec du chargement des détails de la propriété');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchProperty();
    }, [id]);

    // Calculate total price
    const calculateTotal = () => {
        if (!startDate || !endDate) return property.pricePerNight;
        const diffTime = Math.abs(endDate - startDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays * property.pricePerNight;
    };

    // Calendar navigation
    const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
    const prevMonth = () => setCurrentMonth(addMonths(currentMonth, -1));

    // Date selection logic
    const handleDateClick = (day) => {
        // If no date selected or both dates selected, start new selection
        if (!startDate || (startDate && endDate)) {
            setStartDate(day);
            setEndDate(null);
            return;
        }

        // If selecting end date
        if (startDate && !endDate) {
            // If selected date is before start date, swap them
            if (day < startDate) {
                setEndDate(startDate);
                setStartDate(day);
            } else {
                setEndDate(day);
            }
        }
    };

   const handleBooking = async () => {
    if (!localStorage.getItem('token')) {
        setBookingError('Veuillez vous connecter pour réserver');  
        navigate('/loginVoyageure'); 
        return;
    }

    if (!startDate || !endDate) {
        setBookingError('Veuillez sélectionner des dates valides');
        return;
    }

    if (guests > property.capacity) {
        setBookingError(`Ce logement ne peut accueillir que ${property.capacity} voyageurs maximum`);
        return;
    }

    setIsBooking(true);
    setBookingError(null);

    try {
        const formData = {
            logementId: property.id,
            startDate,
            endDate,
            capacity: guests
        };

        const createdReservation = await createReservation(formData);
        setShowSuccessAlert(true);
        setTimeout(() => {
            navigate(`/`);
        }, 3000);

    } catch (error) {
        console.error('Booking failed:', error);
        setBookingError(error.response?.data?.message || 'Échec de la réservation. Veuillez réessayer.');
    } finally {
        setIsBooking(false);
    }
};

    const renderCalendarDays = () => {
        const monthStart = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
        const monthEnd = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
        const startDay = monthStart.getDay();
        const daysInMonth = monthEnd.getDate();

        const days = [];

        // Blank days at start of month
        for (let i = 0; i < startDay; i++) {
            days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
        }

        // Actual days of month
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
            const isSelected =
                (startDate && isSameDay(date, startDate)) ||
                (endDate && isSameDay(date, endDate));
            const isInRange = startDate && endDate && isWithinInterval(date, {
                start: startDate,
                end: endDate
            });

            days.push(
                <div
                    key={`day-${day}`}
                    className={`calendar-day 
                        ${isSelected ? 'selected' : ''} 
                        ${isInRange ? 'in-range' : ''}
                        ${date < new Date() ? 'disabled' : ''}`}
                    onClick={() => date >= new Date() && handleDateClick(date)}
                >
                    {day}
                </div>
            );
        }

        return days;
    };

    if (loading) return (
        <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
        </div>
    );

    if (error) return (
        <div className="flex flex-col items-center justify-center h-screen">
            <p className="text-red-500 text-lg mb-4">{error}</p>
            <button
                onClick={() => navigate('/')}
                className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
            >
                Retour à l'accueil
            </button>
        </div>
    );

    if (!property) return (
        <div className="flex flex-col items-center justify-center h-screen">
            <p className="text-gray-600 text-lg mb-4">Propriété non trouvée</p>
            <button
                onClick={() => navigate('/')}
                className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
            >
                Voir les propriétés
            </button>
        </div>
    );

    

    return (
        <>
            {showSuccessAlert && (
                <div className="fixed inset-0 bg-white/5 backdrop-blur-[2px] flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl p-8 max-w-md w-full animate-pop-in">
                        <div className="flex flex-col items-center text-center">
                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
                                <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                            </div>
                            
                            <h3 className="text-2xl font-bold text-gray-800 mb-2">Réservation confirmée !</h3>
                            <p className="text-gray-600 mb-6">
                                Votre réservation du {new Date(startDate).toLocaleDateString('fr-FR')} au {new Date(endDate).toLocaleDateString('fr-FR')} a bien été enregistrée.
                            </p>
                            
                            <p className="text-sm text-gray-500 animate-pulse">
                                Redirection en cours...
                            </p>
                        </div>
                    </div>
                </div>
            )}

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-900">{property.title}</h1>
                <div className="flex space-x-4">
                    <button className="p-2 rounded-full hover:bg-gray-100">
                        <FiShare2 className="w-5 h-5" />
                    </button>
                    <button className="p-2 rounded-full hover:bg-gray-100">
                        <FiHeart className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Image Gallery */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-8">
                <div className="md:col-span-2 row-span-2">
                    <img
                        src={`data:image/jpeg;base64,${property.imagesBase64[activeImageIndex]}`}
                        alt={property.title}
                        className="w-full h-full object-cover rounded-l-2xl"
                    />
                </div>
                {property.imagesBase64.slice(0, 4).map((img, index) => (
                    <div
                        key={index}
                        className={`cursor-pointer ${index === 0 ? 'hidden md:block' : ''}`}
                        onClick={() => setActiveImageIndex(index)}
                    >
                        <img
                            src={`data:image/jpeg;base64,${img}`}
                            alt={`${property.title} ${index + 1}`}
                            className="w-full h-full object-cover rounded-r-2xl"
                        />
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column - Property Details */}
                <div className="lg:col-span-2">
                    {/* Property Info */}
                    <div className="border-b pb-6 mb-6">
                        <div className="flex items-center space-x-4 mb-4">
                            <div className="flex items-center text-gray-700">
                                <FiMapPin className="mr-1" />
                                <span>{property.address.city}, {property.address.country}</span>
                            </div>
                            <div className="flex items-center text-gray-700">
                                <FiHome className="mr-1" />
                                <span>{property.type}</span>
                            </div>
                            <div className="flex items-center text-gray-700">
                                <FiUsers className="mr-1" />
                                <span>{property.capacity} {property.capacity > 1 ? 'voyageurs' : 'voyageur'}</span>
                            </div>
                        </div>

                        <h2 className="text-xl font-semibold mb-4">À propos de ce logement</h2>
                        <p className="text-gray-700 mb-4">{property.description}</p>

                        <h3 className="text-lg font-semibold mb-3">Équipements</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {property.equipement.map((item, index) => (
                                <div key={index} className="flex items-center">
                                    <span className="mr-2">•</span>
                                    <span>{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Calendar Section */}
                    <div className="border-b pb-6 mb-6">
                        <h2 className="text-xl font-semibold mb-4 flex items-center">
                            <FiCalendar className="mr-2" />
                            Sélectionnez vos dates
                        </h2>

                        <div className="calendar-container">
                            {/* Header */}
                            <div className="calendar-header">
                                <button onClick={prevMonth} className="calendar-nav-button">
                                    <FiChevronLeft className="w-5 h-5" />
                                </button>
                                <h3 className="calendar-month-title">
                                    {format(currentMonth, 'MMMM yyyy', { locale: fr })}
                                </h3>
                                <button onClick={nextMonth} className="calendar-nav-button">
                                    <FiChevronRight className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Weekday Labels */}
                            <div className="calendar-weekdays">
                                {['Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa', 'Di'].map((day, index) => (
                                    <div key={index} className="calendar-weekday">
                                        {day}
                                    </div>
                                ))}
                            </div>

                            {/* Calendar Days */}
                            <div className="calendar-grid">
                                {renderCalendarDays()}
                            </div>
                        </div>

                        {/* Selected Dates Summary */}
                        <div className="mt-6 flex items-center space-x-4">
                            <div className="flex-1 border rounded-lg p-4">
                                <div className="text-sm font-medium text-gray-500">Arrivée</div>
                                <div className="text-lg font-semibold">
                                    {startDate ? format(startDate, 'PPP', { locale: fr }) : 'Sélectionnez une date'}
                                </div>
                            </div>
                            <div className="flex-1 border rounded-lg p-4">
                                <div className="text-sm font-medium text-gray-500">Départ</div>
                                <div className="text-lg font-semibold">
                                    {endDate ? format(endDate, 'PPP', { locale: fr }) : 'Sélectionnez une date'}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column - Booking Card */}
                <div className="lg:col-span-1">
                    <div className="sticky top-6 border rounded-xl shadow-lg p-6">
                        <div className="flex justify-between items-center mb-4">
                            <div>
                                <span className="text-2xl font-semibold">{property.pricePerNight} DH</span>
                                <span className="text-gray-600"> / nuit</span>
                            </div>
                            <div className="flex items-center">
                                <img src="/logo.png" alt="Airbnb Logo" className="w-8 h-8 mr-2" />
                                <span className="font-medium">{property.rating || '4.8'}</span>
                            </div>
                        </div>

                        <div className="mb-6">
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div className="border rounded-lg p-3">
                                    <label className="block text-xs font-medium text-gray-700 mb-1">ARRIVÉE</label>
                                    <div className="text-sm">
                                        {startDate ? format(startDate, 'PP', { locale: fr }) : 'Ajouter une date'}
                                    </div>
                                </div>
                                <div className="border rounded-lg p-3">
                                    <label className="block text-xs font-medium text-gray-700 mb-1">DÉPART</label>
                                    <div className="text-sm">
                                        {endDate ? format(endDate, 'PP', { locale: fr }) : 'Ajouter une date'}
                                    </div>
                                </div>
                            </div>

                            <div className="border rounded-lg p-3 mb-4">
                                <label className="block text-xs font-medium text-gray-700 mb-1">VOYAGEURS</label>
                                <select
                                    className="w-full text-sm bg-transparent"
                                    value={guests}
                                    onChange={(e) => setGuests(parseInt(e.target.value))}
                                >
                                    {[...Array(property.capacity).keys()].map(num => (
                                        <option key={num + 1} value={num + 1}>
                                            {num + 1} {num === 0 ? 'voyageur' : 'voyageurs'}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {bookingError && (
                            <div className="mb-4 text-red-500 text-sm">{bookingError}</div>
                        )}

                        <button
                            className="w-full bg-[#ff6a00] text-white py-3 rounded-lg font-medium hover:opacity-90 transition disabled:opacity-50"
                            onClick={handleBooking}
                            disabled={!startDate || !endDate || isBooking}
                        >
                            {isBooking ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Traitement...
                                </span>
                            ) : (
                                'Réserver'
                            )}
                        </button>

                        {(startDate && endDate) && (
                            <div className="mt-4 pt-4 border-t">
                                <div className="flex justify-between mb-2">
                                    <span>{property.pricePerNight} DH x {Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24))} nuits</span>
                                    <span>{calculateTotal()} DH</span>
                                </div>
                                <div className="flex justify-between font-semibold text-lg">
                                    <span>Total</span>
                                    <span>{calculateTotal()} DH</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default PropertyDetails;