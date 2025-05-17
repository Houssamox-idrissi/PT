import React, { useState } from "react";
import clsx from "clsx";
import { useEffect } from "react";
import { dakhl, jibToken } from "../../services/Agence/authService";
import { useNavigate } from "react-router-dom";
import SidebarCommerciale from "../../components/CommercialeDash/SidebarCommerciale";
import {getLogementsByCommercialToken} from "../../services/logements/logementService";

export default function Logements() {
  const navigate = useNavigate();
  const [theme, setTheme] = useState("dark");
  const [activeRoute, setActiveRoute] = useState("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const [logements, setLogements] = useState([]);

  useEffect(() => {
    const checkAuth = async () => {
      if (!dakhl()) {
        navigate('/Commerciale')
      }
      fetchLogements();
    }
    return checkAuth();
  }, [navigate])

  const fetchLogements = async() => {
    try {
      const token = jibToken();
      const data = await getLogementsByCommercialToken(token);
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
      <SidebarCommerciale activeRoute={activeRoute} onRouteChange={setActiveRoute} theme={theme}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />
      <main className={clsx(
        "mt-10 flex-1 flex flex-col min-h-screen transition-all duration-300",
        sidebarCollapsed ? "pl-20" : "pl-58"
      )}>
        <div>
         
        </div>
      </main>
    </div>
  );
} 