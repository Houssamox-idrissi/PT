import React, { useState } from "react";
import Sidebar from "../../components/DirecteurDashboard/Sidebar";
import Topbar from "../../components/DirecteurDashboard/Topbar";
import KPIWidgets from "../../components/DirecteurDashboard/KPIWidgets";
import ChartCard from "../../components/DirecteurDashboard/ChartCard";
import NotificationsCard from "../../components/DirecteurDashboard/NotificationsCard";
import EmployeeTable from "../../components/DirecteurDashboard/EmployeeTable";
import clsx from "clsx";
import { useEffect } from "react";
import { dakhl } from "../../services/Agence/authService";
import { useNavigate } from "react-router-dom";

export default function DirecteurDashboard() {
  const navigate = useNavigate();
  const [theme, setTheme] = useState("dark");
  const [activeRoute, setActiveRoute] = useState("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  //t2akd mn auth
  useEffect(() => {
    if (!dakhl()) {
      navigate('/agency/login');
      return;
    }
  }, [navigate]);

  return (
    <div className={clsx(
      theme === "dark" ? "bg-[#0a0400] text-[#f7f6f5]" : "bg-[#f7f6f5] text-[#0a0400]",
      "min-h-screen flex"
    )}>
      <Sidebar activeRoute={activeRoute} onRouteChange={setActiveRoute} theme={theme}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />
       <main className={clsx(
              "mt-10 flex-1 flex flex-col min-h-screen transition-all duration-300",
              sidebarCollapsed ? "pl-20" : "pl-58"
            )}>
        <div>
          <Topbar theme={theme} setTheme={setTheme} />
          <KPIWidgets />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 px-8 mb-8">
            <ChartCard />
          </div>
        </div>
      </main>
    </div>
  );
} 