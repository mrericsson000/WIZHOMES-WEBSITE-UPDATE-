
import React from 'react';
import { Room, RoomStatus, Booking } from './types';

export const MOCK_ROOMS: Room[] = [
  {
    id: '1',
    name: 'Wiz Standaard Suite 1',
    price: 67,
    status: RoomStatus.AVAILABLE,
    amenities: ['1 Bedroom', 'Living Area', 'Dining Area', 'Open Kitchen', '2 Washrooms', 'Balcony', 'DSTV', 'High Speed Free Wifi', 'CCTV', 'Indoor Bar', 'Electricity', 'Security Guard'],
    imageUrl: '',
    gallery: [],
    rating: 4.9,
    location: '',
    description: 'Comfortable 1-bedroom apartment with a spacious living area, dining area, and open kitchen. Features 2 washrooms and a private balcony. The entire complex is equipped with DSTV, high-speed free WiFi, and CCTV surveillance throughout. Enjoy access to our exclusive indoor bar for guests. The property is fully fenced with electricity and guarded by security personnel 24/7.'
  },
  {
    id: '2',
    name: 'Wiz Standard Suite 2',
    price: 67,
    status: RoomStatus.BOOKED,
    amenities: ['1 Bedroom', 'Living Area', 'Dining Area', 'Open Kitchen', '2 Washrooms', 'Balcony', 'DSTV', 'High Speed Free Wifi', 'CCTV', 'Indoor Bar', 'Electricity', 'Security Guard'],
    imageUrl: '',
    gallery: [],
    rating: 4.7,
    location: '',
    description: 'Comfortable 1-bedroom apartment with a spacious living area, dining area, and open kitchen. Features 2 washrooms and a private balcony. The entire complex is equipped with DSTV, high-speed free WiFi, and CCTV surveillance throughout. Enjoy access to our exclusive indoor bar for guests. The property is fully fenced with electricity and guarded by security personnel 24/7.'
  },
  {
    id: '3',
    name: 'Wiz Executive Suite 1',
    price: 100,
    status: RoomStatus.AVAILABLE,
    amenities: ['1 Bedroom', 'Living Area', 'Dining Area', 'Open Kitchen', '2 Washrooms', 'Balcony', 'DSTV', 'High Speed Free Wifi', 'CCTV', 'Indoor Bar', 'Electricity', 'Security Guard'],
    imageUrl: '',
    gallery: [],
    rating: 4.8,
    location: '',
    description: 'Comfortable 1-bedroom apartment with a spacious living area, dining area, and open kitchen. Features 2 washrooms and a private balcony. The entire complex is equipped with DSTV, high-speed free WiFi, and CCTV surveillance throughout. Enjoy access to our exclusive indoor bar for guests. The property is fully fenced with electricity and guarded by security personnel 24/7.'
  },
  {
    id: '4',
    name: 'Wiz Executive 2',
    price: 100,
    status: RoomStatus.AVAILABLE,
    amenities: ['1 Bedroom', 'Living Area', 'Dining Area', 'Open Kitchen', '2 Washrooms', 'Balcony', 'DSTV', 'High Speed Free Wifi', 'CCTV', 'Indoor Bar', 'Electricity', 'Security Guard'],
    imageUrl: '',
    gallery: [],
    rating: 4.6,
    location: '',
    description: 'Comfortable 1-bedroom apartment with a spacious living area, dining area, and open kitchen. Features 2 washrooms and a private balcony. The entire complex is equipped with DSTV, high-speed free WiFi, and CCTV surveillance throughout. Enjoy access to our exclusive indoor bar for guests. The property is fully fenced with electricity and guarded by security personnel 24/7.'
  },
  {
    id: '5',
    name: 'Wiz Presidential 1',
    price: 133,
    status: RoomStatus.NOT_AVAILABLE,
    amenities: ['1 Bedroom', 'Living Area', 'Dining Area', 'Open Kitchen', '2 Washrooms', 'Balcony', 'DSTV', 'High Speed Free Wifi', 'CCTV', 'Indoor Bar', 'Electricity', 'Security Guard'],
    imageUrl: '',
    gallery: [],
    rating: 5.0,
    location: '',
    description: 'Comfortable 1-bedroom apartment with a spacious living area, dining area, and open kitchen. Features 2 washrooms and a private balcony. The entire complex is equipped with DSTV, high-speed free WiFi, and CCTV surveillance throughout. Enjoy access to our exclusive indoor bar for guests. The property is fully fenced with electricity and guarded by security personnel 24/7.'
  },
  {
    id: '6',
    name: 'Wiz Presidentail Suite 2',
    price: 133,
    status: RoomStatus.AVAILABLE,
    amenities: ['1 Bedroom', 'Living Area', 'Dining Area', 'Open Kitchen', '2 Washrooms', 'Balcony', 'DSTV', 'High Speed Free Wifi', 'CCTV', 'Indoor Bar', 'Electricity', 'Security Guard'],
    imageUrl: '',
    gallery: [],
    rating: 4.5,
    location: '',
    description: 'Comfortable 1-bedroom apartment with a spacious living area, dining area, and open kitchen. Features 2 washrooms and a private balcony. The entire complex is equipped with DSTV, high-speed free WiFi, and CCTV surveillance throughout. Enjoy access to our exclusive indoor bar for guests. The property is fully fenced with electricity and guarded by security personnel 24/7.'
  }
];

export const getRooms = (): Room[] => {
  const saved = localStorage.getItem('wiz_rooms');
  if (saved) return JSON.parse(saved);
  return MOCK_ROOMS;
};

export const MOCK_BOOKINGS: Booking[] = [
  { id: 'B1', guestName: 'Alice Johnson', roomName: 'Wiz Standaard Suite 1', checkIn: '2023-12-01', checkOut: '2023-12-05', status: 'Confirmed', total: 1800 },
  { id: 'B2', guestName: 'Bob Smith', roomName: 'Wiz Standard Suite 2', checkIn: '2023-12-02', checkOut: '2023-12-04', status: 'Confirmed', total: 360 },
  { id: 'B3', guestName: 'Charlie Brown', roomName: 'Wiz Executive Suite 1', checkIn: '2023-12-10', checkOut: '2023-12-15', status: 'Pending', total: 1600 }
];

export const Logo: React.FC<{ className?: string; light?: boolean }> = ({ className = "h-12", light = false }) => (
  <div className={`flex flex-col items-center justify-center ${className}`}>
    <div className="relative flex items-end">
      {/* Roof Icon Container */}
      <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex items-end space-x-1 h-6">
        <div className={`w-3 h-1 ${light ? 'bg-white' : 'bg-zinc-950 dark:bg-white'} rotate-[-45deg] origin-bottom-right transform translate-x-1 translate-y-[-2px]`}></div>
        <div className={`w-3 h-1 ${light ? 'bg-white' : 'bg-zinc-950 dark:bg-white'} rotate-[-45deg] origin-bottom-right transform translate-x-1 translate-y-[-2px]`}></div>
        <div className="w-5 h-1.5 bg-red-600 rotate-[45deg] origin-bottom-left transform translate-y-[-4px]"></div>
      </div>
      
      {/* Main Text */}
      <div className="flex font-black tracking-tighter text-3xl leading-none">
        <span className={light ? 'text-white' : 'text-zinc-950 dark:text-white'}>WIZ</span>
        <span className="text-red-600 ml-1">HOMES</span>
      </div>
    </div>
    
    {/* Subtitle */}
    <div className="flex items-center space-x-2 w-full mt-1.5 overflow-hidden">
      <div className={`h-[1px] flex-grow ${light ? 'bg-white/30' : 'bg-zinc-300 dark:bg-zinc-700'}`}></div>
      <span className={`text-[8px] font-black uppercase tracking-[0.4em] ${light ? 'text-white/80' : 'text-zinc-500 dark:text-zinc-400'}`}>Exteriors</span>
      <div className={`h-[1px] flex-grow ${light ? 'bg-white/30' : 'bg-zinc-300 dark:bg-zinc-700'}`}></div>
    </div>
  </div>
);

export const Icons = {
  Home: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  Search: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>,
  Menu: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>,
  User: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  Star: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-600"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  Check: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  Plus: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>,
  Edit: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>,
  Trash: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>,
  View: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>,
  Dashboard: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>,
  Settings: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.72V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.17a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>,
  ArrowLeft: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>,
  LogOut: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>,
};
