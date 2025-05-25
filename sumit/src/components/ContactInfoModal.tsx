import { Vehicle } from '../types/Vehicle';

interface ContactInfoModalProps {
  darkMode: boolean;
  showContactInfo: boolean;
  setShowContactInfo: (show: boolean) => void;
}

const ContactInfoModal = ({ darkMode, showContactInfo, setShowContactInfo }: ContactInfoModalProps) => {
  if (!showContactInfo) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg max-w-lg w-full`}>
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h3 className="text-xl font-semibold">Contact Information</h3>
          <button 
            onClick={() => setShowContactInfo(false)}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            aria-label="Close modal"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-gray-500" />
              <span>+1 (800) 123-4567</span>
            </div>
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-gray-500" />
              <span>contact@automotive.com</span>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="h-5 w-5 text-gray-500" />
              <span>123 Auto Drive, Car City, CC 12345</span>
            </div>
          </div>
          <div className="mt-6">
            <p className="text-gray-600 dark:text-gray-400">
              Our team is available Monday through Saturday, 9 AM to 6 PM.
              Feel free to reach out with any questions about our vehicles.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfoModal;

import { X, Phone, Mail, MapPin } from 'lucide-react';
