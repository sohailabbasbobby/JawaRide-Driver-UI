import { useAppContext } from '../../contexts/AppContext';
import { PullUpSheet } from '../ui/PullUpSheet';
import { JawaSlideAction } from '../ui/JawaSlideAction';
import { MapPin, Clock, Phone, Plus, X, Car, User, Navigation, ArrowRight, CreditCard, Banknote } from 'lucide-react';
import { vibrate } from '../../lib/haptics';
import { playSound } from '../../lib/sounds';
import { openNavigation } from '../../lib/navigation';

const PrimaryButton = ({ icon: Icon, label, onClick, className = '' }: any) => (
  <button 
    onClick={(e) => {
      vibrate.light();
      onClick(e);
    }}
    className={`w-full h-[52px] rounded-2xl flex items-center justify-center shadow-[0_4px_10px_rgba(0,0,0,0.1),inset_0_2px_4px_rgba(255,255,255,0.2)] dark:border dark:border-white/20 active:scale-[0.98] transition-all ${className}`}
  >
    <div className="flex items-center gap-2">
      {Icon && <Icon className="w-5 h-5 flex-shrink-0" />}
      <span className="font-semibold text-[17px] tracking-tight">{label}</span>
    </div>
  </button>
);

export function ActiveTripSheet() {
  const { tripState, setTripState, setModal, preferredMapsApp } = useAppContext();
  
  if (['idle', 'summary', 'cancelled'].includes(tripState)) return null;

  const content = (() => {
    switch (tripState) {
      case 'requesting':
        return (
          <div className="flex flex-col gap-6 pb-6">
            <div className="flex justify-between items-center mt-2">
              <h2 className="text-[20px] font-bold text-gray-900 dark:text-white">New Trip Request</h2>
              <span className="bg-[#16c464]/10 text-[#16c464] px-4 py-1.5 rounded-full text-[15px] font-bold">Paid by Card</span>
            </div>
            
            <div>
              <p className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-3">Distance To Pickup</p>
              <div className="flex gap-3">
                <div className="flex-1 h-[46px] rounded-2xl border border-gray-200 dark:border-white/10 flex items-center justify-center gap-2 bg-gray-50 dark:bg-zinc-800 text-[#d97706] font-bold">
                  <Car className="w-[18px] h-[18px]" strokeWidth={2.5} />
                  <span>0.8 mi</span>
                </div>
                <div className="flex-1 h-[46px] rounded-2xl border border-gray-200 dark:border-white/10 flex items-center justify-center gap-2 bg-gray-50 dark:bg-zinc-800 text-[#d97706] font-bold">
                  <Clock className="w-[18px] h-[18px]" strokeWidth={2.5} />
                  <span>3 min</span>
                </div>
              </div>
            </div>

            <div className="relative pl-10 space-y-6 my-2">
              <div className="absolute left-[19px] top-4 bottom-4 w-px bg-gray-200 dark:bg-white/10" />

              <div className="relative">
                <div className="absolute -left-10 w-9 h-9 rounded-full bg-[#ecfdf5] dark:bg-green-500/10 flex items-center justify-center border border-[#d1fae5] dark:border-green-500/20">
                  <MapPin className="w-4 h-4 text-[#16c464]" />
                </div>
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-0.5">Pickup</p>
                <p className="font-bold text-[16px] text-gray-900 dark:text-white">123 High Street, London EC1A</p>
              </div>

              <div className="relative">
                <div className="absolute -left-10 w-9 h-9 rounded-full bg-[#fff7ed] dark:bg-orange-500/10 flex items-center justify-center border border-[#ffedd5] dark:border-orange-500/20">
                  <Navigation className="w-4 h-4 text-[#d97706] rotate-45 transform -translate-y-[1px] -translate-x-[1px]" />
                </div>
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-0.5">Drop-off</p>
                <p className="font-bold text-[16px] text-gray-900 dark:text-white">456 Oxford Street, London W1D</p>
              </div>
            </div>

            <div>
              <p className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-3">Trip Distance & Duration</p>
              <div className="flex gap-3">
                <div className="flex-1 h-[46px] rounded-2xl bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 font-bold flex items-center justify-center gap-2 shadow-sm">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="6" cy="19" r="3"/><path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15"/><circle cx="18" cy="5" r="3"/></svg>
                  <span>4.2 mi</span>
                </div>
                <div className="flex-1 h-[46px] rounded-2xl bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 font-bold flex items-center justify-center gap-2 shadow-sm">
                  <Clock className="w-[18px] h-[18px]" strokeWidth={2.5} />
                  <span>15 min</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-4">
              <button 
                onClick={() => setTripState('idle')} 
                className="px-6 h-[56px] rounded-2xl bg-gray-200 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 font-bold active:scale-[0.98] transition-transform shadow-sm"
              >
                Decline
              </button>
              <button 
                onClick={() => {
                  playSound.success();
                  setTripState('on_way');
                }} 
                className="flex-1 h-[56px] rounded-2xl bg-gradient-to-b from-[#21c55e] to-[#16a34a] text-white font-bold text-[18px] active:scale-[0.98] transition-transform shadow-[0_4px_12px_rgba(33,197,94,0.4),inset_0_2px_4px_rgba(255,255,255,0.3)]"
              >
                ACCEPT
              </button>
            </div>
          </div>
        );
      case 'on_way':
        return (
          <div className="flex flex-col gap-4 pb-6">
            <div className="flex justify-between items-center mt-2">
              <h2 className="text-[18px] font-bold text-gray-900 dark:text-white">On the way to pickup</h2>
              <span className="text-[15px] font-bold text-[#16c464]">ETA 5 min</span>
            </div>

            <div className="w-full bg-gray-200 dark:bg-zinc-800 rounded-full h-[6px]">
              <div className="bg-[#16c464] rounded-full h-full w-[25%]" />
            </div>

            <div 
              onClick={() => { vibrate.light(); setModal('payment_method'); }}
              className="bg-gray-50 dark:bg-[#2c2c2e] border border-gray-200 dark:border-white/20 rounded-2xl p-4 flex items-center justify-between cursor-pointer active:scale-[0.98] transition-transform"
            >
              <div className="flex items-center gap-3">
                <Banknote className="w-6 h-6 text-green-600 dark:text-green-400" />
                <span className="font-bold text-gray-900 dark:text-white text-[16px]">Cash Payment</span>
              </div>
              <p className="text-[12px] font-bold text-[#16c464] uppercase tracking-widest">Change</p>
            </div>

            <div className="bg-gray-50 dark:bg-[#2c2c2e] border border-gray-200 dark:border-white/20 rounded-3xl p-5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 flex items-center justify-center">
                  <User className="w-6 h-6 text-gray-400" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 dark:text-white text-[16px]">John Smith</p>
                  <div className="flex items-center gap-1.5 mt-1 text-gray-500">
                    <MapPin className="w-3.5 h-3.5 text-[#16c464]" />
                    <p className="text-[13px] font-medium">123 High Street, London</p>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => openNavigation(preferredMapsApp, '123 High Street, London EC1A')}
                className="w-16 h-16 rounded-2xl bg-gradient-to-b from-[#21c55e] to-[#16a34a] shadow-[0_4px_12px_rgba(33,197,94,0.4),inset_0_2px_4px_rgba(255,255,255,0.3)] flex items-center justify-center text-white shrink-0 active:scale-95 transition-all"
              >
                <Navigation className="w-8 h-8 rotate-45 -translate-x-[2px] -translate-y-[2px]" strokeWidth={2.5}/>
              </button>
            </div>

            <div className="flex gap-4">
              <PrimaryButton 
                label="Contact" 
                icon={Phone} 
                className="bg-white dark:bg-zinc-800 text-gray-800 dark:text-white border border-gray-200 dark:border-transparent" 
                onClick={() => {}} 
              />
              <PrimaryButton 
                label="Cancel" 
                icon={X}
                className="bg-gradient-to-b from-[#fc4c4b] to-[#d63d3c] text-white"
                onClick={() => setTripState('idle')} 
              />
            </div>

            <div className="mt-2">
              <JawaSlideAction 
                key={`slide-arrive-${tripState}`}
                label="SLIDE TO CONFIRM ARRIVAL" 
                onComplete={() => {
                  playSound.success();
                  setTripState('waiting');
                }} 
                knobColor="green"
              />
            </div>
          </div>
        );
      case 'waiting':
        return (
           <div className="flex flex-col gap-4 pb-6">
            <div className="flex justify-between items-center mt-2">
              <h2 className="text-[18px] font-bold text-gray-900 dark:text-white">Waiting for rider</h2>
              <span className="text-[15px] font-bold text-[#d97706]">1:46</span>
            </div>

            <div className="w-full bg-gray-200 dark:bg-zinc-800 rounded-full h-[6px]">
              <div className="bg-[#d97706] rounded-full h-full w-[15%]" />
            </div>

            <div className="mt-2">
              <JawaSlideAction 
                key={`slide-continue-${tripState}`}
                label="CONTINUE TRIP" 
                onComplete={() => {
                  playSound.success();
                  setTripState('on_trip');
                }} 
                knobColor="green"
              />
            </div>

            <div className="bg-gray-50 dark:bg-[#2c2c2e] border border-gray-200 dark:border-white/20 rounded-3xl p-5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 flex items-center justify-center">
                  <User className="w-6 h-6 text-gray-400" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 dark:text-white text-[16px]">John Smith</p>
                  <div className="flex items-center gap-1.5 mt-1 text-gray-500">
                    <MapPin className="w-3.5 h-3.5 text-[#16c464]" />
                    <p className="text-[13px] font-medium">123 High Street, London</p>
                  </div>
                </div>
              </div>
            </div>

             <div className="flex gap-4">
              <PrimaryButton 
                label="Contact" 
                icon={Phone} 
                className="bg-white dark:bg-zinc-800 text-gray-800 dark:text-white border border-gray-200 dark:border-transparent" 
                onClick={() => {}} 
              />
              <PrimaryButton 
                label="Payment" 
                icon={CreditCard}
                className="bg-white dark:bg-zinc-800 text-gray-800 dark:text-white border border-gray-200 dark:border-transparent" 
                onClick={() => setModal('payment_method')} 
              />
            </div>

            <div className="mt-2">
              <JawaSlideAction 
                key={`slide-cancel-${tripState}`}
                label="NO SHOW - £5 CHARGED" 
                onComplete={() => setTripState('cancelled')} 
                knobColor="red"
              />
            </div>
          </div>
        );
      case 'on_trip':
        return (
          <div className="flex flex-col gap-4 pb-6">
             <div className="flex justify-between items-center mt-2">
              <h2 className="text-[18px] font-bold text-gray-900 dark:text-white">On trip</h2>
            </div>
            <div className="w-full bg-gray-200 dark:bg-zinc-800 rounded-full h-[6px]">
              <div className="bg-[#16c464] rounded-full h-full w-full" />
            </div>

             <div className="bg-gray-50 dark:bg-[#2c2c2e] border border-gray-200 dark:border-white/20 rounded-3xl p-5 mb-1 flex items-center justify-between">
               <div className="flex gap-4">
                 <div className="w-10 h-10 rounded-full border border-[#d97706]/30 bg-orange-50 dark:bg-orange-500/10 flex items-center justify-center shrink-0">
                    <Navigation className="w-4 h-4 text-[#d97706] rotate-45 -translate-y-[1px] -translate-x-[1px]" />
                 </div>
                 <div>
                    <p className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-1 mt-0.5">Drop-off</p>
                    <p className="font-bold text-gray-900 dark:text-white text-[16px]">456 Oxford Street, London</p>
                 </div>
               </div>
               <button 
                  onClick={() => openNavigation(preferredMapsApp, '456 Oxford Street, London W1D')}
                  className="w-16 h-16 rounded-2xl bg-gradient-to-b from-[#21c55e] to-[#16a34a] shadow-[0_4px_12px_rgba(33,197,94,0.4),inset_0_2px_4px_rgba(255,255,255,0.3)] flex items-center justify-center text-white shrink-0 active:scale-95 transition-all"
                >
                  <Navigation className="w-8 h-8 rotate-45 -translate-x-[2px] -translate-y-[2px]" strokeWidth={2.5}/>
                </button>
            </div>

             <div className="flex gap-3 mt-1">
               <div className="flex-1 h-[46px] rounded-2xl bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 font-bold flex items-center justify-center gap-2 shadow-sm">
                 <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="6" cy="19" r="3"/><path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15"/><circle cx="18" cy="5" r="3"/></svg>
                 <span>3.2 mi <span className="font-normal opacity-70">left</span></span>
               </div>
               <div className="flex-1 h-[46px] rounded-2xl bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 font-bold flex items-center justify-center gap-2 shadow-sm">
                 <Clock className="w-[18px] h-[18px]" strokeWidth={2.5} />
                 <span>12 min <span className="font-normal opacity-70">left</span></span>
               </div>
             </div>

            <button 
              onClick={() => {
                vibrate.medium();
                setModal('add_stop');
              }}
              className="w-full py-4 mt-2 rounded-[20px] flex items-center justify-center gap-2 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white font-bold shadow-[0_4px_10px_rgba(0,0,0,0.05),inset_0_2px_4px_rgba(255,255,255,0.1)] active:scale-[0.98] transition-all mb-1"
            >
              <Plus className="w-5 h-5 text-[#16c464]" strokeWidth={3} />
              Add Extra Stop
            </button>
            
            <JawaSlideAction 
              key={`slide-end-${tripState}`}
              label="SLIDE TO END TRIP" 
              onComplete={() => {
                playSound.success();
                setModal('end_trip');
              }} 
              knobColor="green"
            />
          </div>
        );
      case 'summary':
      case 'cancelled':
        return null;
      default:
        return null;
    }
  })();

  return (
    <PullUpSheet 
      key={`trip-sheet-${tripState}`}
      isOpen={true} 
      midHeight={300}
      minState={tripState === 'requesting' ? 'expanded' : 'mid'}
      disableDrag={tripState === 'requesting'}
    >
       {content}
    </PullUpSheet>
  );
}
