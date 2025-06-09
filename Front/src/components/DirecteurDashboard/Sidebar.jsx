import { useState, useEffect } from "react";
import {
    FiGrid,
    FiUsers,
    FiSettings,
    FiMenu,
    FiBell,
    FiLogOut,
} from "react-icons/fi";
import clsx from "clsx";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../services/Agence/authService";
import { jwtDecode } from "jwt-decode";

export default function Sidebar({
    activeRoute = "dashboard",
    theme = "dark",
    collapsed,
    setCollapsed,
}) {
    const [userName, setUserName] = useState("");
    const navigate = useNavigate();

    const navItems = [
        { id: "DirecteurDashboard", label: "Dashboard", icon: <FiGrid /> },
        { id: "Commercial", label: "Commérciaux", icon: <FiUsers /> },
        { id: "notifications", label: "Notifications", icon: <FiBell /> },
        { id: "settings", label: "Paramètres", icon: <FiSettings /> },
    ];

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token && typeof token === "string") {
            try {
                const decodedToken = jwtDecode(token);

                const capitalize = (str) =>
                    str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : "";

                const firstName = capitalize(decodedToken.firstName);
                const lastName = capitalize(decodedToken.lastName);
                setUserName(`${firstName} ${lastName}`);
            } catch (error) {
                console.error("Invalid token:", error.message);
                navigate("/login");
            }
        } else {
            navigate("/login");
        }
    }, [navigate]);

    const accent = "#d1671b";
    const bg =
        theme === "dark"
            ? "bg-[#151313] backdrop-blur-xl"
            : "bg-[rgba(247,246,245,0.7)] backdrop-blur-xl";
    const text = theme === "dark" ? "text-[#f7f6f5]" : "text-[#0a0400]";

    const handleLogout = () => {
        logout();
        navigate("/agency/login");
    };

    return (
        <aside
            className={clsx(
                "h-screen flex flex-col justify-between fixed top-0 left-0 z-40 transition-all duration-300",
                collapsed ? "w-20" : "w-58",
                bg,
                text,
                "border-r border-white/10 shadow-2xl"
            )}
            aria-label="Sidebar"
        >
            {/* Logo and collapse button */}
            {collapsed ? (
                <div className="flex flex-col items-center justify-center px-0 py-6">
                    <img
                        src="/logo.png"
                        alt="Logo"
                        className="rounded-full w-12 h-12 border-3 mb-4"
                        style={{ borderColor: accent }}
                    />
                    <button
                        aria-label="Expand sidebar"
                        onClick={() => setCollapsed(false)}
                        className="hover:bg-white/10 rounded-full transition"
                    >
                        <FiMenu size={20} />
                    </button>
                </div>
            ) : (
                <div className="flex items-center justify-between px-6 py-6">
                    <img
                        src="/logo.png"
                        alt="Logo"
                        className="rounded-full w-12 h-12 border-3"
                        style={{ borderColor: accent }}
                    />
                    <button
                        aria-label="Collapse sidebar"
                        onClick={() => setCollapsed(true)}
                        className="hover:bg-white/10 rounded-full transition"
                    >
                        <FiMenu size={20} />
                    </button>
                </div>
            )}

            {/* Navigation */}
            <nav className="flex-1 flex flex-col gap-2 mt-4">
                {navItems.map((item) => (
                    <NavLink
                        key={item.id}
                        to={`/${item.id}`}
                        className={({ isActive }) =>
                            clsx(
                                "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 relative group",
                                isActive
                                    ? `bg-[${accent}] bg-opacity-80 text-white shadow-lg`
                                    : "hover:bg-white/10 hover:text-white",
                                collapsed ? "justify-center px-2" : ""
                            )
                        }
                        aria-current={activeRoute === item.id ? "page" : undefined}
                        aria-label={item.label}
                        end
                    >
                        <span className="relative flex items-center">{item.icon}</span>
                        {!collapsed && (
                            <span className="ml-2 font-medium text-base">{item.label}</span>
                        )}
                    </NavLink>
                ))}
            </nav>

            {/* User card */}
            <div className="flex flex-col items-center p-6">
                <img
                    src="/profile.png"
                    alt="User Avatar"
                    className={clsx(
                        "rounded-full",
                        collapsed ? "w-8 h-8" : "w-12 h-12",
                        "mb-2 border-2 border-white/20",
                        "filter-none  dark:invert"
                    )}
                />
                {!collapsed && (
                    <>
                        <span className="text-[#d1671b] text-sm font-semibold mb-1">
                            {userName}
                        </span>
                        <span className="text-xs text-[#f7f6f5]/60 mb-2">Directeur</span>
                    </>
                )}
                <div className="flex space-x-2 mt-2">
                    <button
                        className="p-2 rounded-full hover:bg-white/10 text-[#d1671b] focus:outline-none"
                        aria-label="Paramètres"
                    >
                        <FiSettings />
                    </button>
                    <button
                        onClick={handleLogout}
                        className="p-2 rounded-full hover:bg-white/10 text-[#d1671b] focus:outline-none"
                        aria-label="Déconnexion"
                    >
                        <FiLogOut />
                    </button>
                </div>
            </div>
        </aside>
    );
}
