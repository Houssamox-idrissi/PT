import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginVoyageurePage from './components/pages/LoginPage';
import RegisterVoyageurePage from './components/pages/RegisterVoyageurePage';
import DashboardPage from './components/pages/DashboardPage.jsx'; // Example protected route

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginVoyageurePage />} />
   
        <Route path="/loginVoyageure" element={<LoginVoyageurePage />} />
        <Route path="/RegisterVoyageur" element={<RegisterVoyageurePage />} />
        
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </Router>
  );
}