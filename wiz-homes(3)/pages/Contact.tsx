
import React, { useState } from 'react';
import { Icons } from '../constants';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Send to WhatsApp
    const whatsappNumber = '233552795947';
    const message = `Hello Wiz Homes!\n\nName: ${formData.name}\nEmail: ${formData.email}\n\nMessage: ${formData.message}`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    setTimeout(() => {
      setLoading(false);
      setIsSubmitted(true);
      window.open(whatsappURL, '_blank');
      setFormData({ name: '', email: '', message: '' });
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
        {/* Contact Info */}
        <div className="space-y-12">
          <div>
            <h1 className="text-5xl font-black text-zinc-900 dark:text-white mb-6 leading-tight">Get in Touch with <br/><span className="text-red-600">Concierge</span></h1>
            <p className="text-zinc-500 dark:text-zinc-400 text-lg leading-relaxed max-w-md">
              Have a special request or need assistance planning your stay? Our dedicated team is ready to curate your perfect experience.
            </p>
          </div>

          <div className="space-y-8">
            <div className="flex items-start space-x-6 group cursor-pointer" onClick={() => window.open('https://wa.me/233552795947')}>
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-xl flex items-center justify-center text-red-600 dark:text-red-400 flex-shrink-0 border dark:border-red-900/50 group-hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.447-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004c-1.628 0-3.184.613-4.346 1.724-1.162 1.11-1.802 2.585-1.802 4.149 0 1.644.526 3.231 1.523 4.663l.043.055 1.698 3.157 3.122-1.008.157.05c1.209.378 2.499.585 3.813.585 4.316 0 7.835-3.456 7.835-7.7 0-2.057-.822-3.992-2.313-5.451-1.491-1.46-3.469-2.265-5.565-2.265"/></svg>
              </div>
              <div>
                <h4 className="font-bold text-zinc-900 dark:text-white mb-1">WhatsApp</h4>
                <p className="text-zinc-500 dark:text-zinc-400">+233 55 279 5947</p>
              </div>
            </div>

            <div className="flex items-start space-x-6 group cursor-pointer" onClick={() => window.open('mailto:wizhomesgh@gmail.com')}>
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-xl flex items-center justify-center text-red-600 dark:text-red-400 flex-shrink-0 border dark:border-red-900/50 group-hover:scale-110 transition-transform">
                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              </div>
              <div>
                <h4 className="font-bold text-zinc-900 dark:text-white mb-1">Email</h4>
                <p className="text-zinc-500 dark:text-zinc-400">wizhomesgh@gmail.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white dark:bg-zinc-900 p-10 rounded-3xl shadow-2xl border border-zinc-100 dark:border-zinc-800 transition-all min-h-[500px] flex items-center justify-center">
          {isSubmitted ? (
            <div className="text-center animate-in zoom-in duration-500">
              <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Icons.Check />
              </div>
                <h2 className="text-3xl font-black mb-4">Message Sent to WhatsApp!</h2>
                <p className="text-zinc-500 mb-8">Your message has been sent to our WhatsApp. Our team will respond shortly.</p>
              <button onClick={() => setIsSubmitted(false)} className="px-8 py-3 border border-zinc-950 dark:border-white font-bold rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">Send another message</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-zinc-500">Full Name</label>
                  <input type="text" required placeholder="John Doe" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-6 py-4 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-600/20" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-zinc-500">Email Address</label>
                  <input type="email" required placeholder="john@example.com" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full px-6 py-4 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-600/20" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-zinc-500">Your Message</label>
                <textarea rows={5} required placeholder="How can we help you?" value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} className="w-full px-6 py-4 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-600/20 resize-none"></textarea>
              </div>
              <button type="submit" disabled={loading} className="w-full py-5 bg-red-600 text-white font-black rounded-xl hover:bg-red-700 transition-all flex items-center justify-center">
                {loading ? 'Sending to WhatsApp...' : 'Send Message'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
