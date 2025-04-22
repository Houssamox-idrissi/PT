import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginVoyageurePage from './pages/VoyageureAuth/LoginPage.jsx';
import RegisterVoyageurePage from './pages/VoyageureAuth/RegisterVoyageurePage.jsx';
import LoginAdminPage from './pages/AdminAuth/LoginAdminPage.jsx';
import PropertyRegistrationPage from './pages/ProprietaireAuth/PropertyRegistrationPage.jsx';
import HostRegistrationForm from './pages/HostAuth/HostRegistrationPage.jsx';
import HostLoginPage from './pages/HostAuth/HostPageLogin.jsx';

import MainLayout from './layouts/MainLayout.jsx';
import HomePage from './pages/HomePage/HomePage';
import BecomeHost from './pages/BecomeHost.jsx';


export default function App() {
  return (
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
        <Route index element={<HomePage />} />
      </Routes>
    </Router>
  );
}