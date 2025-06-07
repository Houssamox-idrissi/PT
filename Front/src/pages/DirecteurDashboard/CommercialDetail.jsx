import React, { useState, useEffect } from "react";
import Sidebar from "../../components/DirecteurDashboard/Sidebar";
import { useParams, useNavigate } from "react-router-dom";
import clsx from "clsx";
import { FiArrowLeft } from "react-icons/fi";
import {
    getEmployeeById,
} from "../../services/Commérciaux/EmployeeService";
import { getLogementById, getLogementsByCommercialId } from "../../services/logements/logementService";
import LoadingScreen from "../../components/loading/loadin";
import PropertyCard from "../../components/Dashboard/PropertyCard"; // Reuse your PropertyCard component

export default function CommercialDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [theme, setTheme] = useState("dark");
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [commercial, setCommercial] = useState(null);
    const [logements, setLogements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const checkAuth = () => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
            }
        };
        checkAuth();
    }, [navigate]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                // Fetch commercial details
                const commercialData = await getEmployeeById(id);
                setCommercial(commercialData);

                const logementsData = await getLogementsByCommercialId(id); 
                setLogements(Array.isArray(logementsData) ? logementsData : []);
            } catch (error) {
                setError(error.message);
                setLogements([]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    if (loading) {
        return <LoadingScreen theme={theme} sidebarCollapsed={sidebarCollapsed} />;
    }

    if (error) {
        return (
            <div className={clsx(
                theme === "dark" ? "bg-[#1a1818] text-[#f7f6f5]" : "bg-[#f7f6f5] text-[#0a0400]",
                "min-h-screen flex"
            )}>
                <Sidebar
                    activeRoute="Commercial"
                    theme={theme}
                    collapsed={sidebarCollapsed}
                    setCollapsed={setSidebarCollapsed}
                />
                <main className={clsx(
                    "mt-10 flex-1 flex flex-col min-h-screen transition-all duration-300",
                    sidebarCollapsed ? "pl-20" : "pl-58"
                )}>
                    <div className="px-8 py-10 text-center text-red-500">
                        {error}
                        <button
                            onClick={() => navigate(-1)}
                            className="mt-4 px-4 py-2 bg-[#473e3e] text-white rounded hover:bg-[#d1671b]"
                        >
                            Retour
                        </button>
                    </div>
                </main>
            </div>
        );
    }

    if (!commercial) {
        return null;
    }

    return (
        <div className={clsx(
            theme === "dark" ? "bg-[#1a1818] text-[#f7f6f5]" : "bg-[#f7f6f5] text-[#0a0400]",
            "min-h-screen flex"
        )}>
            <Sidebar
                activeRoute="Commercial"
                theme={theme}
                collapsed={sidebarCollapsed}
                setCollapsed={setSidebarCollapsed}
            />
            <main className={clsx(
                "mt-10 flex-1 flex flex-col min-h-screen transition-all duration-300",
                sidebarCollapsed ? "pl-20" : "pl-58"
            )}>
                <div className="px-8 py-10">
                    {/* Back button */}
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 mb-6 text-[#d1671b] hover:text-[#f2a866] transition-colors"
                    >
                        <FiArrowLeft size={20} />
                        <span>Retour</span>
                    </button>

                    {/* Commercial Details */}
                    <div className="bg-[#312b2b] rounded-2xl p-8 shadow-xl mb-10">
                        <h1 className="text-2xl font-bold mb-2">
                            {commercial.firstName} {commercial.lastName}
                        </h1>
                        <div className="text-gray-400 mb-6">{commercial.role}</div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h2 className="text-xl font-semibold mb-4">Informations Personnelles</h2>
                                <div className="space-y-3">
                                    <p><span className="font-semibold">Email:</span> {commercial.email}</p>
                                    <p><span className="font-semibold">Agence:</span> {commercial.agenceId || "Non spécifiée"}</p>
                                    <p><span className="font-semibold">Date d'ajout:</span> {new Date(commercial.createdAt).toLocaleDateString()}</p>
                                </div>
                            </div>

                            <div>
                                <h2 className="text-xl font-semibold mb-4">Statistiques</h2>
                                <div className="space-y-3">
                                    <p><span className="font-semibold">Nombre de logements:</span> {logements.length}</p>
                                    <p><span className="font-semibold">Dernière mise à jour:</span> {new Date(commercial.updatedAt).toLocaleDateString()}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Logements Section */}
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold mb-4">Logements Gérés</h2>
                        {logements.length === 0 ? (
                            <div className="text-center text-gray-400 py-8">
                                Aucun logement trouvé pour ce commercial.
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {logements.map(logement => (
                                    <PropertyCard key={logement.id} property={logement} />
                                    
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}