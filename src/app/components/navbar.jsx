import { Moon, Sun, Shield } from 'lucide-react';
import { useTheme } from './theme-provider';
import { Button } from './ui/button';

export function Navbar({ onNavigate, currentView }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-background/80 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onNavigate('landing')}>
            <Shield className="w-8 h-8 text-[#06b6d4]" />
            <div>
              <h1 className="text-xl font-bold text-[#06b6d4]">VaxVault</h1>
              <p className="text-xs text-muted-foreground">Secure. Smart. Simplified.</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {currentView !== 'landing' && (
              <div className="hidden md:flex space-x-2">
                <Button 
                  variant={currentView === 'dashboard' ? 'default' : 'ghost'}
                  onClick={() => onNavigate('dashboard')}
                  className={currentView === 'dashboard' ? 'bg-[#06b6d4] hover:bg-[#0891b2]' : ''}
                >
                  Dashboard
                </Button>
                <Button 
                  variant={currentView === 'glossary' ? 'default' : 'ghost'}
                  onClick={() => onNavigate('glossary')}
                  className={currentView === 'glossary' ? 'bg-[#06b6d4] hover:bg-[#0891b2]' : ''}
                >
                  Glossary
                </Button>
                <Button 
                  variant={currentView === 'qr' ? 'default' : 'ghost'}
                  onClick={() => onNavigate('qr')}
                  className={currentView === 'qr' ? 'bg-[#06b6d4] hover:bg-[#0891b2]' : ''}
                >
                  QR Verify
                </Button>
              </div>
            )}
            
            <Button
              variant="outline"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5 text-[#06b6d4]" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
