import HeroSection from '../../components/Dashboard/HeroSection';
import PropertiesGrid from '../../components/Dashboard/PropertiesGrid';
import Testimonials from '../../components/Dashboard/Testimonials';
import Features from '../../components/Dashboard/Features';
import Footer from '../Dashboard/Footer';

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <PropertiesGrid />
      <Features />
      <Testimonials />
      <Footer/>
    </div>
  );
}