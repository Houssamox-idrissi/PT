import React, { useState } from "react";
import Sidebar from "../../components/DirecteurDashboard/Sidebar";
import Topbar from "../../components/DirecteurDashboard/Topbar";
import KPIWidgets from "../../components/DirecteurDashboard/KPIWidgets";
import ChartCard from "../../components/DirecteurDashboard/ChartCard";
import NotificationsCard from "../../components/DirecteurDashboard/NotificationsCard";
import EmployeeTable from "../../components/DirecteurDashboard/EmployeeTable";
import clsx from "clsx";

export default function DirecteurDashboard() {
  const [theme, setTheme] = useState("dark");
  const [activeRoute, setActiveRoute] = useState("dashboard");

  return (
    <div className={clsx(
      theme === "dark" ? "bg-[#0a0400] text-[#f7f6f5]" : "bg-[#f7f6f5] text-[#0a0400]",
      "min-h-screen flex"
    )}>
      <Sidebar activeRoute={activeRoute} onRouteChange={setActiveRoute} theme={theme} />
      <main className="flex-1 flex flex-col min-h-screen pl-20 md:pl-72 transition-all duration-300">
        <Topbar theme={theme} setTheme={setTheme} />
        <KPIWidgets />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 px-8 mb-8">
          <ChartCard />
          <NotificationsCard />
        </div>
        <EmployeeTable />
      </main>
    </div>
  );
} 