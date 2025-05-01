import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PropertyProvider } from './context/PropertyContext';
import LoginVoyageurePage from './pages/VoyageureAuth/LoginPage.jsx';
import RegisterVoyageurePage from './pages/VoyageureAuth/RegisterVoyageurePage.jsx';
import LoginAdminPage from './pages/AdminAuth/LoginAdminPage.jsx';
import PropertyRegistrationPage from './pages/ProprietaireAuth/PropertyRegistrationPage.jsx';
import HostRegistrationForm from './pages/HostAuth/HostRegistrationPage.jsx';
import HostLoginPage from './pages/HostAuth/HostPageLogin.jsx';

import MainLayout from './layouts/MainLayout.jsx';
import HomePage from './pages/HomePage/HomePage';
import BecomeHost from './pages/HostPages/BecomeHost.jsx';
import AboutPlace from './pages/HostPages/AboutPlace.jsx';
import PropertyType from './pages/HostPages/PropertyType.jsx';
import PropertyDetails from './pages/HostPages/PropertyDetails.jsx';
import Step2Page from './pages/HostPages/Etape2.jsx';
import PropertyAmenities from './pages/HostPages/PropertyAmenities.jsx';
import PropertyPhotos from './pages/HostPages/PropertyPhotos.jsx';
import PropertyTitle from './pages/HostPages/PropertyTitle.jsx';
import PropertyDescription from './pages/HostPages/PropertyDescription.jsx';
import PropertyPublish from './pages/HostPages/Etape3.jsx';
import PropertyPrice from './pages/HostPages/PropertyPrice.jsx';
import PropertyLocation from './pages/HostPages/PropertyLocation.jsx';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />} />
        <Route path="/loginAdmin" element={<LoginAdminPage />} />
        <Route path="/loginVoyageure" element={<LoginVoyageurePage />} />
        <Route path="/RegisterVoyageur" element={<RegisterVoyageurePage />} />
        <Route path="/HostRegistration" element={<HostRegistrationForm />} />
        <Route path="/HostLogin" element={<HostLoginPage />} />
        <Route path="/BecomeHost" element={<BecomeHost />} />

        <Route path="/AddingProperty" element={<PropertyProvider><PropertyRegistrationPage /></PropertyProvider>} />
        <Route path="/About-your-place" element={<PropertyProvider><AboutPlace /></PropertyProvider>} />
        <Route path="/Structure" element={<PropertyProvider><PropertyType /></PropertyProvider>} />
        <Route path="/PropertyDetails" element={<PropertyProvider><PropertyDetails /></PropertyProvider>} />
        <Route path="/Step-2" element={<PropertyProvider><Step2Page /></PropertyProvider>} />
        <Route path="/equipement" element={<PropertyProvider><PropertyAmenities /></PropertyProvider>} />
        <Route path="/Property-Photos" element={<PropertyProvider><PropertyPhotos /></PropertyProvider>} />
        <Route path="/Property-Title" element={<PropertyProvider><PropertyTitle /></PropertyProvider>} />
        <Route path="/Property-Description" element={<PropertyProvider><PropertyDescription /></PropertyProvider>} />
        <Route path="/Property-Publish" element={<PropertyProvider><PropertyPublish /></PropertyProvider>} />
        <Route path="/Property-Price" element={<PropertyProvider><PropertyPrice /></PropertyProvider>} />
        <Route path="/Property-Location" element={<PropertyProvider><PropertyLocation /></PropertyProvider>} />

        <Route index element={<HomePage />} />
      </Routes>
    </Router>
  );
}
