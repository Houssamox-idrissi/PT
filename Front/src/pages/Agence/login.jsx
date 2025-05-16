import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  FiMail, 
  FiLock, 
  FiArrowRight, 
  FiLoader,
  FiHome,
  FiUsers,
  FiPieChart,
  FiLogOut
} from "react-icons/fi";
import { login, dakhl } from '../../services/Agence/authService';

export default function AgenceLoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Check auth state on mount
  useEffect(() => {
    setLoggedIn(dakhl());
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    try {
      const response = await login(email, password);
      if (response && response.success) {
        setLoggedIn(true);
        setTimeout(() => navigate("/DirecteurDashboard"), 1500); // Smooth transition
      } else {
        setError(response?.message || "Invalid email or password");
      }
    } catch (err) {
      // Error handling remains the same
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setLoggedIn(false);
    // Optional: Add a small delay for smoother UX
    setTimeout(() => window.location.reload(), 500);
  };

  if (loggedIn) {
    return (
      <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-orange-50 to-pink-50">
        {/* Welcome Panel - Animated */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-12 transition-all duration-1000">
          <div className="max-w-md text-center animate-fade-in">
            <div className="relative">
              <div className="absolute -inset-4 bg-orange-100 rounded-full blur-md opacity-75"></div>
              <div className="relative bg-white p-8 rounded-2xl shadow-lg">
                <h1 className="text-4xl font-bold text-orange-600 mb-4">Welcome Back!</h1>
                <p className="text-lg text-gray-600 mb-6">
                  You're already logged in. Ready to manage your properties?
                </p>
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-white/50 p-4 rounded-xl border border-orange-100 hover:shadow-md transition-all">
                    <FiHome className="mx-auto h-8 w-8 text-orange-500 mb-2" />
                    <p className="font-medium">Properties</p>
                  </div>
                  <div className="bg-white/50 p-4 rounded-xl border border-orange-100 hover:shadow-md transition-all">
                    <FiUsers className="mx-auto h-8 w-8 text-orange-500 mb-2" />
                    <p className="font-medium">Agents</p>
                  </div>
                  <div className="bg-white/50 p-4 rounded-xl border border-orange-100 hover:shadow-md transition-all">
                    <FiPieChart className="mx-auto h-8 w-8 text-orange-500 mb-2" />
                    <p className="font-medium">Analytics</p>
                  </div>
                  <div className="bg-white/50 p-4 rounded-xl border border-orange-100 hover:shadow-md transition-all">
                    <FiMail className="mx-auto h-8 w-8 text-orange-500 mb-2" />
                    <p className="font-medium">Messages</p>
                  </div>
                </div>
                <div className="flex space-x-4">
                  <button
                    onClick={() => navigate("/DirecteurDashboard")}
                    className="flex-1 bg-orange-600 hover:bg-orange-700 text-white py-3 px-6 rounded-lg font-medium transition-colors"
                  >
                    Go to Dashboard
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex items-center justify-center gap-2 text-orange-600 hover:text-orange-700 py-3 px-4 rounded-lg font-medium transition-colors"
                  >
                    <FiLogOut /> Sign Out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Side */}
        <div className="w-full md:w-1/2 bg-white flex items-center justify-center p-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-pink-50 opacity-20"></div>
          <div className="relative z-10 text-center">
            <div className="inline-block p-8 bg-white rounded-2xl shadow-xl transform rotate-2 hover:rotate-0 transition-transform duration-500">
              <img 
                src="/logo.png" 
                alt="Holi Square Logo" 
                className="h-24 w-auto mx-auto mb-6"
              />
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Holi Square Agency</h2>
              <p className="text-gray-600">Premium property management</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Original login form with some creative enhancements
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
              alt="Holi Square Logo" 
              className="h-12 w-auto"
            />
            <span className="ml-3 text-2xl font-bold text-orange-600">Holi Square</span>
          </div>

          <div className="max-w-md mt-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4 animate-fade-in">
              Welcome back, <span className="text-orange-600">Agency</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Manage your properties, agents, and client relationships with our professional agency tools.
            </p>
            
            <div className="space-y-4">
              {[
                "Manage your properties",
                "Track agent performance",
                "Access detailed analytics"
              ].map((item, index) => (
                <div 
                  key={index} 
                  className="flex items-start animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-orange-100 flex items-center justify-center mt-0.5">
                    <svg className="h-4 w-4 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="ml-3 text-gray-600">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative z-10 text-sm text-gray-500">
          © {new Date().getFullYear()} Holi Square. All rights reserved.
        </div>
      </div>

      {/* Right side - Interactive Login Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-12 lg:p-24 bg-white">
        <div className="w-full max-w-md transform hover:scale-[1.01] transition-transform duration-300">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Agency Sign In</h2>
            <p className="text-gray-500">Enter your agency credentials</p>
          </div>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-lg flex items-center animate-shake">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <p>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="group">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1 group-hover:text-orange-600 transition-colors">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-hover:text-orange-500 transition-colors">
                  <FiMail className="h-5 w-5" />
                </div>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 block w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent hover:border-orange-300 transition-all"
                  placeholder="agency@example.com"
                  required
                />
              </div>
            </div>

            <div className="group">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1 group-hover:text-orange-600 transition-colors">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-hover:text-orange-500 transition-colors">
                  <FiLock className="h-5 w-5" />
                </div>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 block w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent hover:border-orange-300 transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded hover:border-orange-400 transition-colors"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 hover:text-gray-900 transition-colors">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-orange-600 hover:text-orange-500 transition-colors">
                  Forgot password?
                </a>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all duration-300 ${isLoading ? 'opacity-75 cursor-not-allowed' : 'hover:shadow-md'}`}
            >
              {isLoading ? (
                <>
                  <FiLoader className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign in <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}