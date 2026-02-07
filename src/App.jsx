import Hero from './components/Hero';
import MapSection from './components/MapSection';
import StorySection from './components/StorySection';
import ChartSection from './components/ChartSection';
import Footer from './components/Footer';

function App() {
  return (
    <div className="w-full">
      <Hero />
      <MapSection />
      <StorySection />
      <ChartSection />
      <Footer />
    </div>
  );
}

export default App;
