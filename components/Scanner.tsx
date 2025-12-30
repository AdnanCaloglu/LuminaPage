import React, { useEffect, useRef, useState } from 'react';
import { Camera, RefreshCw, CheckCircle, AlertTriangle, Play } from 'lucide-react';
import { generateBookIntro, generateSpeech } from '../services/gemini';

interface ScannerProps {
  onScanComplete: () => void;
}

const Scanner: React.FC<ScannerProps> = ({ onScanComplete }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanState, setScanState] = useState<'idle' | 'scanning' | 'verifying' | 'success' | 'error'>('idle');
  const [bookTitle, setBookTitle] = useState('The Great Gatsby');
  const [bookAuthor, setBookAuthor] = useState('F. Scott Fitzgerald');
  const [introText, setIntroText] = useState<string>('');
  const [isPlaying, setIsPlaying] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    // Initialize Camera
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Camera access denied or not available", err);
      }
    };
    startCamera();

    return () => {
      // Cleanup tracks
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  const handleScan = async () => {
    if (!bookTitle) return;
    setScanState('scanning');
    
    // Simulate finding the tag
    setTimeout(() => {
      setScanState('verifying');
      
      // Simulate crypto check
      setTimeout(async () => {
        setScanState('success');
        onScanComplete();
        // Generate content
        const intro = await generateBookIntro(bookTitle, bookAuthor);
        setIntroText(intro);
      }, 1500);
    }, 2000);
  };

  const playAudio = async () => {
    if (!introText || isPlaying) return;
    setIsPlaying(true);
    
    const audioData = await generateSpeech(introText);
    if (!audioData) {
      setIsPlaying(false);
      return;
    }

    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }

    const ctx = audioContextRef.current;
    if (ctx.state === 'suspended') await ctx.resume();
    
    try {
      const audioBuffer = await ctx.decodeAudioData(audioData);
      const source = ctx.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(ctx.destination);
      source.onended = () => setIsPlaying(false);
      source.start(0);
    } catch (e) {
      console.error("Audio playback error", e);
      setIsPlaying(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-700 relative">
      <div className="relative h-80 bg-black flex items-center justify-center">
        <video 
          ref={videoRef} 
          autoPlay 
          playsInline 
          muted 
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        
        {/* Scanner Overlay UI */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 right-1/4 bottom-1/4 border-2 border-indigo-500/50 rounded-lg">
             <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-indigo-400 -mt-0.5 -ml-0.5"></div>
             <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-indigo-400 -mt-0.5 -mr-0.5"></div>
             <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-indigo-400 -mb-0.5 -ml-0.5"></div>
             <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-indigo-400 -mb-0.5 -mr-0.5"></div>
          </div>
          
          {scanState === 'scanning' && (
             <div className="absolute top-1/4 left-1/4 right-1/4 h-0.5 bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)] animate-scan"></div>
          )}
        </div>

        {/* Status Messages */}
        <div className="absolute bottom-4 left-0 right-0 text-center">
          {scanState === 'idle' && <p className="text-sm text-slate-300 bg-black/50 px-3 py-1 rounded-full inline-block backdrop-blur-sm">Align smart tag within frame</p>}
          {scanState === 'scanning' && <p className="text-sm text-indigo-300 font-mono bg-black/50 px-3 py-1 rounded-full inline-block backdrop-blur-sm animate-pulse">READING CRYPTO TAG...</p>}
          {scanState === 'verifying' && <p className="text-sm text-amber-300 font-mono bg-black/50 px-3 py-1 rounded-full inline-block backdrop-blur-sm">VERIFYING BLOCKCHAIN HASH...</p>}
          {scanState === 'success' && <p className="text-sm text-emerald-300 font-bold bg-black/50 px-3 py-1 rounded-full inline-block backdrop-blur-sm flex items-center gap-2"><CheckCircle size={14}/> VERIFIED AUTHENTIC</p>}
        </div>
      </div>

      <div className="p-6">
        {scanState !== 'success' ? (
          <div className="space-y-4">
            <div>
              <label className="block text-xs uppercase text-slate-500 font-bold mb-1">Simulate Tag for Book</label>
              <input 
                type="text" 
                value={bookTitle}
                onChange={(e) => setBookTitle(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter book title..."
              />
            </div>
             <div>
              <label className="block text-xs uppercase text-slate-500 font-bold mb-1">Author Name</label>
              <input 
                type="text" 
                value={bookAuthor}
                onChange={(e) => setBookAuthor(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter author name..."
              />
            </div>
            <button 
              onClick={handleScan}
              disabled={scanState !== 'idle' || !bookTitle}
              className={`w-full py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-all ${
                scanState === 'idle' 
                ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/30' 
                : 'bg-slate-700 text-slate-400 cursor-not-allowed'
              }`}
            >
              <Camera size={20} />
              {scanState === 'idle' ? 'Scan Book' : 'Processing...'}
            </button>
          </div>
        ) : (
          <div className="space-y-4 animate-fade-in">
             <div className="flex items-start gap-4">
               <img src={`https://picsum.photos/seed/${bookTitle}/100/150`} alt="Cover" className="w-16 h-24 object-cover rounded shadow-md" />
               <div>
                 <h3 className="text-lg font-bold text-white font-serif">{bookTitle}</h3>
                 <p className="text-slate-400 text-sm">Verified Copy #84921</p>
                 <div className="flex items-center gap-1 mt-1">
                   <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                   <span className="text-xs text-emerald-500 uppercase font-bold tracking-wider">Secure</span>
                 </div>
               </div>
             </div>

             <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700/50">
               <h4 className="text-xs uppercase text-indigo-400 font-bold mb-2">Author Message</h4>
               <p className="text-slate-300 text-sm italic leading-relaxed">
                 "{introText || "Loading author introduction..."}"
               </p>
               {introText && (
                 <button 
                  onClick={playAudio}
                  disabled={isPlaying}
                  className="mt-3 text-xs bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-2 rounded flex items-center gap-2 transition-colors disabled:opacity-50"
                 >
                   <Play size={14} className={isPlaying ? "animate-pulse" : ""} />
                   {isPlaying ? "Playing..." : "Listen to Author"}
                 </button>
               )}
             </div>

             <button 
               onClick={() => {
                 setScanState('idle');
                 setIntroText('');
               }}
               className="w-full py-2 bg-slate-800 text-slate-300 hover:text-white rounded-lg text-sm flex items-center justify-center gap-2 border border-slate-700"
             >
               <RefreshCw size={14} /> Scan Another
             </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Scanner;