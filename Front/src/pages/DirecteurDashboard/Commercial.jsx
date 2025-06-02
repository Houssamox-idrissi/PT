import React, { useState, useEffect } from "react";
import Sidebar from "../../components/DirecteurDashboard/Sidebar";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import { FiSearch, FiPlus } from "react-icons/fi";
import {
  getAllEmployees,
  registerEmployee,
  updateEmployee,
  deleteEmployee,
  getAgenceBYCommercial
} from "../../services/Commérciaux/EmployeeService";
import CommercialModal from "../../components/Commercial/CommercialModal";
import CommercialCard from "../../components/Commercial/CommercialCard";
import LoadingScreen from "../../components/loading/loadin";

export default function Commercial() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [theme, setTheme] = useState("dark");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName : "",
    email: "",
    password: "",
    role: "COMMERCIAL",
    agenceId: 1,
  });

  const Gray = "#473e3e";

  //T2akd mn auth
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token'); 
      if (!token) {
        navigate('/login'); 
      }
    };
  
    checkAuth();
  }, [navigate]); 

  const fetchEmployeesByCommercials = async () => {
    try {
      setLoading(true);
      const data = await getAgenceBYCommercial();
      setEmployees(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployeesByCommercials();
  }, []);

  const handleAddCommercial = async (e) => {
    e.preventDefault();
    try {
      await registerEmployee(formData);
      fetchEmployeesByCommercials();
      setShowModal(false);
      resetForm();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdateCommercial = async (e) => {
    e.preventDefault();
    try {
      await updateEmployee(editingId, formData);
      fetchEmployeesByCommercials();
      setEditingId(null);
      resetForm();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteCommercial = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce commercial ?")) {
      try {
        await deleteEmployee(id);
        fetchEmployeesByCommercials();
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const handleEditClick = (commercial) => {
    setEditingId(commercial.id);
    setFormData({
      firstName: commercial.firstName,
      lastName: commercial.lastName,
      email: commercial.email,
      password: "",
      role: commercial.role,
      agenceId: commercial.agenceId,
    });
    setShowModal(true);
  };

  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      role: "COMMERCIAL",
      agenceId: 2,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const filtered = employees.filter(
    (c) =>
      (c.firstName && c.firstName.toLowerCase().includes(search.toLowerCase())) ||
      (c.lastName && c.lastName.toLowerCase().includes(search.toLowerCase())) ||
      (c.email && c.email.toLowerCase().includes(search.toLowerCase()))
  );

  if (loading) {
    return <LoadingScreen theme={theme} sidebarCollapsed={sidebarCollapsed} />;
  }


  return (
    <div className={clsx(
      theme === "dark" ? "bg-[#1a1818] text-[#f7f6f5]" : "bg-[#f7f6f5] text-[#0a0400]",
      "min-h-screen flex"
    )}>
      <Sidebar
        activeRoute="Commercial"
        theme={theme}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />
      <main className={clsx(
        "mt-10 flex-1 flex flex-col min-h-screen transition-all duration-300",
        sidebarCollapsed ? "pl-20" : "pl-58"
      )}>
        <div className="px-8 py-10">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-8">
            <form
              className="flex flex-1 items-center bg-[#473e3e] rounded-full"
              onSubmit={(e) => e.preventDefault()}
            >
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
                style={{ border: "none", boxShadow: "none" }}
              >
                <FiSearch size={22} className="text-white" />
              </button>
            </form>
            <button
              aria-label="Ajouter un commercial"
              className="flex items-center gap-2 px-5 py-3 rounded-full font-semibold shadow-lg hover:scale-105 transition-transform text-white"
              style={{ backgroundColor: Gray }}
              onClick={() => setShowModal(true)}
            >
              <FiPlus size={20} />
              <span className="hidden sm:inline">Ajouter un commercial</span>
            </button>
          </div>

          <CommercialModal
            isOpen={showModal || editingId !== null}
            onClose={() => {
              setShowModal(false);
              setEditingId(null);
              resetForm();
            }}
            onSubmit={editingId ? handleUpdateCommercial : handleAddCommercial}
            formData={formData}
            onInputChange={handleInputChange}
            isEditing={editingId !== null}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {filtered.length === 0 ? (
              <div className="col-span-full text-center text-gray-400 text-xl">
                Aucun commercial trouvé.
              </div>
            ) : (
              filtered.map((commercial) => (
                <CommercialCard
                  key={commercial.id}
                  commercial={commercial}
                  onEdit={handleEditClick}
                  onDelete={handleDeleteCommercial}
                />
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
