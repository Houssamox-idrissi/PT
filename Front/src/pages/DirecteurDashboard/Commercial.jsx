import React, { useState } from "react";
import Sidebar from "../../components/DirecteurDashboard/Sidebar";
import Topbar from "../../components/DirecteurDashboard/Topbar";
import clsx from "clsx";
import { FiSearch, FiPlus } from "react-icons/fi";

const mockCommercials = [
  { id: 1, name: "Sami Benali", role: "Commercial Senior", email: "sami.benali@agence.com", phone: "+212 600-123456" },
  { id: 2, name: "Nadia El Fassi", role: "Commercial Junior", email: "nadia.elfassi@agence.com", phone: "+212 600-654321" },
  { id: 3, name: "Youssef Amrani", role: "Commercial", email: "youssef.amrani@agence.com", phone: "+212 600-789012" },
  { id: 4, name: "Imane Chraibi", role: "Commercial", email: "imane.chraibi@agence.com", phone: "+212 600-345678" },
  { id: 5, name: "Karim Lahlou", role: "Commercial Senior", email: "karim.lahlou@agence.com", phone: "+212 600-987654" },
  { id: 6, name: "Sara Bouzid", role: "Commercial Junior", email: "sara.bouzid@agence.com", phone: "+212 600-112233" },
];

export default function Commercial() {
  const [search, setSearch] = useState("");
  const [theme, setTheme] = useState("dark");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const accent = "#d1671b";
  const Gray = "#473e3e";

  const filtered = mockCommercials.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={clsx(
      theme === "dark" ? "bg-[#1a1818] text-[#f7f6f5]" : "bg-[#f7f6f5] text-[#0a0400]",
      "min-h-screen flex"
    )}>
      <Sidebar activeRoute="Commercial" theme={theme} collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />
      <main className={clsx(
        "mt-10 flex-1 flex flex-col min-h-screen transition-all duration-300",
        sidebarCollapsed ? "pl-20" : "pl-58"
      )}>
        <div className="px-8 py-10">
          {/* Search Bar Area */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-8">
            <form className="flex flex-1 items-center bg-[#473e3e] rounded-full" onSubmit={e => e.preventDefault()}>
              <input
                type="text"
                placeholder="Rechercher"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 px-6 py-3 bg-transparent rounded-full text-lg focus:outline-none placeholder:text-gray-400 text-white border-none"
                style={{ minWidth: 0 }}
              />
              <button
                aria-label="Rechercher"
                type="submit"
                className="flex items-center justify-center w-12 h-12 rounded-full bg-transparent text-white focus:outline-none"
                style={{ border: 'none', boxShadow: 'none' }}
              >
                <FiSearch size={22} className="text-white" />
              </button>
            </form>
            <button
              aria-label="Ajouter un commercial"
              className="flex items-center gap-2 px-5 py-3 rounded-full font-semibold shadow-lg hover:scale-105 transition-transform text-white"
              style={{ backgroundColor: Gray }}
            >
              <FiPlus size={20} />
              <span className="hidden sm:inline">Ajouter un commercial</span>
            </button>
          </div>
          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {filtered.length === 0 ? (
              <div className="col-span-full text-center text-gray-400 text-xl">Aucun commercial trouvé.</div>
            ) : (
              filtered.map((c) => (
                <div
                  key={c.id}
                  className="rounded-2xl p-6 border border-white/10 shadow-xl group relative overflow-hidden bg-[#312b2b] transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:bg-[#372f2f]"
                  style={{ minHeight: 180 }}
                >
                  <div className="mb-3">
                    <div className="text-xl font-bold text-[#f2eded] group-hover:underline">{c.name}</div>
                    <div className="text-sm text-gray-400 mb-1">{c.role}</div>
                  </div>
                  <div className="text-base text-white/90 mb-1">
                    <span className="font-semibold">Email:</span> {c.email}
                  </div>
                  <div className="text-base text-white/90">
                    <span className="font-semibold">Téléphone:</span> {c.phone}
                  </div>
                  <div className="absolute right-0 top-0 w-2 h-full bg-gradient-to-b from-[#d1671b]/80 to-transparent opacity-0 group-hover:opacity-80 transition-all duration-300"></div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
} 