import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MapSection from './components/MapSection';
import StorySection from './components/StorySection';
import ChartSection from './components/ChartSection';
import WaterBurdenCalculator from './components/WaterBurdenCalculator';
import TheoreticalFramework from './components/TheoreticalFramework';
import PolicyRecommendations from './components/PolicyRecommendations';
import Footer from './components/Footer';

function App() {
  return (
    <LanguageProvider>
      <div className="w-full bg-[#030712] min-h-screen text-slate-100 selection:bg-cyan-500/30 selection:text-white">
        <Navbar />
        <main>
          <Hero />
          <MapSection />
          <StorySection />
          <ChartSection />
          <WaterBurdenCalculator />
          <TheoreticalFramework />
          <PolicyRecommendations />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}

export default App;
