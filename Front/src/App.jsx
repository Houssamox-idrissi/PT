import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginVoyageurePage from './components/pages/VoyageureAuth/LoginPage.jsx';
import RegisterVoyageurePage from './components/pages/VoyageureAuth/RegisterVoyageurePage.jsx';
import LoginAdminPage from './components/pages/AdminAuth/LoginAdminPage.jsx';
import PropertyRegistrationPage from './components/pages/ProprietaireAuth/PropertyRegistrationPage.jsx';
import HostRegistrationForm from './components/pages/HostAuth/HostRegistrationPage.jsx';
import HostLoginPage from './components/pages/HostAuth/HostLoginPage.jsx';
import DashboardPage from './components/pages/DashboardPage.jsx'; 

import MainLayout from './layouts/MainLayout.jsx';
import HomePage from './components/pages/HomePage';
import PropertyDetails from './components/pages/PropertyDetails';


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


          <Route index element={<HomePage />} />
          <Route path="properties/:id" element={<PropertyDetails />} />        
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </Router>
  );
}