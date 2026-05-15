import { useAppContext } from '../../contexts/AppContext';
import { PullUpSheet } from '../ui/PullUpSheet';
import { JawaSlideAction } from '../ui/JawaSlideAction';
import { Wifi, WifiOff, Coffee } from 'lucide-react';

export function HomeSheet() {
  const { status, setStatus, tripState, setModal } = useAppContext();
  
  if (tripState !== 'idle') return null;

  const content = (() => {
    switch (status) {
      case 'offline':
        return (
          <div className="flex flex-col text-center px-8 items-center pb-8">
            <div className="w-10 h-10 rounded-full bg-[#fce8e8] dark:bg-red-500/10 flex items-center justify-center shrink-0 mb-2">
              <WifiOff className="w-5 h-5 text-[#fc4c4b]" strokeWidth={2} />
            </div>
            <h2 className="text-[17px] font-bold text-gray-900 dark:text-white tracking-tight leading-tight mb-6">You are Offline</h2>
            
            <div className="w-full max-w-sm mx-auto">
              <JawaSlideAction 
                label="SLIDE TO GO ONLINE" 
                onComplete={() => setStatus('online')} 
                resetOnComplete
                knobColor="green"
              />
            </div>
          </div>
        );
      case 'online':
        return (
          <div className="flex flex-col text-center px-8 items-center pb-8">
            <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-[#16c464] bg-green-50 dark:bg-green-900/20 mb-2 relative">
               <Wifi className="w-5 h-5" strokeWidth={2.5} />
               {/* Pulsing indicator */}
               <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-[#16c464] rounded-full border-2 border-white dark:border-[#1c1c1e] animate-pulse"></span>
            </div>
            <h2 className="text-[17px] font-bold text-gray-900 dark:text-white tracking-tight leading-tight mb-6">Finding Trips...</h2>
            
            <div className="w-full max-w-sm mx-auto">
              <p className="text-center text-[12px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-4">Stop Receiving Trips</p>
              <JawaSlideAction 
                label="SLIDE TO GO OFFLINE" 
                onComplete={() => setStatus('offline')} 
                resetOnComplete
                knobColor="red"
              />
            </div>
          </div>
        );
      case 'break':
        return (
          <div className="flex flex-col text-center px-8 items-center pb-8">
            <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-[#fbb923] bg-yellow-50 dark:bg-yellow-900/20 mb-2">
               <Coffee className="w-5 h-5 text-[#fbb923]" strokeWidth={2.5} />
            </div>
            <h2 className="text-[17px] font-bold text-gray-900 dark:text-white tracking-tight leading-tight mb-6">You are on a Break</h2>
            
            <div className="w-full max-w-sm mx-auto">
              <p className="text-center text-[12px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-4">Resume Receiving Trips</p>
              <JawaSlideAction 
                label="SLIDE TO END BREAK" 
                onComplete={() => setModal('end_break')} 
                resetOnComplete
                knobColor="yellow"
              />
            </div>
          </div>
        );
    }
  })();

  return (
    <PullUpSheet isMid={true} midHeight={110} minState="mid">
      {content}
    </PullUpSheet>
  );
}
