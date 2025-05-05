import React, { useState } from "react";
import Sidebar from "../components/Dashboard/EmployeeDashboard/Sidebar";
import KPIBar from "../components/Dashboard/EmployeeDashboard/KPIBar";
import ChartsPanel from "../components/Dashboard/EmployeeDashboard/ChartsPanel";
import EmployeeGrid from "../components/Dashboard/EmployeeDashboard/EmployeeGrid";
import Greeting from "../components/Dashboard/EmployeeDashboard/Greeting";
import ThemeToggle from "../components/Dashboard/EmployeeDashboard/ThemeToggle";

export default function DirecteurDashboard() {
  const [theme, setTheme] = useState("dark");
  return (
    <div className="bg-[#0a0400] text-[#f7f6f5]" style={{ minHeight: "100vh" }}>
      <div className="flex">
        <Sidebar theme={theme} />
        <main className="flex-1 px-10 py-8 transition-colors duration-300">
          <div className="flex justify-between items-center mb-8">
            <Greeting user="Directeur Ikram" />
            <ThemeToggle theme={theme} setTheme={setTheme} />
          </div>
          <KPIBar theme={theme} />
          <ChartsPanel theme={theme} />
          <EmployeeGrid theme={theme} />
        </main>
      </div>
    </div>
  );
} 