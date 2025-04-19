import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <img 
                className="h-8 w-auto" 
                src="/logo.png" 
                alt="Voyageur Logo"
              />
              <span className="ml-2 text-xl font-bold text-gray-900">Voyageur</span>
            </Link>
          </div>
          <div className="hidden md:ml-6 md:flex md:items-center md:space-x-8">
            <Link to="/" className="text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium">Home</Link>
            <Link to="/properties" className="text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium">Properties</Link>
            <Link to="/about" className="text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium">About</Link>
            <Link to="/contact" className="text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium">Contact</Link>
            <div className="flex space-x-4">
              <Link to="/login" className="text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium">Login</Link>
              <Link to="/register" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium">Register</Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}