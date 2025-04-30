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
    <PropertyProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />} />
          <Route path="/loginAdmin" element={<LoginAdminPage />} />

          <Route path="/loginVoyageure" element={<LoginVoyageurePage />} />
          <Route path="/RegisterVoyageur" element={<RegisterVoyageurePage />} />
          <Route path="/AddingProperty" element={<PropertyRegistrationPage />} />
          <Route path="/HostRegistration" element={<HostRegistrationForm />} />
          <Route path="/HostLogin" element={<HostLoginPage />} />
          <Route path="/BecomeHost" element={<BecomeHost />} />
          <Route path="/About-your-place" element={<AboutPlace />} />
          <Route path="/Structure" element={<PropertyType />} />
          <Route path="/PropertyDetails" element={<PropertyDetails />} />
          <Route path="/Step-2" element={<Step2Page/>} />
          <Route path="/equipement" element={<PropertyAmenities/>} />
          <Route path="/Property-Photos" element={<PropertyPhotos/>} />
          <Route path="/Property-Title" element={<PropertyTitle/>} />
          <Route path="/Property-Description" element={<PropertyDescription/>} />
          <Route path="/Property-Publish" element={<PropertyPublish/>} />
          <Route path="/Property-Price" element={<PropertyPrice/>} />
          <Route path="/Property-Location" element={<PropertyLocation/>} />
          <Route index element={<HomePage />} />
        </Routes>
      </Router>
    </PropertyProvider>
  );
}