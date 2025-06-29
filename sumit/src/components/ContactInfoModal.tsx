import { X, Phone, Mail, MapPin } from 'lucide-react';
import { Vehicle } from '../types/Vehicle';

interface ContactInfoModalProps {
  darkMode: boolean;
  showContactInfo: boolean;
  setShowContactInfo: (show: boolean) => void;
}

const ContactInfoModal = ({ darkMode, showContactInfo, setShowContactInfo }: ContactInfoModalProps) => {
  if (!showContactInfo) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div 
        className={`${
          darkMode 
            ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border border-gray-700' 
            : 'bg-gradient-to-br from-white via-blue-50 to-purple-50 border border-gray-200'
        } rounded-2xl max-w-lg w-full shadow-2xl transform animate-slideUp`}
      >
        {/* Header with gradient */}
        <div className={`${
          darkMode 
            ? 'bg-gradient-to-r from-blue-600 to-purple-600' 
            : 'bg-gradient-to-r from-blue-500 to-purple-600'
        } p-6 rounded-t-2xl flex justify-between items-center`}>
          <h3 className="text-2xl font-bold text-white">Contact Information</h3>
          <button
            onClick={() => setShowContactInfo(false)}
            className="text-white hover:text-gray-200 transition-colors duration-200 hover:rotate-90 transform"
            aria-label="Close modal"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-8">
          <div className="space-y-6">
            {/* Phone with animated icon */}
            <div className="flex items-center space-x-4 group hover:scale-105 transform transition-all duration-300">
              <div className="bg-gradient-to-r from-green-400 to-green-600 p-3 rounded-full shadow-lg">
                <Phone className="h-6 w-6 text-white animate-bounce" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                <span className="text-lg font-semibold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
                  +91 8545077100
                </span>
              </div>
            </div>

            {/* Email with hover effect */}
            <div className="flex items-center space-x-4 group hover:scale-105 transform transition-all duration-300">
              <div className="bg-gradient-to-r from-red-400 to-pink-600 p-3 rounded-full shadow-lg">
                <Mail className="h-6 w-6 text-white group-hover:animate-pulse" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                <span className="text-lg font-semibold bg-gradient-to-r from-red-600 to-pink-800 bg-clip-text text-transparent">
                  singhcarbazaar5100@gmail.com
                </span>
              </div>
            </div>

            {/* Location with subtle animation */}
            <div className="flex items-center space-x-4 group hover:scale-105 transform transition-all duration-300">
              <div className="bg-gradient-to-r from-orange-400 to-red-600 p-3 rounded-full shadow-lg">
                <MapPin className="h-6 w-6 text-white group-hover:animate-ping" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Address</p>
                <span className="text-sm font-medium bg-gradient-to-r from-orange-600 to-red-800 bg-clip-text text-transparent">
                  Danupur, Chandmari, near Ring-Road,<br />
                  Harahua, Varanasi-22100
                </span>
              </div>
            </div>
          </div>

          {/* Enhanced info section */}
          <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-xl border border-blue-200 dark:border-gray-600">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-green-600 dark:text-green-400">Available Now</span>
            </div>
            <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
              Our team is available <span className="font-semibold text-blue-600 dark:text-blue-400">Monday through Saturday</span>, 
              <span className="font-semibold text-purple-600 dark:text-purple-400"> 9 AM to 6 PM</span>. 
              Feel free to reach out with any questions about our vehicles.
            </p>
          </div>

          {/* Call to action button */}
          <div className="mt-6 text-center">
            
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(30px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-slideUp {
          animation: slideUp 0.4s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ContactInfoModal;