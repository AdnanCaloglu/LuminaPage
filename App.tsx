import React, { useState } from 'react';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import ReaderApp from './pages/ReaderApp';
import PartnerDashboard from './pages/PartnerDashboard';
import { AppView } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.LANDING);

  const renderView = () => {
    switch (currentView) {
      case AppView.LANDING:
        return <LandingPage onGetStarted={() => setCurrentView(AppView.READER)} />;
      case AppView.READER:
        return <ReaderApp />;
      case AppView.PARTNER:
        return <PartnerDashboard />;
      default:
        return <LandingPage onGetStarted={() => setCurrentView(AppView.READER)} />;
    }
  };

  return (
    <div className="bg-slate-950 min-h-screen text-slate-100 font-sans">
      <Navbar currentView={currentView} setView={setCurrentView} />
      <main>
        {renderView()}
      </main>
    </div>
  );
};

export default App;