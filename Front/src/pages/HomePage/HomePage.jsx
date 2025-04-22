import { useState } from 'react';
import PropertiesGrid from '../../components/Dashboard/PropertiesGrid';
import Features from '../../components/Dashboard/Features';
import Footer from '../../components/Dashboard/Footer';
import Navbar from '../../components/Dashboard/Navbar';

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