
import React, { useState, useEffect } from 'react';
import { MemoryRouter, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { Icons, Logo } from './constants';
import Home from './pages/Home';
import Rooms from './pages/Rooms';
import RoomDetail from './pages/RoomDetail';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import Login from './pages/Login';

const Navbar: React.FC<{ theme: string; toggleTheme: () => void; isAuthenticated: boolean }> = ({ theme, toggleTheme, isAuthenticated }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin') || location.pathname === '/login';

  if (isAdmin) return null;

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-zinc-100 dark:border-zinc-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-24">
            <div className="flex items-center">
              <Link to="/" className="group py-2">
                <Logo className="h-10 md:h-12 scale-90 md:scale-100 transform transition-transform group-hover:scale-105 duration-300" />
              </Link>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-[11px] font-black uppercase tracking-widest text-zinc-600 dark:text-zinc-400 hover:text-red-600 dark:hover:text-red-500 transition-colors">Home</Link>
              <Link to="/rooms" className="text-[11px] font-black uppercase tracking-widest text-zinc-600 dark:text-zinc-400 hover:text-red-600 dark:hover:text-red-500 transition-colors">Inventory</Link>
              <Link to="/contact" className="text-[11px] font-black uppercase tracking-widest text-zinc-600 dark:text-zinc-400 hover:text-red-600 dark:hover:text-red-500 transition-colors">Contact</Link>
            </div>

            <div className="flex items-center space-x-2 md:space-x-4">
              <button 
                onClick={toggleTheme}
                className="p-2 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-full transition-all"
                aria-label="Toggle Dark Mode"
              >
                {theme === 'light' ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
                )}
              </button>
              <Link to={isAuthenticated ? "/admin" : "/login"} className="p-2 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-full transition-colors">
                <Icons.User />
              </Link>
              <button onClick={toggleMenu} className="md:hidden p-2 text-zinc-950 dark:text-white">
                <Icons.Menu />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm transition-opacity duration-300 md:hidden ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} onClick={toggleMenu}>
        <div 
          className={`absolute right-0 top-0 h-full w-4/5 max-w-sm bg-white dark:bg-zinc-950 shadow-2xl transition-transform duration-300 ease-out p-12 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-16">
            <Logo className="h-10" />
            <button onClick={toggleMenu} className="p-2 text-zinc-500">✕</button>
          </div>
          <nav className="flex flex-col space-y-8">
            <Link to="/" onClick={toggleMenu} className="text-3xl font-black uppercase tracking-tighter">Home</Link>
            <Link to="/rooms" onClick={toggleMenu} className="text-3xl font-black uppercase tracking-tighter">Inventory</Link>
            <Link to="/contact" onClick={toggleMenu} className="text-3xl font-black uppercase tracking-tighter">Contact</Link>
            <Link to={isAuthenticated ? "/admin" : "/login"} onClick={toggleMenu} className="text-xl font-black uppercase tracking-widest text-red-600 pt-8 border-t border-zinc-100 dark:border-zinc-800">Admin Area</Link>
          </nav>
        </div>
      </div>
    </>
  );
};

const Footer: React.FC = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin') || location.pathname === '/login';

  if (isAdmin) return null;

  return (
    <footer className="bg-zinc-950 dark:bg-black text-white pt-24 pb-12 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
          <div className="col-span-1 md:col-span-2 space-y-8">
            <Logo light className="h-16 items-start" />
            <p className="text-zinc-500 max-w-sm leading-relaxed font-medium">
              Curating architectural landmarks and luxury living spaces for the global elite. Experience the pinnacle of modern design with WIZ HOMES EXTERIORS.
            </p>
            <div className="flex space-x-4">
               <button className="w-12 h-12 bg-zinc-900/50 rounded-2xl flex items-center justify-center hover:bg-red-600 transition-all cursor-pointer border border-zinc-800 group">
                 <span className="text-[10px] font-black uppercase group-hover:scale-110 transition-transform">FB</span>
               </button>
               <button className="w-12 h-12 bg-zinc-900/50 rounded-2xl flex items-center justify-center hover:bg-red-600 transition-all cursor-pointer border border-zinc-800 group">
                 <span className="text-[10px] font-black uppercase group-hover:scale-110 transition-transform">IG</span>
               </button>
               <button className="w-12 h-12 bg-zinc-900/50 rounded-2xl flex items-center justify-center hover:bg-red-600 transition-all cursor-pointer border border-zinc-800 group">
                 <span className="text-[10px] font-black uppercase group-hover:scale-110 transition-transform">LI</span>
               </button>
            </div>
          </div>
          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.4em] text-white mb-8">Navigation</h4>
            <ul className="space-y-4 text-[11px] font-black uppercase tracking-widest text-zinc-500">
              <li><Link to="/" className="hover:text-red-600 transition-colors">Home</Link></li>
              <li><Link to="/rooms" className="hover:text-red-600 transition-colors">Inventory</Link></li>
              <li><Link to="/contact" className="hover:text-red-600 transition-colors">Concierge</Link></li>
              <li><Link to="/admin" className="hover:text-red-600 transition-colors">Operator Portal</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.4em] text-white mb-8">Global HQ</h4>
            <ul className="space-y-4 text-[11px] font-black uppercase tracking-widest text-zinc-500">
              <li className="text-white">123 Luxury Blvd, Suite 100</li>
              <li>Manhattan, NY 10001</li>
              <li>+1 (555) 949-4663</li>
              <li className="text-red-600">concierge@wizhomes.com</li>
            </ul>
          </div>
        </div>
        <div className="pt-12 border-t border-zinc-900/50 flex flex-col md:flex-row justify-between items-center text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600">
          <p>© 2024 WIZ HOMES EXTERIORS. Architectural Excellence Guaranteed.</p>
          <div className="flex space-x-8 mt-6 md:mt-0">
            <button className="hover:text-white transition-colors">Privacy Charter</button>
            <button className="hover:text-white transition-colors">Global Terms</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

const App: React.FC = () => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  });

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const handleLogin = () => setIsAuthenticated(true);
  const handleLogout = () => setIsAuthenticated(false);

  return (
    <MemoryRouter>
      <div className="min-h-screen flex flex-col bg-white dark:bg-zinc-950 transition-colors duration-300">
        <Navbar theme={theme} toggleTheme={toggleTheme} isAuthenticated={isAuthenticated} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/rooms/:id" element={<RoomDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route 
              path="/admin/*" 
              element={isAuthenticated ? <Admin theme={theme} toggleTheme={toggleTheme} onLogout={handleLogout} /> : <Navigate to="/login" replace />} 
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </MemoryRouter>
  );
};

export default App;
