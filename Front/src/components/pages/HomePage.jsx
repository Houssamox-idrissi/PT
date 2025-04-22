import { useState } from 'react';
import HeroSection from '../../components/Dashboard/HeroSection';
import PropertiesGrid from '../../components/Dashboard/PropertiesGrid';
import Testimonials from '../../components/Dashboard/Testimonials';
import Features from '../../components/Dashboard/Features';
import Footer from '../Dashboard/Footer';
import Navbar from '../Dashboard/Navbar';

export default function HomePage() {
  const [searchParams, setSearchParams] = useState(null);

  const handleSearch = (params) => {
    setSearchParams(params);
  };

  return (
    <div>
      <Navbar onSearch={handleSearch} />
      <PropertiesGrid searchParams={searchParams} />
      <Features />
      <Footer />
    </div>
  );
}