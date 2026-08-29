
import React, { useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getRooms, Icons } from '../constants';

const RoomDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const room = useMemo(() => {
    const rooms = getRooms();
    return rooms.find(r => r.id === id);
  }, [id]);

  // UI State
  const [isSaved, setIsSaved] = useState(false);
  const [descExpanded, setDescExpanded] = useState(false);
  const [amenitiesExpanded, setAmenitiesExpanded] = useState(false);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'info' } | null>(null);

  // Form State
  const [checkIn, setCheckIn] = useState('2024-12-01');
  const [checkOut, setCheckOut] = useState('2024-12-05');
  const [guests, setGuests] = useState(1);

  if (!room) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-32 text-center">
        <h2 className="text-2xl font-bold mb-4">Room not found</h2>
        <Link to="/rooms" className="text-red-600 font-bold hover:underline">Back to rooms</Link>
      </div>
    );
  }

  const showNotification = (message: string, type: 'success' | 'info' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    showNotification('Link copied to clipboard!', 'info');
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
    showNotification(isSaved ? 'Removed from wishlist' : 'Saved to wishlist');
  };

  const images = room.gallery || [room.imageUrl];

  // Calculate nights and prices
  const nights = useMemo(() => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
  }, [checkIn, checkOut]);

  const serviceFee = 120;
  const cleaningFee = 45;
  const subtotal = room.price * nights;
  const total = subtotal + serviceFee + cleaningFee;

  const handleInquireViaWhatsApp = () => {
    const whatsappNumber = '233552795947'; // WhatsApp number: 0552795947
    const message = `Hello! I'm interested in booking "${room.name}" for the following dates:\n\nCheck-in: ${checkIn}\nCheck-out: ${checkOut}\nNumber of Guests: ${guests}\n\nPlease let me know if this apartment is available. Thank you!`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappURL, '_blank');
    showNotification('Opening WhatsApp to confirm availability...', 'info');
  };

  return (
    <div className="animate-in fade-in duration-700">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] w-full max-w-sm px-4 animate-in slide-in-from-top-10">
          <div className={`${notification.type === 'success' ? 'bg-zinc-950 dark:bg-white dark:text-zinc-950 text-white' : 'bg-red-600 text-white'} p-4 rounded-2xl shadow-2xl flex items-center justify-between font-bold`}>
            <span>{notification.message}</span>
            <button onClick={() => setNotification(null)} className="ml-4 opacity-50">✕</button>
          </div>
        </div>
      )}

      {/* Detail Header / Gallery */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <button 
            onClick={() => navigate(-1)} 
            className="flex items-center space-x-2 text-sm font-bold text-zinc-600 dark:text-zinc-400 hover:text-red-600 transition-colors"
          >
            <Icons.ArrowLeft />
            <span>Back</span>
          </button>
          <div className="flex space-x-4">
            <button onClick={handleShare} className="flex items-center space-x-2 text-sm font-bold hover:bg-zinc-100 dark:hover:bg-zinc-800 px-3 py-2 rounded-xl transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" x2="12" y1="2" y2="15"/></svg>
              <span>Share</span>
            </button>
            <button onClick={handleSave} className={`flex items-center space-x-2 text-sm font-bold hover:bg-zinc-100 dark:hover:bg-zinc-800 px-3 py-2 rounded-xl transition-all ${isSaved ? 'text-red-600' : ''}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill={isSaved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
              <span>{isSaved ? 'Saved' : 'Save'}</span>
            </button>
          </div>
        </div>

        <h1 className="text-3xl font-black text-zinc-950 dark:text-white mb-6 tracking-tight">{room.name}</h1>

        {/* Gallery Grid */}
        {images.length > 0 && images[0] ? (
          <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-4 h-[300px] md:h-[500px] rounded-3xl overflow-hidden border border-zinc-100 dark:border-zinc-800">
            <div className="md:col-span-2 md:row-span-2 overflow-hidden">
              <img src={images[0]} alt="" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 cursor-pointer" />
            </div>
            <div className="hidden md:block overflow-hidden"><img src={images[1] || images[0]} alt="" className="w-full h-full object-cover hover:scale-105" /></div>
            <div className="hidden md:block overflow-hidden"><img src={images[2] || images[0]} alt="" className="w-full h-full object-cover hover:scale-105" /></div>
            <div className="hidden md:block overflow-hidden"><img src={images[3] || images[0]} alt="" className="w-full h-full object-cover hover:scale-105" /></div>
            <div className="hidden md:block overflow-hidden relative">
              <img src={images[4] || images[0]} alt="" className="w-full h-full object-cover hover:scale-105" />
              <button onClick={() => showNotification('Opening full gallery...', 'info')} className="absolute bottom-6 right-6 px-4 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl text-sm font-bold shadow-xl hover:scale-105 transition-all">
                Show all photos
              </button>
            </div>
          </div>
        ) : (
          <div className="w-full h-[300px] md:h-[500px] rounded-3xl overflow-hidden border border-zinc-100 dark:border-zinc-800 bg-gradient-to-br from-zinc-200 to-zinc-300 dark:from-zinc-800 dark:to-zinc-700 flex items-center justify-center">
            <div className="text-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-400 dark:text-zinc-500 mx-auto mb-4">
                <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
                <circle cx="8.5" cy="8.5" r="1.5"/>
                <path d="m21 15-5-5L5 21"/>
              </svg>
              <p className="text-zinc-600 dark:text-zinc-300 font-semibold">Room images will be uploaded soon</p>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-2">High-quality photos coming shortly</p>
            </div>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 space-y-12">
            <div className="flex justify-between items-start pb-8 border-b border-zinc-100 dark:border-zinc-800">
              <div>
                <h2 className="text-2xl font-bold dark:text-white">Luxury apartment hosted by WIZ</h2>
                <p className="text-zinc-500 dark:text-zinc-400 mt-2">{room.location} • 4 guests • 2 bedrooms • 2 beds • 1 bath</p>
              </div>
              <div className="w-14 h-14 bg-zinc-950 dark:bg-zinc-800 rounded-full flex items-center justify-center text-red-600 font-black text-xl border dark:border-zinc-700 shadow-xl">W</div>
            </div>

            <div className="pb-12 border-b border-zinc-100 dark:border-zinc-800">
              <p className={`text-zinc-700 dark:text-zinc-300 leading-relaxed text-lg italic mb-6 ${descExpanded ? '' : 'line-clamp-2'}`}>
                "{room.description}"
              </p>
              <button onClick={() => setDescExpanded(!descExpanded)} className="text-zinc-950 dark:text-white font-bold underline hover:text-red-600">
                {descExpanded ? 'Show less' : 'Show more'}
              </button>
            </div>

            <div>
              <h3 className="text-xl font-bold dark:text-white mb-8">What this place offers</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6">
                {(amenitiesExpanded ? room.amenities : room.amenities.slice(0, 4)).map(amenity => (
                  <div key={amenity} className="flex items-center space-x-4 text-zinc-600 dark:text-zinc-400">
                    <Icons.Check />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
              <button onClick={() => setAmenitiesExpanded(!amenitiesExpanded)} className="mt-10 px-8 py-3 border border-zinc-950 dark:border-white dark:text-white font-bold rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors">
                {amenitiesExpanded ? 'Show less' : 'Show all amenities'}
              </button>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-28 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 shadow-2xl transition-colors">
              <div className="flex justify-between items-end mb-8">
                <div><span className="text-2xl font-black dark:text-white">${room.price}</span><span className="text-zinc-500 text-sm ml-1">night</span></div>
                <div className="flex items-center space-x-1 text-sm font-bold dark:text-zinc-300"><Icons.Star /><span>{room.rating}</span></div>
              </div>

              <div className="border border-zinc-200 dark:border-zinc-700 rounded-xl overflow-hidden mb-6">
                <div className="grid grid-cols-2 border-b border-zinc-200 dark:border-zinc-700">
                  <div className="p-3"><label className="text-[10px] font-black uppercase text-zinc-900 dark:text-zinc-100 block">Check-in</label><input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} className="text-sm bg-transparent border-none p-0 focus:ring-0 dark:text-zinc-400 w-full" /></div>
                  <div className="p-3"><label className="text-[10px] font-black uppercase text-zinc-900 dark:text-zinc-100 block">Check-out</label><input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} className="text-sm bg-transparent border-none p-0 focus:ring-0 dark:text-zinc-400 w-full" /></div>
                </div>
                <div className="p-3"><label className="text-[10px] font-black uppercase text-zinc-900 dark:text-zinc-100 block">Guests</label><select value={guests} onChange={(e) => setGuests(Number(e.target.value))} className="text-sm bg-transparent border-none p-0 focus:ring-0 dark:text-zinc-400 w-full"><option value={1} className="dark:bg-zinc-900">1 guest</option><option value={2} className="dark:bg-zinc-900">2 guests</option></select></div>
              </div>

              <button onClick={handleInquireViaWhatsApp} className="w-full py-4 bg-green-600 hover:bg-green-700 text-white font-black rounded-xl transition-all shadow-xl shadow-green-600/30 flex items-center justify-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.447-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004c-1.628 0-3.184.613-4.346 1.724-1.162 1.11-1.802 2.585-1.802 4.149 0 1.644.526 3.231 1.523 4.663l.043.055 1.698 3.157 3.122-1.008.157.05c1.209.378 2.499.585 3.813.585 4.316 0 7.835-3.456 7.835-7.7 0-2.057-.822-3.992-2.313-5.451-1.491-1.46-3.469-2.265-5.565-2.265"/></svg>
                <span>Inquire</span>
              </button>

              <div className="space-y-4 text-zinc-600 dark:text-zinc-400 mt-6">
                <div className="flex justify-between"><span className="underline">${room.price} x {nights} nights</span><span>${subtotal}</span></div>
                <div className="flex justify-between font-black text-zinc-950 dark:text-white text-lg"><span>Total</span><span>${total}</span></div>
              </div>

              <div className="mt-8 pt-8 border-t border-zinc-200 dark:border-zinc-700">
                <h4 className="text-sm font-black uppercase text-zinc-900 dark:text-zinc-100 mb-4">Special Packages & Discounts</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg">
                    <span className="text-sm text-zinc-700 dark:text-zinc-300">3 Days</span>
                    <span className="text-sm font-bold text-green-600">5% off</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg">
                    <span className="text-sm text-zinc-700 dark:text-zinc-300">7 Days</span>
                    <span className="text-sm font-bold text-green-600">10% off</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg">
                    <span className="text-sm text-zinc-700 dark:text-zinc-300">Monthly</span>
                    <span className="text-sm font-bold text-green-600">15% off</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg">
                    <span className="text-sm text-zinc-700 dark:text-zinc-300">Yearly</span>
                    <span className="text-sm font-bold text-green-600">30% off</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetail;
