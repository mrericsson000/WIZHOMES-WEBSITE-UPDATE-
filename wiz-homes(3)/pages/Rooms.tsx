
import React, { useState, useMemo } from 'react';
import { Icons, getRooms } from '../constants';
import RoomCard from '../components/RoomCard';
import { RoomStatus } from '../types';

const Rooms: React.FC = () => {
  const [filter, setFilter] = useState('All');
  const [sort, setSort] = useState('Recommended');
  const [showFilters, setShowFilters] = useState(false);

  const rooms = useMemo(() => getRooms(), []);

  const filteredRooms = useMemo(() => {
    return rooms.filter(room => {
      if (filter === 'All' || filter === 'All Apartments') return true;
      if (filter === 'Available') return room.status === RoomStatus.AVAILABLE;
      if (filter === 'Luxe') return room.price > 300;
      return true;
    });
  }, [rooms, filter]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-black text-zinc-900 dark:text-white mb-2">Our Apartments</h1>
          <p className="text-zinc-500 dark:text-zinc-400">{filteredRooms.length} luxury spaces found</p>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <div className="relative">
            <select 
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="appearance-none bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-6 py-3 pr-12 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-red-600/20 dark:text-white cursor-pointer transition-colors"
            >
              <option>All Apartments</option>
              <option>Available</option>
              <option>Luxe</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
            </div>
          </div>

          <div className="relative">
            <select 
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="appearance-none bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-6 py-3 pr-12 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-red-600/20 dark:text-white cursor-pointer transition-colors"
            >
              <option>Recommended</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Rating</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
            </div>
          </div>

          <button 
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all ${showFilters ? 'bg-red-600 text-white' : 'bg-zinc-950 dark:bg-zinc-100 dark:text-zinc-950 text-white hover:bg-zinc-800 dark:hover:bg-white'}`}
          >
            <Icons.Search />
            <span className="text-sm font-bold">Filters</span>
          </button>
        </div>
      </div>

      {showFilters && (
        <div className="mb-12 p-8 bg-zinc-50 dark:bg-zinc-900 rounded-3xl border border-zinc-100 dark:border-zinc-800 animate-in slide-in-from-top-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-bold mb-4">Price Range</h4>
              <input type="range" className="w-full accent-red-600" min="0" max="1000" />
              <div className="flex justify-between text-xs mt-2 text-zinc-500">$0 - $1000+</div>
            </div>
            <div>
              <h4 className="font-bold mb-4">Amenities</h4>
              <div className="grid grid-cols-2 gap-2">
                <label className="flex items-center space-x-2 text-sm"><input type="checkbox" className="accent-red-600" /> <span>Wifi</span></label>
                <label className="flex items-center space-x-2 text-sm"><input type="checkbox" className="accent-red-600" /> <span>Pool</span></label>
                <label className="flex items-center space-x-2 text-sm"><input type="checkbox" className="accent-red-600" /> <span>Gym</span></label>
                <label className="flex items-center space-x-2 text-sm"><input type="checkbox" className="accent-red-600" /> <span>Kitchen</span></label>
              </div>
            </div>
            <div className="flex items-end">
              <button onClick={() => setShowFilters(false)} className="w-full py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-colors">Apply Filters</button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
        {filteredRooms.map(room => (
          <RoomCard key={room.id} room={room} />
        ))}
      </div>

      {filteredRooms.length === 0 && (
        <div className="text-center py-32">
          <div className="w-20 h-20 bg-zinc-100 dark:bg-zinc-900 rounded-full flex items-center justify-center mx-auto mb-6 text-zinc-400">
             <Icons.Search />
          </div>
          <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">No matching rooms found</h3>
          <p className="text-zinc-500 dark:text-zinc-400">Try adjusting your filters or search criteria.</p>
          <button 
            onClick={() => setFilter('All')}
            className="mt-6 px-8 py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default Rooms;
