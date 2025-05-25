import { Vehicle } from '../types/Vehicle';
import { X } from 'lucide-react';

interface BookingModalProps {
  darkMode: boolean;
  selectedVehicle: Vehicle;
  showBooking: boolean;
  bookingDate: string;
  bookingTime: string;
  bookingName: string;
  bookingEmail: string;
  bookingPhone: string;
  setSelectedVehicle: (vehicle: Vehicle | null) => void;
  setShowBooking: (show: boolean) => void;
  setBookingDate: (date: string) => void;
  setBookingTime: (time: string) => void;
  setBookingName: (name: string) => void;
  setBookingEmail: (email: string) => void;
  setBookingPhone: (phone: string) => void;
  handleBooking: (e: React.FormEvent) => void;
}

const BookingModal = ({
  darkMode,
  selectedVehicle,
  showBooking,
  bookingDate,
  bookingTime,
  bookingName,
  bookingEmail,
  bookingPhone,
  setSelectedVehicle,
  setShowBooking,
  setBookingDate,
  setBookingTime,
  setBookingName,
  setBookingEmail,
  setBookingPhone,
  handleBooking
}: BookingModalProps) => {
  if (!selectedVehicle || !showBooking) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto`}>
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h3 className="text-xl font-semibold">{selectedVehicle.name} - Schedule Viewing</h3>
          <button 
            onClick={() => {setSelectedVehicle(null); setShowBooking(false)}}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            aria-label="Close modal"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <div className="p-6">
          <form onSubmit={handleBooking} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="date" className="block text-sm font-medium mb-1">Date</label>
                <input
                  id="date"
                  type="date"
                  required
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
              <div>
                <label htmlFor="time" className="block text-sm font-medium mb-1">Time</label>
                <input
                  id="time"
                  type="time"
                  required
                  value={bookingTime}
                  onChange={(e) => setBookingTime(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label htmlFor="name" className="block text-sm font-medium mb-1">Your Name</label>
                <input
                  id="name"
                  type="text"
                  required
                  value={bookingName}
                  onChange={(e) => setBookingName(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                <input
                  id="email"
                  type="email"
                  required
                  value={bookingEmail}
                  onChange={(e) => setBookingEmail(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-1">Phone</label>
                <input
                  id="phone"
                  type="tel"
                  required
                  value={bookingPhone}
                  onChange={(e) => setBookingPhone(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg mt-6"
            >
              Schedule Viewing
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
