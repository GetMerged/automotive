import { Sun, Moon, Car, Menu, X, Phone, LogIn, LogOut, Plus } from 'lucide-react';

interface HeaderProps {
  darkMode: boolean;
  showNewOnly: boolean;
  mobileMenuOpen: boolean;
  isAuthenticated: boolean;
  toggleDarkMode: () => void;
  setShowNewOnly: (show: boolean) => void;
  setMobileMenuOpen: (open: boolean) => void;
  setShowLoginModal: (show: boolean) => void;
  setShowAddVehicle: (show: boolean) => void;
  setShowContactInfo: (show: boolean) => void;
  logout: () => void;
}

const Header = ({
  darkMode,
  showNewOnly,
  mobileMenuOpen,
  isAuthenticated,
  toggleDarkMode,
  setShowNewOnly,
  setMobileMenuOpen,
  setShowLoginModal,
  setShowAddVehicle,
  setShowContactInfo,
  logout
}: HeaderProps) => {
  return (
    <header className={`fixed w-full ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg z-50`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <Car className="h-8 w-8" />
            <span className="font-bold text-xl">MotoHub</span>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={() => setShowNewOnly(!showNewOnly)}
              className={`px-4 py-2 rounded-lg ${showNewOnly ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
            >
              {showNewOnly ? 'Show All' : 'Show New Only'}
            </button>
            
            {!isAuthenticated ? (
              <button
                onClick={() => setShowLoginModal(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                <LogIn className="h-5 w-5" />
                <span>Admin Login</span>
              </button>
            ) : (
              <>
                <button
                  onClick={() => setShowAddVehicle(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  <Plus className="h-5 w-5" />
                  <span>Add Vehicle</span>
                </button>
                <button
                  onClick={logout}
                  className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </>
            )}
            
            <button
              onClick={() => setShowContactInfo(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              <Phone className="h-5 w-5" />
              <span>Contact Us</span>
            </button>
            <button 
              onClick={toggleDarkMode} 
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </div>

          <button 
            className="md:hidden" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className={`md:hidden ${darkMode ? 'bg-gray-800' : 'bg-white'} py-4`}>
          <div className="container mx-auto px-4 space-y-2">
            <button
              onClick={() => {
                setShowNewOnly(!showNewOnly);
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left py-2 px-4 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              {showNewOnly ? 'Show All' : 'Show New Only'}
            </button>
            
            {!isAuthenticated ? (
              <button
                onClick={() => {
                  setShowLoginModal(true);
                  setMobileMenuOpen(false);
                }}
                className="flex items-center space-x-2 w-full py-2 px-4 text-blue-500"
              >
                <LogIn className="h-5 w-5" />
                <span>Admin Login</span>
              </button>
            ) : (
              <>
                <button
                  onClick={() => {
                    setShowAddVehicle(true);
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center space-x-2 w-full py-2 px-4 text-blue-500"
                >
                  <Plus className="h-5 w-5" />
                  <span>Add Vehicle</span>
                </button>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center space-x-2 w-full py-2 px-4 text-red-500"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
