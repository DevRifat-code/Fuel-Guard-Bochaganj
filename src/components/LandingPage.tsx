import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Fuel, 
  ArrowRight, 
  QrCode, 
  User as UserIcon, 
  Check, 
  Shield, 
  MapPin, 
  Globe, 
  Navigation,
  ShieldCheck,
  Zap,
  Activity as ActivityIcon,
  Clock
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export default function LandingPage({ 
  lang, 
  setLang, 
  onAuthModeChange, 
  setAuthMode, 
  isAdminAuthMode, 
  setIsAdminAuthMode, 
  handlePasswordAuth, 
  handleAdminAuth, 
  authMode, 
  name, 
  setName, 
  email, 
  setEmail, 
  password, 
  setPassword, 
  confirmPassword, 
  setConfirmPassword, 
  authError, 
  t, 
  pumps,
  handleGoogleSignIn,
  Header,
  isDark,
  onToggleTheme
}: any) {
  return (
    <div className={cn("min-h-screen flex flex-col relative overflow-x-hidden transition-colors duration-500", 
      isDark ? "bg-[#020617] text-white dark" : "bg-slate-50 text-slate-800",
      lang === 'bn' ? 'font-bengali' : 'font-sans')}>
      {Header && (
        <Header 
          user={null} 
          onSignOut={() => {}} 
          lang={lang} 
          setLang={setLang} 
          onAuthModeChange={setAuthMode} 
          isDark={isDark}
          onToggleTheme={onToggleTheme}
        />
      )}
      
      <main className="flex-1 pt-32 md:pt-48 pb-20 relative z-10 flex flex-col items-center">
        {/* Subtle Background Elements */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-500/5 blur-[120px] -mr-96 -mt-96 rounded-full opacity-50" />
        <div className="absolute top-[20%] left-0 w-[600px] h-[600px] bg-emerald-500/5 blur-[120px] -ml-96 rounded-full opacity-50" />
        
        {/* Hero Section */}
        <div className="w-full max-w-7xl px-8 flex flex-col lg:flex-row gap-20 items-center">
          <div className="flex-1 space-y-12 text-center lg:text-left">
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               className="inline-flex items-center gap-3 px-5 py-2 bg-blue-50 border border-blue-100 rounded-full"
            >
               <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
               <span className="text-[10px] font-black text-blue-800 uppercase tracking-[0.3em]">{lang === 'bn' ? 'ডিজিটাল বাংলাদেশ' : 'Digital Infrastructure'}</span>
            </motion.div>
            
            <div className="space-y-8">
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-6xl md:text-8xl font-black text-slate-800 tracking-tighter uppercase leading-[0.85]"
              >
                {t.appName.split(' ')[0]} <br/>
                <span className="text-blue-900">{t.appName.split(' ')[1]}</span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-slate-500 text-xl md:text-2xl font-medium max-w-2xl leading-relaxed mx-auto lg:mx-0"
              >
                {t.heroDesc}
              </motion.p>
            </div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-6 justify-center lg:justify-start"
            >
               <button 
                onClick={() => setAuthMode('signup')} 
                className="h-20 px-12 bg-blue-900 text-white text-lg font-black uppercase tracking-widest rounded-3xl shadow-2xl shadow-blue-900/20 hover:scale-105 transition-all flex items-center gap-4 group"
               >
                  {t.register}
                  <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
               </button>
               <button className="h-20 px-10 bg-white border border-slate-200 text-slate-800 text-lg font-bold rounded-3xl hover:bg-slate-50 transition-all shadow-xl shadow-slate-200/50">
                  {t.userManual}
               </button>
            </motion.div>
          </div>

          {/* Auth Form Area */}
          <div className="w-full max-w-lg">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/10 rounded-[3rem] p-10 shadow-[0_40px_80px_rgba(0,0,0,0.06)] relative overflow-hidden transition-colors"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-blue-900" />
              
              <div className="text-center mb-10">
                 <h2 className="text-3xl font-black text-slate-800 dark:text-white tracking-tight uppercase leading-none">{isAdminAuthMode ? t.adminLogin : (authMode === 'login' ? t.signIn : t.register)}</h2>
                 <p className="text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] mt-4">Authorized Access Only</p>
              </div>

              {!isAdminAuthMode && (
                <div className="bg-slate-50 dark:bg-white/5 p-1.5 rounded-2xl border border-slate-200 dark:border-white/10 flex mb-8">
                  <button onClick={() => setAuthMode('login')} className={cn("flex-1 py-4 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all", authMode === 'login' ? (isDark ? "bg-slate-800 text-white shadow-lg" : "bg-white text-blue-900 shadow-lg") : "text-slate-400")}>{t.signIn}</button>
                  <button onClick={() => setAuthMode('signup')} className={cn("flex-1 py-4 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all", authMode === 'signup' ? (isDark ? "bg-slate-800 text-white shadow-lg" : "bg-white text-blue-900 shadow-lg") : "text-slate-400")}>{t.register}</button>
                </div>
              )}

              <form onSubmit={isAdminAuthMode ? handleAdminAuth : handlePasswordAuth} className="space-y-6">
                {authMode === 'signup' && !isAdminAuthMode && (
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">{t.fullName}</label>
                    <input type="text" value={name || ''} onChange={e => setName(e.target.value)} required className="w-full h-16 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl px-6 text-slate-900 dark:text-white focus:bg-white dark:focus:bg-white/10 focus:border-blue-900 outline-none transition-all font-bold" />
                  </div>
                )}
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">{isAdminAuthMode ? t.idPlaceholder : t.email}</label>
                  <input type="email" value={email || ''} onChange={e => setEmail(e.target.value)} required className="w-full h-16 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl px-6 text-slate-900 dark:text-white focus:bg-white dark:focus:bg-white/10 focus:border-blue-900 outline-none transition-all font-bold" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">{t.password}</label>
                  <input type="password" value={password || ''} onChange={e => setPassword(e.target.value)} required className="w-full h-16 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl px-6 text-slate-900 dark:text-white focus:bg-white dark:focus:bg-white/10 focus:border-blue-900 outline-none transition-all font-bold" />
                </div>
                {authMode === 'signup' && !isAdminAuthMode && (
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{t.confirmPassword}</label>
                    <input type="password" value={confirmPassword || ''} onChange={e => setConfirmPassword(e.target.value)} required className="w-full h-16 bg-slate-50 border border-slate-200 rounded-2xl px-6 text-slate-900 focus:bg-white focus:border-blue-900 outline-none transition-all font-bold" />
                  </div>
                )}
                
                {authError && <p className="text-rose-500 text-xs text-center font-bold bg-rose-50 py-3 rounded-xl border border-rose-100">{authError}</p>}
                
                <button type="submit" className="w-full h-16 bg-blue-900 text-white font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-blue-900/20 hover:scale-[1.02] transition-all">
                  {isAdminAuthMode ? t.loginAsAdmin : (authMode === 'login' ? t.signIn : t.initialize)}
                </button>

                {!isAdminAuthMode && (
                   <div className="relative py-4">
                      <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
                      <div className="relative flex justify-center text-[8px] uppercase tracking-[0.4em] text-slate-300"><span className="bg-white px-4">Secure Gateway</span></div>
                   </div>
                )}

                {!isAdminAuthMode && handleGoogleSignIn && (
                  <button type="button" onClick={handleGoogleSignIn} className="w-full h-16 bg-white border border-slate-200 text-slate-600 font-bold rounded-2xl flex items-center justify-center gap-4 hover:bg-slate-50 transition-all">
                    <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/pjax/google.png" alt="Google" className="h-6" />
                    <span>{t.googleSso}</span>
                  </button>
                )}
              </form>

              <div className="mt-8 flex justify-center">
                 <button onClick={() => setIsAdminAuthMode(!isAdminAuthMode)} className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-blue-900 transition-colors underline decoration-blue-900/0 hover:decoration-blue-900">
                   {isAdminAuthMode ? t.backToUser : t.adminLogin}
                 </button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Requirements Section - Simplified */}
        <section className="w-full max-w-7xl px-8 mt-40">
           <div className="bg-white border border-slate-100 p-12 md:p-20 rounded-[4rem] shadow-[0_40px_80px_rgba(0,0,0,0.03)] grid grid-cols-1 lg:grid-cols-2 gap-20">
              <div className="space-y-12">
                 <div className="space-y-6">
                    <h2 className="text-blue-900 font-black text-sm uppercase tracking-[0.5em]">{t.operationalWorkflow}</h2>
                    <h3 className="text-5xl md:text-7xl font-black text-slate-800 tracking-tighter uppercase leading-none">{t.requirementsTitle}</h3>
                 </div>
                 <ul className="space-y-8">
                    {[t.reqItem1, t.reqItem2, t.reqItem3, t.reqItem4, t.reqItem5].map((item, i) => (
                      <li key={i} className="flex gap-6 items-start text-slate-500">
                         <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center shrink-0 mt-1">
                            <Check size={20} className="text-emerald-600" />
                         </div>
                         <span className="text-xl leading-relaxed font-medium">{item}</span>
                      </li>
                    ))}
                 </ul>
              </div>
              
              <div className="space-y-10">
                 <div className="p-12 bg-slate-50 border border-slate-200 rounded-[3rem] space-y-8">
                    <div className="w-20 h-20 bg-blue-900 rounded-[2rem] flex items-center justify-center text-white shadow-2xl shadow-blue-900/20">
                       <QrCode size={40} />
                    </div>
                    <div className="space-y-4">
                       <h4 className="text-3xl font-black text-slate-800 uppercase tracking-tight leading-none">{t.step1Landing}</h4>
                       <p className="text-slate-500 font-bold leading-relaxed">{t.step1Desc}</p>
                    </div>
                 </div>
                 
                 <div className="p-12 bg-white border border-slate-100 rounded-[3rem] shadow-xl shadow-slate-200/50 space-y-8">
                    <div className="w-20 h-20 bg-emerald-500 rounded-[2rem] flex items-center justify-center text-white shadow-2xl shadow-emerald-500/20">
                       <ShieldCheck size={40} />
                    </div>
                    <div className="space-y-4">
                       <h4 className="text-3xl font-black text-slate-800 uppercase tracking-tight leading-none">{t.step2Landing}</h4>
                       <p className="text-slate-500 font-bold leading-relaxed">{t.step2Desc}</p>
                    </div>
                 </div>
              </div>
           </div>
        </section>

        {/* Available Stations Section */}
        <section className="w-full max-w-7xl px-8 mt-40 pb-20">
           <div className="space-y-12 text-center">
              <div className="space-y-4">
                 <h2 className={cn("font-black text-sm uppercase tracking-[0.5em]", isDark ? "text-blue-400" : "text-blue-900")}>{t.terminals}</h2>
                 <h3 className={cn("text-5xl md:text-7xl font-black tracking-tighter uppercase leading-none", isDark ? "text-white" : "text-slate-800")}>{t.availableStations}</h3>
                 <p className="text-slate-500 font-medium text-lg max-w-2xl mx-auto">{lang === 'bn' ? 'বোচাগঞ্জ উপজেলার সকল অনুমোদিত ফুয়েল স্টেশন এবং তাদের বর্তমান অবস্থা।' : 'All authorized fuel stations in Bochaganj and their current status.'}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                 {pumps && pumps.length > 0 ? (
                   pumps.map((pump: any) => (
                     <motion.div 
                       key={pump.pumpId}
                       whileHover={{ y: -10 }}
                       className={cn("p-10 rounded-[3rem] text-left border transition-all duration-500 group", 
                         isDark ? "bg-white/5 border-white/10 hover:bg-white/10" : "bg-white border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-blue-900/10 hover:border-blue-200")}
                     >
                        <div className="flex justify-between items-start mb-8">
                           <div className="w-16 h-16 bg-blue-900 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-900/20">
                              <Fuel size={32} />
                           </div>
                           <div className="px-4 py-2 bg-emerald-50 border border-emerald-100 rounded-full flex items-center gap-2">
                              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                              <span className="text-[10px] font-black text-emerald-800 uppercase tracking-widest">Online</span>
                           </div>
                        </div>

                        <div className="space-y-4">
                           <h4 className={cn("text-2xl font-black uppercase tracking-tight", isDark ? "text-white" : "text-slate-800")}>{pump.name}</h4>
                           <div className="space-y-3">
                              <div className="flex items-start gap-3 text-slate-500">
                                 <MapPin size={18} className="shrink-0 text-blue-900 mt-1" />
                                 <span className="text-sm font-bold leading-tight">{pump.address || pump.location}</span>
                              </div>
                              <div className="flex items-center gap-3 text-slate-500">
                                 <Clock size={18} className="shrink-0 text-blue-900" />
                                 <span className="text-xs font-bold">{t.lastStockUpdate}: {pump.deliveryDate ? (typeof pump.deliveryDate === 'string' && pump.deliveryDate.includes('-') ? pump.deliveryDate : 'Recent') : 'N/A'}</span>
                              </div>
                           </div>
                        </div>

                        <div className="mt-10 pt-8 border-t border-slate-100 dark:border-white/5">
                           <a 
                             href={pump.mapUrl || '#'} 
                             target="_blank" 
                             rel="noopener noreferrer"
                             className="inline-flex items-center gap-3 text-blue-900 dark:text-blue-400 font-black text-xs uppercase tracking-widest hover:gap-5 transition-all"
                           >
                              {t.viewOnMap}
                              <Navigation size={16} />
                           </a>
                        </div>
                     </motion.div>
                   ))
                 ) : (
                   <div className="col-span-full py-20 text-center">
                      <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-200">
                         <MapPin size={40} />
                      </div>
                      <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">No Stations Registered Yet</p>
                   </div>
                 )}
              </div>
           </div>
        </section>
      </main>

      <footer className="py-24 px-8 border-t border-slate-200 bg-white">
         <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-16">
            <div className="flex flex-col items-center md:items-start gap-8">
               <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-900 border border-blue-100 shadow-sm"><Fuel size={32} /></div>
                  <span className="text-3xl font-black text-slate-800 uppercase tracking-tighter">বোচাগঞ্জ <span className="text-blue-900">ফুয়েল</span></span>
               </div>
               <p className="max-w-xs text-center md:text-left text-slate-400 text-sm leading-relaxed font-medium">উপজেলা নির্বাহী অফিসারের কার্যালয়, বোচাগঞ্জ। সরকারি ফুয়েল বিতরণ ও নিয়ন্ত্রণ পোর্টাল।</p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-16 items-center">
               <div className="flex flex-col gap-6">
                  <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.5em]">ইনফরমেশন</span>
                  <div className="flex flex-col gap-4">
                     <a href="#" className="text-xs font-black text-slate-500 uppercase tracking-widest hover:text-blue-900 transition-colors">প্রাইভেসি পলিসি</a>
                     <a href="#" className="text-xs font-black text-slate-500 uppercase tracking-widest hover:text-blue-900 transition-colors">ইউজার ম্যানুয়াল</a>
                  </div>
               </div>
               <div className="flex flex-col gap-6">
                  <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.5em]">অ্যাডমিন</span>
                  <div className="flex flex-col gap-4">
                     <a href="#" onClick={() => setIsAdminAuthMode(!isAdminAuthMode)} className="text-xs font-black text-slate-500 uppercase tracking-widest hover:text-blue-900 transition-colors">অ্যাডমিন লগইন</a>
                  </div>
               </div>
            </div>
            
            <div className="flex flex-col items-center md:items-end gap-6 text-center md:text-right">
               <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em]">{t.copyright}</p>
            </div>
         </div>
      </footer>
    </div>
  );
}
