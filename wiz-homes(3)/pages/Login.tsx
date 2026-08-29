
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Logo } from '../constants';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API delay
    setTimeout(() => {
      onLogin();
      navigate('/admin');
    }, 1000);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4 bg-zinc-50 dark:bg-zinc-950 transition-colors duration-500">
      <div className="w-full max-w-md animate-in fade-in zoom-in duration-500">
        <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] shadow-2xl border border-zinc-100 dark:border-zinc-800 overflow-hidden">
          <div className="p-12">
            <div className="text-center mb-10">
              <Logo className="h-20 mb-8" />
              <p className="text-zinc-500 dark:text-zinc-400 text-sm font-medium">
                Authorized Operator Access Required.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500 ml-1">
                  Email Address
                </label>
                <input 
                  type="email" 
                  defaultValue="admin@wizhomes.com"
                  className="w-full px-6 py-4 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-600/20 dark:text-white transition-all font-bold" 
                  placeholder="admin@wizhomes.com"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center ml-1">
                  <label className="text-xs font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                    Password
                  </label>
                  <button type="button" className="text-[10px] font-bold text-red-600 hover:underline">
                    Forgot Key?
                  </button>
                </div>
                <input 
                  type="password" 
                  defaultValue="password"
                  className="w-full px-6 py-4 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-600/20 dark:text-white transition-all font-bold" 
                  placeholder="••••••••"
                />
              </div>

              <div className="flex items-center space-x-2 ml-1">
                <input type="checkbox" id="remember" className="accent-red-600 w-4 h-4 rounded" defaultChecked />
                <label htmlFor="remember" className="text-xs font-bold text-zinc-500 dark:text-zinc-400 select-none">
                  Keep Session Secure
                </label>
              </div>

              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full py-5 bg-red-600 text-white font-black rounded-2xl hover:bg-red-700 transition-all shadow-xl shadow-red-600/20 flex items-center justify-center space-x-2 active:scale-95 uppercase tracking-widest text-[11px]"
              >
                {isLoading ? (
                  <span className="flex items-center space-x-2">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Authenticating...</span>
                  </span>
                ) : (
                  <span>Initiate Secure Sign In</span>
                )}
              </button>
            </form>
          </div>
          
          <div className="bg-zinc-50 dark:bg-zinc-800/50 p-6 text-center border-t border-zinc-100 dark:border-zinc-800">
             <p className="text-[9px] font-black uppercase tracking-widest text-zinc-400">
               © 2024 WIZ HOMES EXTERIORS SECURITY PROTOCOL
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
