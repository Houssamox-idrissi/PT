import { FiSun, FiMoon } from "react-icons/fi";

export default function Topbar({ theme, setTheme }) {
  return (
    <div className="flex items-center justify-between px-8 pt-8 pb-4">
      <div className="flex items-center gap-4">
        <img src="/avatar1.png" alt="Directeur" className="w-14 h-14 rounded-full border-2 border-[#d1671b] shadow-lg" />
        <div>
          <div className="text-lg font-semibold">Bienvenue, Ikram</div>
          <div className="text-sm opacity-70">Directeur Général</div>
        </div>
      </div>
      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#d1671b] text-[#d1671b] hover:bg-[#d1671b] hover:text-white transition"
      >
        {theme === "dark" ? <FiSun /> : <FiMoon />} {theme === "dark" ? "Mode clair" : "Mode sombre"}
      </button>
    </div>
  );
} 