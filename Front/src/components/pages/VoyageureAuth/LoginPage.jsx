import LoginForm from "../../Auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 to-amber-50 flex flex-col items-center  pb-6 px-4 sm:px-6 lg:px-8">
      {/* Form positioned at the top */}
      <div className="w-full sm:max-w-md mb-12">
        <LoginForm />
      </div>

      {/* Branding and decorative elements below the form */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mt-auto">
        {/* Passport-themed logo container */}
        <div className="relative mx-auto w-24 h-24 mb-6">
          <div className="absolute inset-0 bg-blue-600 rounded-full shadow-lg transform rotate-3"></div>
          <div className="absolute inset-1 bg-white rounded-full border-4 border-blue-600 flex items-center justify-center">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-12 w-12 text-blue-600" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
              />
            </svg>
          </div>
        </div>
        
        <h2 className="text-4xl font-bold text-gray-800 font-serif">
          Voyageur
        </h2>
        <p className="mt-2 text-lg text-gray-600">
          Your passport to extraordinary journeys
        </p>
        
        {/* Decorative elements */}
        <div className="mt-8 flex justify-center space-x-6">
          <svg className="h-6 w-6 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          <svg className="h-6 w-6 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
          </svg>
          <svg className="h-6 w-6 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
        </div>

        {/* Footer with decorative border */}
        <div className="mt-12 text-center">
          <div className="inline-block px-6 py-2 border-t-2 border-b-2 border-amber-200 border-opacity-30">
            <p className="text-sm text-gray-500">
              Discover the world with Voyageur © {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}