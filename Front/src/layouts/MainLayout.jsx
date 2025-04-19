import { Outlet } from 'react-router-dom';
import Navbar from '../components/Dashboard/Navbar';
import Footer from '../components/Dashboard/Footer';

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}