import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginVoyageurePage from './components/pages/VoyageureAuth/LoginPage.jsx';
import RegisterVoyageurePage from './components/pages/VoyageureAuth/RegisterVoyageurePage.jsx';
import LoginAdminPage from './components/pages/AdminAuth/LoginAdminPage.jsx';
import DashboardPage from './components/pages/DashboardPage.jsx'; 

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginVoyageurePage />} />
        <Route path="/loginAdmin" element={<LoginAdminPage />} />
   
        <Route path="/loginVoyageure" element={<LoginVoyageurePage />} />
        <Route path="/RegisterVoyageur" element={<RegisterVoyageurePage />} />
        
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </Router>
  );
}