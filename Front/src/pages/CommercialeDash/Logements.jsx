import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import SidebarCommerciale from "../../components/CommercialeDash/SidebarCommerciale";
import { getLogementsByCommercialToken, deleteLogement } from "../../services/logements/logementService";
import { FiPlusCircle } from "react-icons/fi";
import { dakhl } from "../../services/Agence/authService";
import LogementCard from "../../components/Commercial/LogementCard"; 

export default function Logements() {
  const navigate = useNavigate();
  const [theme] = useState("dark");
  const [activeRoute, setActiveRoute] = useState("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [logements, setLogements] = useState([]);
  const [loading, setLoading] = useState(true);

  const colors = {
    primary: "bg-[#312b2b]",
    hover: "hover:bg-[#3d3636]",
    text: "text-[#f7f6f5]",
    background: "bg-[#0a0400]",
    cardBg: "bg-[#1a1a1a]"
  };

  useEffect(() => {
    const checkAuth = async () => {
      if (!dakhl()) {
        navigate("/Commerciale");
      }
      fetchLogements();
    };
    checkAuth();
  }, [navigate]);
  
  const fetchLogements = async () => {
    try {
      setLoading(true);
      const data = await getLogementsByCommercialToken();
      setLogements(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching logements:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSuccess = async (deletedLogementId) => {
    try {
      // Optimistic UI update
      setLogements(prevLogements => 
        prevLogements.filter(logement => logement.id !== deletedLogementId)
      );
      
      // Then actually delete from server
      await deleteLogement(deletedLogementId);
      
      // Optional: Refetch to ensure sync with server
      // await fetchLogements();
    } catch (error) {
      console.error("Error deleting logement:", error);
      // Revert if error occurs
      fetchLogements();
    }
  };

  if (loading) {
    return (
      <div className={`${colors.background} ${colors.text} min-h-screen flex`}>
        <SidebarCommerciale
          activeRoute={activeRoute}
          onRouteChange={setActiveRoute}
          theme={theme}
          collapsed={sidebarCollapsed}
          setCollapsed={setSidebarCollapsed}
        />
        <div className="flex-1 p-6 pl-64">
          <p>Loading logements...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`${colors.background} ${colors.text} min-h-screen flex`}>
      <SidebarCommerciale
        activeRoute={activeRoute}
        onRouteChange={setActiveRoute}
        theme={theme}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />

      <main
        className={clsx(
          "mt-10 flex-1 flex flex-col min-h-screen transition-all duration-300 p-6",
          sidebarCollapsed ? "pl-24" : "pl-64"
        )}
      >
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Your Logements</h1>
          <button
            onClick={() => navigate("/BecomeHost")}
            className={`${colors.primary} ${colors.hover} ${colors.text} px-4 py-2 rounded-lg flex items-center gap-2 transition-colors`}
          >
            <FiPlusCircle className="text-lg" />
            Add New Logement
          </button>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className={`${colors.cardBg} p-4 rounded-lg shadow`}>
            <p className="text-gray-400">Total Logements</p>
            <p className="text-2xl font-bold">{logements.length}</p>
          </div>
          <div className={`${colors.cardBg} p-4 rounded-lg shadow`}>
            <p className="text-gray-400">Avg. Price</p>
            <p className="text-2xl font-bold">
              {logements.length > 0
                ? Math.round(
                    logements.reduce((sum, l) => sum + l.pricePerNight, 0) /
                      logements.length
                  )
                : 0}{" "}
              €
            </p>
          </div>
        </div>

        {/* Logements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {logements.map((logement) => (
            <LogementCard 
              key={logement.id} 
              logement={logement} 
              onDeleteSuccess={() => handleDeleteSuccess(logement.id)}
            />
          ))}
        </div>

        {/* Empty State */}
        {logements.length === 0 && !loading && (
          <div className="flex flex-col items-center justify-center py-12">
            <img
              src="/empty-state.svg"
              alt="No logements"
              className="w-64 mb-6 opacity-80"
            />
            <h3 className="text-xl font-medium mb-2">No Logements Found</h3>
            <p className="text-gray-400 mb-4">
              Get started by adding your first property.
            </p>
            <button
              onClick={() => navigate("/Commerciale/add-logement")}
              className={`${colors.primary} ${colors.hover} ${colors.text} px-6 py-2 rounded-lg flex items-center gap-2`}
            >
              <FiPlusCircle /> Create Logement
            </button>
          </div>
        )}
      </main>
    </div>
  );
}