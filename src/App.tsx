import { useState, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Services } from './pages/Services';
import { Footer } from './components/Footer';
import './App.css';

function App() {
  const [activeView, setActiveView] = useState<'home' | 'services'>('home');
  const estimatorRef = useRef<HTMLDivElement | null>(null);

  const handleScrollToEstimator = () => {
    if (estimatorRef.current) {
      estimatorRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleNavigateHome = () => {
    setActiveView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-bw-red text-bw-white selection:bg-white selection:text-bw-red overflow-x-hidden flex flex-col justify-between">
      
      <Navbar
        activeView={activeView}
        setActiveView={setActiveView}
        onScrollToEstimator={handleScrollToEstimator}
      />

      <main className="flex-grow">
        {activeView === 'home' ? (
          <Home setActiveView={setActiveView} />
        ) : (
          <Services estimatorRef={estimatorRef} />
        )}
      </main>

      <Footer onNavigateHome={handleNavigateHome} />
      
    </div>
  );
}

export default App;
