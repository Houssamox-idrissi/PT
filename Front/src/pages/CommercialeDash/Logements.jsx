import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import SidebarCommerciale from "../../components/CommercialeDash/SidebarCommerciale";
import { getLogementsByCommercialToken } from "../../services/logements/logementService";
import { FiPlusCircle, FiArrowRight } from "react-icons/fi";
import { dakhl } from "../../services/Agence/authService";

export default function Logements() {
  const navigate = useNavigate();
  const [theme] = useState("dark"); // Theme locked to dark for consistency
  const [activeRoute, setActiveRoute] = useState("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [logements, setLogements] = useState([]);

  // Color palette based on #312b2b
  const colors = {
    primary: "#312b2b",
    secondary: "#473e3e",
    accent: "#5a4f4f",
    text: "#f7f6f5",
    background: "#0a0400",
    cardBg: "#1a1a1a",
    hover: "#3d3636",
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
      const data = await getLogementsByCommercialToken();
      setLogements(data);
    } catch (error) {
      console.error("Error fetching logements:", error);
    }
  };

  return (
    <div
      className={clsx(
        `bg-[${colors.background}] text-[${colors.text}]`,
        "min-h-screen flex"
      )}
    >
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
            onClick={() => navigate("/BecomeHost")} // Update route as needed
            className={`bg-[${colors.primary}] hover:bg-[${colors.hover}] text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors`}
          >
            <FiPlusCircle className="text-lg" />
            Add New Logement
          </button>
        </div>

        {/* Stats Bar (Optional) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className={`bg-[${colors.cardBg}] p-4 rounded-lg shadow`}>
            <p className="text-gray-400">Total Logements</p>
            <p className="text-2xl font-bold">{logements.length}</p>
          </div>
          <div className={`bg-[${colors.cardBg}] p-4 rounded-lg shadow`}>
            <p className="text-gray-400">Active</p>
            <p className="text-2xl font-bold">
              {logements.filter((l) => l.status === "active").length}
            </p>
          </div>
          <div className={`bg-[${colors.cardBg}] p-4 rounded-lg shadow`}>
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
            <div
              key={logement.id}
              className={`bg-[${colors.cardBg}] rounded-lg overflow-hidden shadow-lg transition-all hover:shadow-xl hover:translate-y-[-4px]`}
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
                  onClick={() => navigate(`/logement-details/${logement.id}`)} // Update route
                  className={`w-full bg-[${colors.primary}] hover:bg-[${colors.hover}] text-white py-2 rounded-lg flex items-center justify-center gap-2 transition-colors`}
                >
                  View Details <FiArrowRight />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {logements.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12">
            <img
              src="/empty-state.svg" // Replace with your illustration
              alt="No logements"
              className="w-64 mb-6 opacity-80"
            />
            <h3 className="text-xl font-medium mb-2">
              No Logements Found
            </h3>
            <p className="text-gray-400 mb-4">
              Get started by adding your first property.
            </p>
            <button
              onClick={() => navigate("/Commerciale/add-logement")}
              className={`bg-[${colors.primary}] hover:bg-[${colors.hover}] text-white px-6 py-2 rounded-lg flex items-center gap-2`}
            >
              <FiPlusCircle /> Create Logement
            </button>
          </div>
        )}
      </main>
    </div>
  );
}