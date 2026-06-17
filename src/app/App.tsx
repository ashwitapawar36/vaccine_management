import { useState } from 'react';
import { ThemeProvider } from './components/theme-provider';
import { Navbar } from './components/navbar';
import { LandingPage } from './components/landing-page';
import { ChildRegistration } from './components/child-registration';
import { Dashboard } from './components/dashboard';
import { VaccineGlossary } from './components/vaccine-glossary';
import { QRVerification } from './components/qr-verification';
import { Toaster } from './components/ui/sonner';

export default function App() {
  const [currentView, setCurrentView] = useState('landing');
  const [childData, setChildData] = useState(null);

  const handleRegister = (data) => {
    setChildData(data);
  };

  const handleNavigate = (view) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground">
        <Navbar onNavigate={handleNavigate} currentView={currentView} />
        
        {currentView === 'landing' && (
          <LandingPage onNavigate={handleNavigate} />
        )}
        
        {currentView === 'register' && (
          <ChildRegistration 
            onRegister={handleRegister} 
            onNavigate={handleNavigate}
          />
        )}
        
        {currentView === 'dashboard' && (
          <Dashboard 
            childData={childData} 
            onNavigate={handleNavigate}
          />
        )}
        
        {currentView === 'glossary' && (
          <VaccineGlossary />
        )}
        
        {currentView === 'qr' && (
          <QRVerification childData={childData} />
        )}
        
        <Toaster />
      </div>
    </ThemeProvider>
  );
}
