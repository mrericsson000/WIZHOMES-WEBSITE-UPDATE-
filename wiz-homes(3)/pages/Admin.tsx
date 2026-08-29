
import React, { useState, useEffect } from 'react';
import { Icons, getRooms, MOCK_BOOKINGS, Logo } from '../constants';
import { RoomStatus, Room } from '../types';
import { Link, useNavigate } from 'react-router-dom';

interface AdminProps {
  theme: string;
  toggleTheme: () => void;
  onLogout: () => void;
}

const Admin: React.FC<AdminProps> = ({ theme, toggleTheme, onLogout }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'rooms' | 'bookings'>('dashboard');
  const [rooms, setRooms] = useState<Room[]>(getRooms());
  const [bookings, setBookings] = useState(MOCK_BOOKINGS);
  const [notification, setNotification] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<Room | null>(null);
  const [viewingRoom, setViewingRoom] = useState<Room | null>(null);
  const [statusToEdit, setStatusToEdit] = useState<Room | null>(null);
  const [newImageUrl, setNewImageUrl] = useState('');

  // Sync state to localStorage whenever rooms are updated
  useEffect(() => {
    localStorage.setItem('wiz_rooms', JSON.stringify(rooms));
  }, [rooms]);

  const notify = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const getStatusColor = (status: RoomStatus) => {
    switch (status) {
      case RoomStatus.AVAILABLE: return 'text-green-600 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800';
      case RoomStatus.BOOKED: return 'text-amber-600 bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800';
      case RoomStatus.NOT_AVAILABLE: return 'text-zinc-600 bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700';
      default: return 'text-zinc-600 bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700';
    }
  };

  const handleLogoutWithRedirect = () => {
    // Navigate home first to ensure we are on a public route before clearing auth
    navigate('/');
    onLogout();
  };

  const deleteRoom = (id: string) => {
    if (window.confirm('Are you sure you want to remove this room from inventory?')) {
      const updated = rooms.filter(r => r.id !== id);
      setRooms(updated);
      notify('Room deleted successfully');
    }
  };

  const deleteBooking = (id: string) => {
    if (window.confirm('Cancel this booking record?')) {
      setBookings(bookings.filter(b => b.id !== id));
      notify('Booking cancelled and removed');
    }
  };

  const handleUpdateRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isEditing) return;

    const exists = rooms.some(r => r.id === isEditing.id);
    let updatedRooms: Room[];
    
    if (exists) {
      updatedRooms = rooms.map(r => r.id === isEditing.id ? isEditing : r);
    } else {
      updatedRooms = [isEditing, ...rooms];
    }

    setRooms(updatedRooms);
    setIsEditing(null);
    notify('Inventory updated successfully');
  };

  const handleStatusChange = (newStatus: RoomStatus) => {
    if (!statusToEdit) return;
    const updated = rooms.map(r => r.id === statusToEdit.id ? { ...r, status: newStatus } : r);
    setRooms(updated);
    setStatusToEdit(null);
    notify(`Status updated to ${newStatus}`);
  };

  const addImageToGallery = () => {
    if (!isEditing || !newImageUrl.trim()) return;
    const gallery = isEditing.gallery || [];
    if (gallery.includes(newImageUrl.trim())) {
      notify('Image already in gallery');
      return;
    }
    setIsEditing({
      ...isEditing,
      gallery: [...gallery, newImageUrl.trim()]
    });
    setNewImageUrl('');
    notify('Image added to gallery');
  };

  const removeImageFromGallery = (index: number) => {
    if (!isEditing || !isEditing.gallery) return;
    const gallery = [...isEditing.gallery];
    gallery.splice(index, 1);
    setIsEditing({
      ...isEditing,
      gallery
    });
    notify('Image removed from gallery');
  };

  const addRecord = () => {
    if (activeTab === 'rooms') {
      const newId = `R${Date.now()}`;
      const newRoom: Room = { 
        id: newId, 
        name: 'New Luxury Unit',
        price: 100,
        status: RoomStatus.AVAILABLE,
        location: 'TBD',
        description: '',
        imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=800',
        gallery: [],
        amenities: ['Wifi'],
        rating: 5.0
      };
      setIsEditing(newRoom);
    } else {
      notify('Manual booking entry is not available in demo');
    }
  };

  const stats = [
    { label: 'Total Rooms', value: rooms.length, icon: <Icons.Home />, color: 'bg-red-600' },
    { label: 'Occupancy', value: `${rooms.length ? Math.round((rooms.filter(r => r.status === RoomStatus.BOOKED).length / rooms.length) * 100) : 0}%`, icon: <Icons.Check />, color: 'bg-zinc-950 dark:bg-zinc-900' },
    { label: 'Available', value: rooms.filter(r => r.status === RoomStatus.AVAILABLE).length, icon: <Icons.Star />, color: 'bg-green-600' },
    { label: 'Est. Revenue', value: '$12.8k', icon: <div className="text-white font-bold">$</div>, color: 'bg-red-700' },
  ];

  return (
    <div className="flex min-h-screen bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-8 right-8 z-[300] animate-in slide-in-from-right-10 duration-300">
          <div className="bg-zinc-900 text-white px-8 py-5 rounded-[2rem] shadow-2xl flex items-center space-x-4 border border-zinc-800">
            <div className="w-2.5 h-2.5 bg-red-600 rounded-full animate-pulse shadow-lg shadow-red-600/50"></div>
            <p className="font-black text-xs uppercase tracking-widest">{notification}</p>
          </div>
        </div>
      )}

      {/* View Details Modal (Read Only) */}
      {viewingRoom && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-500 overflow-y-auto">
          <div className="bg-white dark:bg-zinc-900 w-full max-w-5xl rounded-[3.5rem] shadow-2xl overflow-hidden border border-zinc-100 dark:border-zinc-800 animate-in zoom-in-95 duration-500 my-8">
            <div className="relative">
              {/* Premium Header Grid */}
              <div className="grid grid-cols-1 md:grid-cols-4 h-96 gap-1 bg-zinc-100 dark:bg-zinc-800 border-b border-zinc-100 dark:border-zinc-800">
                <div className="md:col-span-2 overflow-hidden h-full">
                  <img src={viewingRoom.imageUrl} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" alt="" />
                </div>
                <div className="hidden md:grid grid-cols-1 grid-rows-2 gap-1 h-full">
                  <div className="overflow-hidden"><img src={viewingRoom.gallery?.[0] || viewingRoom.imageUrl} className="w-full h-full object-cover" alt="" /></div>
                  <div className="overflow-hidden"><img src={viewingRoom.gallery?.[1] || viewingRoom.imageUrl} className="w-full h-full object-cover" alt="" /></div>
                </div>
                <div className="hidden md:grid grid-cols-1 grid-rows-2 gap-1 h-full">
                  <div className="overflow-hidden"><img src={viewingRoom.gallery?.[2] || viewingRoom.imageUrl} className="w-full h-full object-cover" alt="" /></div>
                  <div className="overflow-hidden relative bg-zinc-900">
                    <img src={viewingRoom.gallery?.[3] || viewingRoom.imageUrl} className="w-full h-full object-cover opacity-50" alt="" />
                    <div className="absolute inset-0 flex items-center justify-center text-white font-black text-xs uppercase tracking-widest">
                       +{Math.max(0, (viewingRoom.gallery?.length || 0) - 4)} Photos
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-10 md:p-16">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-10 mb-16 pb-12 border-b border-zinc-100 dark:border-zinc-800">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                       <span className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest border-2 shadow-sm ${getStatusColor(viewingRoom.status)}`}>{viewingRoom.status}</span>
                       <div className="flex items-center space-x-2 px-3 py-1.5 bg-zinc-50 dark:bg-zinc-800 rounded-xl text-xs font-black">
                         <Icons.Star />
                         <span className="dark:text-white">{viewingRoom.rating}</span>
                       </div>
                    </div>
                    <h2 className="text-5xl font-black text-zinc-950 dark:text-white uppercase tracking-tighter leading-none">{viewingRoom.name}</h2>
                    <p className="text-zinc-500 font-black uppercase tracking-[0.3em] text-[10px]">{viewingRoom.location}</p>
                  </div>
                  <div className="bg-red-600 text-white p-8 rounded-[2.5rem] shadow-2xl shadow-red-600/30 text-center min-w-[200px]">
                    <p className="text-4xl font-black tracking-tighter leading-none">${viewingRoom.price}</p>
                    <p className="text-white/60 font-black uppercase tracking-widest text-[9px] mt-2">Nightly Rate</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                   <div className="lg:col-span-2 space-y-12">
                      <div className="space-y-4">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">Marketing Narrative</h4>
                        <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed text-xl font-light italic border-l-4 border-red-600 pl-8">
                          "{viewingRoom.description}"
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                         <div className="bg-zinc-50 dark:bg-zinc-800/40 p-8 rounded-3xl border border-zinc-100 dark:border-zinc-800">
                            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-6">Internal Specs</h4>
                            <div className="space-y-4">
                               <div className="flex justify-between items-center"><span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Global ID</span><span className="font-black text-sm dark:text-white">{viewingRoom.id}</span></div>
                               <div className="flex justify-between items-center"><span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Asset Tier</span><span className="font-black text-sm text-red-600 uppercase">Premium</span></div>
                               <div className="flex justify-between items-center"><span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Max Occupancy</span><span className="font-black text-sm dark:text-white">4 Guests</span></div>
                            </div>
                         </div>
                         <div className="bg-zinc-50 dark:bg-zinc-800/40 p-8 rounded-3xl border border-zinc-100 dark:border-zinc-800">
                            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-6">Amenity Overview</h4>
                            <div className="flex flex-wrap gap-2">
                               {viewingRoom.amenities.map(a => (
                                 <span key={a} className="px-3 py-1.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg text-[9px] font-black uppercase tracking-tighter dark:text-zinc-300">{a}</span>
                               ))}
                            </div>
                         </div>
                      </div>
                   </div>

                   <div className="space-y-8">
                      <div className="bg-zinc-950 p-8 rounded-[2.5rem] border border-zinc-900 text-white">
                         <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 mb-6">Performance</h4>
                         <div className="space-y-6">
                            <div>
                               <div className="flex justify-between items-center mb-2"><span className="text-[10px] font-black uppercase">Occupancy Rate</span><span className="text-sm font-black">94%</span></div>
                               <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden"><div className="w-[94%] h-full bg-red-600"></div></div>
                            </div>
                            <div>
                               <div className="flex justify-between items-center mb-2"><span className="text-[10px] font-black uppercase">User Satisfaction</span><span className="text-sm font-black">4.9/5</span></div>
                               <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden"><div className="w-[98%] h-full bg-red-600"></div></div>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>

                <div className="mt-16 pt-10 border-t border-zinc-100 dark:border-zinc-800 flex justify-end">
                   <button 
                    onClick={() => setViewingRoom(null)}
                    className="px-12 py-5 bg-zinc-950 text-white font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-zinc-800 transition-all active:scale-95 shadow-2xl"
                   >
                     Exit Overview
                   </button>
                </div>
              </div>

              <button onClick={() => setViewingRoom(null)} className="absolute top-8 right-8 w-12 h-12 bg-black/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-red-600 hover:text-white transition-all text-white border border-white/20">✕</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Room Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-[130] flex items-center justify-center p-4 bg-black/70 backdrop-blur-2xl animate-in fade-in duration-500 overflow-y-auto">
          <div className="bg-white dark:bg-zinc-900 w-full max-w-4xl rounded-[3.5rem] shadow-2xl overflow-hidden border border-zinc-100 dark:border-zinc-800 animate-in slide-in-from-bottom-10 duration-500 my-8">
            <div className="relative">
              {/* Header Preview Banner */}
              <div className="h-56 w-full relative overflow-hidden bg-zinc-950">
                 <img src={isEditing.imageUrl} className="w-full h-full object-cover blur-md opacity-30" alt="" />
                 <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-zinc-900 to-transparent"></div>
                 <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <h2 className="text-4xl font-black text-zinc-950 dark:text-white uppercase tracking-tighter">Inventory Edit</h2>
                    <p className="text-zinc-500 font-black uppercase tracking-widest text-[10px] mt-2">Unit Identifier: {isEditing.id}</p>
                 </div>
                 <button onClick={() => setIsEditing(null)} className="absolute top-8 right-8 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-red-600 hover:text-white transition-all border border-white/20">✕</button>
              </div>

              <form onSubmit={handleUpdateRoom} className="p-8 md:p-16 pt-0 space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Public Designation</label>
                    <input 
                      type="text" 
                      required
                      value={isEditing.name}
                      onChange={(e) => setIsEditing({...isEditing, name: e.target.value})}
                      className="w-full px-8 py-5 bg-zinc-50 dark:bg-zinc-800 border-2 border-zinc-100 dark:border-zinc-700 rounded-2xl focus:outline-none focus:border-red-600 transition-all dark:text-white font-black uppercase text-sm tracking-tight"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Nightly Valuation ($)</label>
                    <input 
                      type="number" 
                      required
                      value={isEditing.price}
                      onChange={(e) => setIsEditing({...isEditing, price: Number(e.target.value)})}
                      className="w-full px-8 py-5 bg-zinc-50 dark:bg-zinc-800 border-2 border-zinc-100 dark:border-zinc-700 rounded-2xl focus:outline-none focus:border-red-600 transition-all dark:text-white font-black text-2xl tracking-tighter"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Inventory Status</label>
                    <select 
                      value={isEditing.status}
                      onChange={(e) => setIsEditing({...isEditing, status: e.target.value as RoomStatus})}
                      className="w-full px-8 py-5 bg-zinc-50 dark:bg-zinc-800 border-2 border-zinc-100 dark:border-zinc-700 rounded-2xl focus:outline-none focus:border-red-600 transition-all dark:text-white font-bold uppercase text-xs tracking-widest"
                    >
                      <option value={RoomStatus.AVAILABLE}>Available for Market</option>
                      <option value={RoomStatus.BOOKED}>Secured / Occupied</option>
                      <option value={RoomStatus.NOT_AVAILABLE}>Offline / Maintenance</option>
                    </select>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Geographic Quarter</label>
                    <input 
                      type="text" 
                      required
                      value={isEditing.location}
                      onChange={(e) => setIsEditing({...isEditing, location: e.target.value})}
                      className="w-full px-8 py-5 bg-zinc-50 dark:bg-zinc-800 border-2 border-zinc-100 dark:border-zinc-700 rounded-2xl focus:outline-none focus:border-red-600 transition-all dark:text-white font-bold"
                    />
                  </div>
                </div>

                <div className="space-y-8 bg-zinc-50 dark:bg-zinc-800/40 p-10 rounded-[3rem] border border-zinc-100 dark:border-zinc-800">
                  <h4 className="text-xs font-black uppercase tracking-[0.3em] text-zinc-950 dark:text-white">Media Assets Control</h4>
                  
                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Primary Identity Visual (Main)</label>
                    <div className="flex space-x-4">
                      <input 
                        type="url" 
                        required
                        value={isEditing.imageUrl}
                        onChange={(e) => setIsEditing({...isEditing, imageUrl: e.target.value})}
                        className="flex-grow px-7 py-4 bg-white dark:bg-zinc-900 border-2 border-zinc-100 dark:border-zinc-700 rounded-2xl focus:outline-none focus:border-red-600 transition-all dark:text-white text-xs"
                        placeholder="Hero image URL"
                      />
                      <div className="w-20 h-16 rounded-2xl overflow-hidden border-2 border-zinc-200 dark:border-zinc-700 flex-shrink-0 shadow-lg">
                         <img src={isEditing.imageUrl} className="w-full h-full object-cover" alt="Primary Preview" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Secondary Gallery Index</label>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {(isEditing.gallery || []).map((url, index) => (
                        <div key={index} className="group relative bg-white dark:bg-zinc-900 p-3 rounded-2xl border border-zinc-100 dark:border-zinc-800 transition-all hover:shadow-xl">
                          <img src={url} className="w-full h-24 object-cover rounded-xl mb-3" alt="" />
                          <div className="flex items-center justify-between">
                            <span className="text-[8px] font-black text-zinc-400 uppercase truncate max-w-[100px]">{url}</span>
                            <button 
                              type="button"
                              onClick={() => removeImageFromGallery(index)}
                              className="w-8 h-8 flex items-center justify-center bg-red-600/10 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-all shadow-sm"
                            >
                              <Icons.Trash />
                            </button>
                          </div>
                        </div>
                      ))}
                      
                      <div className="flex flex-col items-center justify-center border-2 border-dashed border-zinc-200 dark:border-zinc-700 rounded-2xl p-6 bg-zinc-100/30 dark:bg-zinc-800/20">
                         <div className="w-10 h-10 bg-zinc-200 dark:bg-zinc-800 rounded-full flex items-center justify-center text-zinc-400 mb-2">
                            <Icons.Plus />
                         </div>
                         <p className="text-[8px] font-black uppercase text-zinc-400 tracking-widest">Append Asset</p>
                      </div>
                    </div>

                    <div className="flex space-x-3 mt-8">
                      <input 
                        type="url"
                        value={newImageUrl}
                        onChange={(e) => setNewImageUrl(e.target.value)}
                        className="flex-grow px-7 py-5 bg-white dark:bg-zinc-900 border-2 border-zinc-100 dark:border-zinc-700 rounded-2xl focus:outline-none focus:border-red-600 transition-all dark:text-white text-xs"
                        placeholder="Paste additional image URL here..."
                      />
                      <button 
                        type="button"
                        onClick={addImageToGallery}
                        className="px-10 py-5 bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 font-black uppercase tracking-widest text-[10px] rounded-2xl hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all active:scale-95 shadow-xl"
                      >
                        Commit URL
                      </button>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Curated Amenities (CSV)</label>
                  <textarea 
                    rows={2}
                    value={isEditing.amenities.join(', ')}
                    onChange={(e) => setIsEditing({...isEditing, amenities: e.target.value.split(',').map(s => s.trim()).filter(s => s !== '')})}
                    className="w-full px-8 py-5 bg-zinc-50 dark:bg-zinc-800 border-2 border-zinc-100 dark:border-zinc-700 rounded-3xl focus:outline-none focus:border-red-600 transition-all dark:text-white resize-none font-bold text-sm tracking-tight"
                    placeholder="Wifi, Private Pool, Gym..."
                  ></textarea>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Narrative Description</label>
                  <textarea 
                    rows={5}
                    required
                    value={isEditing.description}
                    onChange={(e) => setIsEditing({...isEditing, description: e.target.value})}
                    className="w-full px-8 py-5 bg-zinc-50 dark:bg-zinc-800 border-2 border-zinc-100 dark:border-zinc-700 rounded-3xl focus:outline-none focus:border-red-600 transition-all dark:text-white resize-none leading-relaxed text-sm font-light italic"
                    placeholder="Describe the luxury residence..."
                  ></textarea>
                </div>

                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-8 border-t border-zinc-100 dark:border-zinc-800">
                  <button 
                    type="button" 
                    onClick={() => setIsEditing(null)}
                    className="flex-1 py-6 bg-zinc-100 dark:bg-zinc-800 text-zinc-500 font-black uppercase tracking-widest text-[10px] rounded-[2rem] hover:bg-zinc-200 transition-all"
                  >
                    Discard Edits
                  </button>
                  <button 
                    type="submit" 
                    className="flex-1 py-6 bg-red-600 text-white font-black uppercase tracking-widest text-[10px] rounded-[2rem] hover:bg-red-700 shadow-2xl shadow-red-600/40 transition-all active:scale-95"
                  >
                    Sync with Live Market
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Sidebar Navigation */}
      <aside className="w-80 bg-zinc-950 dark:bg-black text-white hidden lg:flex flex-col border-r border-zinc-900 sticky top-0 h-screen">
        <div className="p-12">
          <Link to="/" className="group flex justify-center mb-16">
            <Logo light className="h-16" />
          </Link>

          <nav className="space-y-5">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: <Icons.Dashboard /> },
              { id: 'rooms', label: 'Inventory', icon: <Icons.Home /> },
              { id: 'bookings', label: 'Bookings', icon: <Icons.Check /> }
            ].map((tab) => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)} 
                className={`w-full flex items-center space-x-5 px-8 py-5 rounded-2xl transition-all ${activeTab === tab.id ? 'bg-red-600 text-white font-black shadow-xl shadow-red-600/30 scale-105' : 'text-zinc-500 hover:text-white hover:bg-zinc-900'}`}
              >
                <div className={activeTab === tab.id ? 'text-white' : 'text-zinc-600'}>{tab.icon}</div>
                <span className="text-[10px] uppercase tracking-[0.2em] font-black">{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-auto p-12 space-y-4">
          <button onClick={toggleTheme} className="w-full flex items-center justify-center space-x-3 px-6 py-4 rounded-xl bg-zinc-900 border border-zinc-800 font-black uppercase tracking-widest text-[10px] hover:bg-zinc-800 transition-all">
            {theme === 'light' ? 'Night Mode' : 'Day Mode'}
          </button>
          <button onClick={handleLogoutWithRedirect} className="w-full flex items-center justify-center space-x-3 px-6 py-5 rounded-2xl bg-red-600/10 border border-red-600/20 text-red-600 font-black uppercase tracking-widest text-[10px] hover:bg-red-600 hover:text-white transition-all group shadow-xl">
            <Icons.LogOut />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow p-8 md:p-16 overflow-y-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-10 mb-20">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-5xl font-black text-zinc-950 dark:text-white uppercase tracking-tighter">{activeTab}</h1>
              <p className="text-zinc-400 font-bold uppercase tracking-[0.2em] text-[10px] mt-2">Central Management Console</p>
            </div>
            {/* Mobile-only logout */}
            <button 
              onClick={handleLogoutWithRedirect}
              className="lg:hidden p-4 bg-red-600/10 text-red-600 rounded-2xl border border-red-600/20"
              aria-label="Log Out"
            >
              <Icons.LogOut />
            </button>
          </div>
          
          <div className="flex items-center space-x-4">
            <button onClick={() => notify('CSV Generation initiated...')} className="hidden sm:block px-8 py-4 bg-white dark:bg-zinc-900 border-2 border-zinc-100 dark:border-zinc-800 text-zinc-950 dark:text-white font-black uppercase tracking-widest text-[10px] rounded-2xl hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all shadow-sm">Export Data</button>
            <button onClick={addRecord} className="flex-1 sm:flex-none px-10 py-5 bg-red-600 text-white font-black uppercase tracking-widest text-[10px] rounded-2xl hover:bg-red-700 shadow-2xl shadow-red-600/40 flex items-center justify-center space-x-4 transition-all active:scale-95">
               <Icons.Plus />
               <span>New {activeTab === 'rooms' ? 'Unit' : 'Entry'}</span>
            </button>
          </div>
        </header>

        {activeTab === 'dashboard' && (
          <div className="animate-in fade-in slide-in-from-bottom-10 duration-700 space-y-20">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, i) => (
                <div key={i} className="bg-white dark:bg-zinc-900 p-10 rounded-[3rem] border border-zinc-100 dark:border-zinc-800 hover:shadow-2xl transition-all group overflow-hidden relative shadow-sm">
                  <div className={`absolute -right-8 -top-8 w-32 h-32 ${stat.color} opacity-5 rounded-full group-hover:scale-110 transition-transform`}></div>
                  <div className={`w-14 h-14 ${stat.color} rounded-2xl flex items-center justify-center text-white mb-10 group-hover:scale-110 transition-transform shadow-xl`}>{stat.icon}</div>
                  <p className="text-zinc-400 text-[10px] font-black uppercase tracking-[0.3em] mb-3">{stat.label}</p>
                  <p className="text-5xl font-black dark:text-white tracking-tighter leading-none">{stat.value}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
               <div className="xl:col-span-2 bg-white dark:bg-zinc-900 p-12 rounded-[3.5rem] border border-zinc-100 dark:border-zinc-800 shadow-sm relative overflow-hidden">
                  <div className="flex items-center justify-between mb-12">
                     <h3 className="text-xl font-black uppercase tracking-tight dark:text-white">Revenue Performance</h3>
                     <div className="flex space-x-3">
                        <div className="flex items-center space-x-2"><div className="w-2.5 h-2.5 bg-red-600 rounded-full"></div><span className="text-[10px] font-black uppercase text-zinc-400 tracking-widest">Growth</span></div>
                        <div className="flex items-center space-x-2"><div className="w-2.5 h-2.5 bg-zinc-100 dark:bg-zinc-800 rounded-full"></div><span className="text-[10px] font-black uppercase text-zinc-400 tracking-widest">Baseline</span></div>
                     </div>
                  </div>
                  <div className="h-72 w-full flex items-end justify-between space-x-3">
                     {[35, 65, 40, 85, 60, 75, 45, 80, 90, 55, 70, 100].map((h, i) => (
                        <div key={i} className="flex-grow bg-zinc-50 dark:bg-zinc-800/30 rounded-full relative group cursor-pointer h-full transition-all">
                           <div className="absolute bottom-0 left-0 right-0 bg-red-600 rounded-full transition-all duration-700 group-hover:bg-red-500 shadow-xl group-hover:shadow-red-600/50" style={{ height: `${h}%` }}></div>
                           <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-zinc-950 text-white text-[9px] font-black py-1.5 px-3 rounded-lg shadow-xl whitespace-nowrap z-10">
                             ${h*250} Revenue
                           </div>
                        </div>
                     ))}
                  </div>
                  <div className="flex justify-between mt-8 text-[10px] font-black uppercase text-zinc-400 tracking-[0.4em] px-2">
                     <span>Jan</span><span>Apr</span><span>Jul</span><span>Oct</span><span>Dec</span>
                  </div>
               </div>

               <div className="bg-zinc-950 p-12 rounded-[3.5rem] border border-zinc-900 text-white flex flex-col justify-between shadow-2xl">
                  <div>
                    <h3 className="text-xl font-black uppercase tracking-tight mb-12">Network Status</h3>
                    <div className="space-y-8">
                       {[
                         { label: 'Market Sync', status: 'Live', color: 'bg-green-500' },
                         { label: 'Booking Engine', status: 'Optimal', color: 'bg-green-500' },
                         { label: 'Database Node', status: 'Secure', color: 'bg-green-500' },
                         { label: 'Gateway Auth', status: 'Active', color: 'bg-green-500' },
                       ].map((item, idx) => (
                         <div key={idx} className="flex items-center justify-between pb-6 border-b border-zinc-900 last:border-0 last:pb-0">
                           <span className="text-zinc-500 text-[10px] font-black uppercase tracking-widest">{item.label}</span>
                           <div className="flex items-center space-x-3">
                              <span className="text-[10px] font-black uppercase tracking-tighter">{item.status}</span>
                              <div className={`w-2 h-2 rounded-full ${item.color} shadow-[0_0_10px_rgba(34,197,94,0.5)] animate-pulse`}></div>
                           </div>
                         </div>
                       ))}
                    </div>
                  </div>
                  <button className="w-full mt-12 py-5 bg-zinc-900 border border-zinc-800 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-white hover:text-black transition-all shadow-xl active:scale-95">Run Integrity Check</button>
               </div>
            </div>
          </div>
        )}

        {(activeTab === 'rooms' || activeTab === 'bookings') && (
          <div className="bg-white dark:bg-zinc-900 rounded-[3.5rem] border border-zinc-100 dark:border-zinc-800 overflow-hidden animate-in slide-in-from-right-10 duration-700 shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b dark:border-zinc-800">
                    <th className="px-12 py-10 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">Identity Visual</th>
                    <th className="px-12 py-10 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">Financial Metrics</th>
                    <th className="px-12 py-10 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">Market Control</th>
                  </tr>
                </thead>
                <tbody className="divide-y dark:divide-zinc-800">
                  {(activeTab === 'rooms' ? rooms : bookings).map((item: any) => (
                    <tr key={item.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30 transition-colors group">
                      <td className="px-12 py-10">
                        <div className="flex items-center space-x-8">
                          <div className="w-24 h-20 rounded-2xl overflow-hidden border-2 border-zinc-100 dark:border-zinc-800 flex-shrink-0 relative group-hover:scale-105 transition-transform shadow-md bg-zinc-100 dark:bg-zinc-800">
                            <img src={item.imageUrl || 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=100'} className="w-full h-full object-cover" alt="" />
                            {activeTab === 'rooms' && item.status === RoomStatus.BOOKED && (
                              <div className="absolute inset-0 bg-zinc-950/40 flex items-center justify-center">
                                <div className="w-3 h-3 bg-amber-500 rounded-full animate-pulse"></div>
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="font-black text-zinc-950 dark:text-white uppercase tracking-tighter text-xl">{activeTab === 'rooms' ? item.name : item.guestName}</p>
                            <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mt-2">Designation ID: {item.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-12 py-10">
                        {activeTab === 'rooms' ? (
                          <div className="space-y-2">
                            <p className="font-black text-zinc-950 dark:text-white text-2xl tracking-tighter leading-none">${item.price}<span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-3 opacity-50">per night</span></p>
                            <div className="flex items-center space-x-2 text-[10px] font-black text-zinc-500 uppercase tracking-widest">
                              <Icons.Star />
                              <span className="dark:text-zinc-400">{item.rating} Quality Score</span>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-1">
                             <p className="font-black text-zinc-950 dark:text-white uppercase text-sm tracking-tight">{item.roomName}</p>
                             <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">{item.checkIn} — {item.checkOut}</p>
                          </div>
                        )}
                      </td>
                      <td className="px-12 py-10">
                        <div className="flex items-center space-x-3">
                          {activeTab === 'rooms' && (
                            <button 
                              onClick={() => setStatusToEdit(item)}
                              className={`px-5 py-2.5 border-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all hover:scale-105 active:scale-95 shadow-sm ${getStatusColor(item.status)}`}
                            >
                              {item.status}
                            </button>
                          )}
                          <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                            {activeTab === 'rooms' && (
                              <button 
                                onClick={() => setViewingRoom(item)} 
                                className="p-3 bg-white dark:bg-zinc-800 rounded-xl text-zinc-950 dark:text-white hover:bg-zinc-950 hover:text-white dark:hover:bg-zinc-700 transition-all border border-zinc-200 dark:border-zinc-700 shadow-sm"
                                title="Inspect Unit"
                              >
                                <Icons.View />
                              </button>
                            )}
                            <button 
                              onClick={() => activeTab === 'rooms' ? setIsEditing(item) : notify('Booking editing limited in preview...')} 
                              className="p-3 bg-white dark:bg-zinc-800 rounded-xl text-zinc-950 dark:text-white hover:bg-zinc-950 hover:text-white dark:hover:bg-red-600 transition-all border border-zinc-200 dark:border-zinc-700 shadow-sm"
                              title="Refine Asset"
                            >
                              <Icons.Edit />
                            </button>
                            <button 
                              onClick={() => activeTab === 'rooms' ? deleteRoom(item.id) : deleteBooking(item.id)} 
                              className="p-3 bg-red-600/10 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all border border-red-600/20 shadow-sm"
                              title="Destroy Entry"
                            >
                              <Icons.Trash />
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {/* Empty State */}
              {(activeTab === 'rooms' ? rooms : bookings).length === 0 && (
                <div className="p-32 text-center">
                   <div className="w-24 h-24 bg-zinc-50 dark:bg-zinc-800/50 rounded-full flex items-center justify-center mx-auto mb-8 text-zinc-300 dark:text-zinc-700 shadow-inner">
                      <Icons.Home />
                   </div>
                   <h4 className="text-2xl font-black uppercase tracking-tighter mb-4 dark:text-white">Empty Inventory Tier</h4>
                   <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest max-w-xs mx-auto">Assets have been purged or not yet initialized. Begin by adding new units.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Admin;
