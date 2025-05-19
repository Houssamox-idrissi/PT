import React, { useState } from "react";
import clsx from "clsx";
import { useEffect } from "react";
import { dakhl, jibToken } from "../../services/Agence/authService";
import { useNavigate } from "react-router-dom";
import SidebarCommerciale from "../../components/CommercialeDash/SidebarCommerciale";
import { getLogementsByCommercialToken } from "../../services/logements/logementService";

export default function Logements() {
  const navigate = useNavigate();
  const [theme, setTheme] = useState("dark");
  const [activeRoute, setActiveRoute] = useState("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [logements, setLogements] = useState([]);

  useEffect(() => {
    const checkAuth = async () => {
      if (!dakhl()) {
        navigate('/Commerciale');
      }
      fetchLogements();
    };
    checkAuth();
  }, [navigate]);

  const fetchLogements = async () => {
    try {
      const data = await getLogementsByCommercialToken();
      setLogements(data);
    } catch (error) {
      console.error("Error fetching logements:", error);
    }
  };

  return (
    <div className={clsx(
      theme === "dark" ? "bg-[#0a0400] text-[#f7f6f5]" : "bg-[#f7f6f5] text-[#0a0400]",
      "min-h-screen flex"
    )}>
      <SidebarCommerciale 
        activeRoute={activeRoute} 
        onRouteChange={setActiveRoute} 
        theme={theme}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />
      
      <main className={clsx(
        "mt-10 flex-1 flex flex-col min-h-screen transition-all duration-300 p-4",
        sidebarCollapsed ? "pl-20" : "pl-58"
      )}>
        <h1 className="text-2xl font-bold mb-6">Liste des Logements</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {logements.map((logement) => (
            <div 
              key={logement.id} 
              className="bg-[#1a1a1a] rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105"
            >
              {/* Display the first image if available */}
              {logement.imagesBase64 && logement.imagesBase64.length > 0 && (
                <div className="h-48 overflow-hidden">
                  <img 
                    src={`data:image/jpeg;base64,${logement.imagesBase64[0]}`} 
                    alt={logement.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{logement.title}</h2>
                <div className="flex items-center mb-2">
                  <span className="bg-[#473e3e] text-white px-3 py-1 rounded-full text-sm">
                    {logement.type}
                  </span>
                </div>
                <p className="text-gray-300">{logement.description}</p>
                
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-lg font-bold">{logement.pricePerNight} €/nuit</span>
                  <button className="bg-[#473e3e] text-white px-4 py-2 rounded-lg hover:bg-[#5a4f4f]">
                    Voir détails
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}