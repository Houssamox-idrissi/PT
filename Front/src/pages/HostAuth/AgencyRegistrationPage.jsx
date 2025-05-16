import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiHome, FiMail, FiPhone, FiUser, FiCheck, FiLock } from "react-icons/fi";
import { registerAgency } from "../../services/Agence/AgencyService";

export default function AgencyRegistrationPage() {
  const [formData, setFormData] = useState({
    nom: "",
    tel: "",
    email: "",
    directeurName: "",
    directeurEmail: "",
    directeurPassword: "",
    confirmPassword: ""
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      if (formData.directeurPassword !== formData.confirmPassword) {
        throw new Error("Les mots de passe ne correspondent pas");
      }

      if (!formData.nom || !formData.tel || !formData.email || 
          !formData.directeurName || !formData.directeurEmail || !formData.directeurPassword) {
        throw new Error("Tous les champs sont obligatoires");
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email) || !emailRegex.test(formData.directeurEmail)) {
        throw new Error("Format d'email invalide");
      }

      const phoneRegex = /^[0-9]{8,15}$/;
      if (!phoneRegex.test(formData.tel)) {
        throw new Error("Format de numéro de téléphone invalide");
      }

      const agency = await registerAgency(formData);
      localStorage.setItem("agency", JSON.stringify(agency));
      navigate("/dashboard");

    } catch (err) {
      setError(err.response?.data?.message || err.message || "Une erreur est survenue");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white">
      {/* Left side - Animated Branding */}
      <div className="w-full md:w-1/2 bg-gradient-to-br from-orange-50 to-pink-50 flex flex-col justify-between p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-orange-200 blur-xl"></div>
          <div className="absolute bottom-1/3 right-1/4 w-40 h-40 rounded-full bg-pink-200 blur-xl"></div>
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center">
            <img 
              src="/logo.png" 
              alt="Logo Holi Square" 
              className="h-12 w-auto"
            />
            <span className="ml-3 text-2xl font-bold text-orange-600">Holi Square</span>
          </div>

          <div className="max-w-md mt-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4 animate-fade-in">
              Rejoignez Notre <span className="text-orange-600">Réseau d'Agences</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Inscrivez votre agence immobilière et commencez à gérer vos biens efficacement.
            </p>
            
            <div className="space-y-4">
              {[
                "Gérez plusieurs propriétés",
                "Suivez les performances des agents",
                "Accédez à des analyses détaillées",
                "Recevez des notifications en temps réel",
                "Support client 24/7"
              ].map((item, index) => (
                <div 
                  key={index} 
                  className="flex items-start animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-orange-100 flex items-center justify-center mt-0.5">
                    <FiCheck className="h-4 w-4 text-orange-500" />
                  </div>
                  <p className="ml-3 text-gray-600">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative z-10 text-sm text-gray-500">
          © {new Date().getFullYear()} Holi Square. Tous droits réservés.
        </div>
      </div>

      {/* Right side - Interactive Registration Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-12 lg:p-24 bg-white">
        <div className="w-full max-w-md transform hover:scale-[1.01] transition-transform duration-300">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Inscription Agence</h2>
            <p className="text-gray-500">Créez votre compte agence</p>
          </div>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-lg flex items-center animate-shake">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <p>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Agency Information */}
            <div className="group">
              <label htmlFor="nom" className="block text-sm font-medium text-gray-700 mb-1 group-hover:text-orange-600 transition-colors">
                Nom de l'Agence *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-hover:text-orange-500 transition-colors">
                  <FiHome className="h-5 w-5" />
                </div>
                <input
                  type="text"
                  id="nom"
                  name="nom"
                  value={formData.nom}
                  onChange={handleChange}
                  className="pl-10 block w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent hover:border-orange-300 transition-all"
                  placeholder="Entrez le nom de l'agence"
                  required
                />
              </div>
            </div>

            <div className="group">
              <label htmlFor="tel" className="block text-sm font-medium text-gray-700 mb-1 group-hover:text-orange-600 transition-colors">
                Numéro de Téléphone *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-hover:text-orange-500 transition-colors">
                  <FiPhone className="h-5 w-5" />
                </div>
                <input
                  type="tel"
                  id="tel"
                  name="tel"
                  value={formData.tel}
                  onChange={handleChange}
                  className="pl-10 block w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent hover:border-orange-300 transition-all"
                  placeholder="Entrez le numéro de téléphone"
                  required
                />
              </div>
            </div>

            <div className="group">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1 group-hover:text-orange-600 transition-colors">
                Email *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-hover:text-orange-500 transition-colors">
                  <FiMail className="h-5 w-5" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="pl-10 block w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent hover:border-orange-300 transition-all"
                  placeholder="Entrez l'adresse email"
                  required
                />
              </div>
            </div>

            {/* Director Information */}
            <div className="group">
              <label htmlFor="directeurName" className="block text-sm font-medium text-gray-700 mb-1 group-hover:text-orange-600 transition-colors">
                Nom du Directeur *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-hover:text-orange-500 transition-colors">
                  <FiUser className="h-5 w-5" />
                </div>
                <input
                  type="text"
                  id="directeurName"
                  name="directeurName"
                  value={formData.directeurName}
                  onChange={handleChange}
                  className="pl-10 block w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent hover:border-orange-300 transition-all"
                  placeholder="Entrez le nom du directeur"
                  required
                />
              </div>
            </div>

            <div className="group">
              <label htmlFor="directeurEmail" className="block text-sm font-medium text-gray-700 mb-1 group-hover:text-orange-600 transition-colors">
                Email du Directeur *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-hover:text-orange-500 transition-colors">
                  <FiMail className="h-5 w-5" />
                </div>
                <input
                  type="email"
                  id="directeurEmail"
                  name="directeurEmail"
                  value={formData.directeurEmail}
                  onChange={handleChange}
                  className="pl-10 block w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent hover:border-orange-300 transition-all"
                  placeholder="Entrez l'email du directeur"
                  required
                />
              </div>
            </div>

            {/* Password Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="group">
                <label htmlFor="directeurPassword" className="block text-sm font-medium text-gray-700 mb-1 group-hover:text-orange-600 transition-colors">
                  Mot de Passe *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-hover:text-orange-500 transition-colors">
                    <FiLock className="h-5 w-5" />
                  </div>
                  <input
                    type="password"
                    id="directeurPassword"
                    name="directeurPassword"
                    value={formData.directeurPassword}
                    onChange={handleChange}
                    className="pl-10 block w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent hover:border-orange-300 transition-all"
                    required
                  />
                </div>
              </div>

              <div className="group">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1 group-hover:text-orange-600 transition-colors">
                  Confirmer le Mot de Passe *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-hover:text-orange-500 transition-colors">
                    <FiLock className="h-5 w-5" />
                  </div>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="pl-10 block w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent hover:border-orange-300 transition-all"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start group">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  className="focus:ring-orange-500 h-4 w-4 text-orange-600 border-gray-300 rounded hover:border-orange-400 transition-colors"
                  required
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="terms" className="text-gray-700 group-hover:text-gray-900 transition-colors">
                  J'accepte les <a href="#" className="text-orange-600 hover:text-orange-500 transition-colors">Conditions</a> et la <a href="#" className="text-orange-600 hover:text-orange-500 transition-colors">Politique de Confidentialité</a> *
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all duration-300 ${isLoading ? 'opacity-75 cursor-not-allowed' : 'hover:shadow-md'}`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Inscription en cours...
                </>
              ) : (
                "S'inscrire comme Agence"
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Vous avez déjà un compte ?{' '}
              <Link to="/agency/login" className="font-medium text-orange-600 hover:text-orange-500 transition-colors">
                Se connecter
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}