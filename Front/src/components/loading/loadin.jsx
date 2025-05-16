import clsx from "clsx";
import Sidebar from "../../components/DirecteurDashboard/Sidebar";
const LoadingScreen = ({ theme, sidebarCollapsed }) => (
  <div className={clsx(
    theme === "dark" ? "bg-[#1a1818] text-[#f7f6f5]" : "bg-[#f7f6f5] text-[#0a0400]",
    "min-h-screen flex"
  )}>
    <Sidebar
      activeRoute="Commercial"
      theme={theme}
      collapsed={sidebarCollapsed}
      setCollapsed={() => {}}
    />
    <main className={clsx(
      "mt-10 flex-1 flex flex-col min-h-screen transition-all duration-300",
      sidebarCollapsed ? "pl-20" : "pl-58"
    )}>
      <div className="px-8 py-10">
        <div className="text-center">Chargement des commerciaux...</div>
      </div>
    </main>
  </div>
);
export default LoadingScreen;