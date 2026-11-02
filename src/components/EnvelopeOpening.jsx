import React, { useState } from 'react';

export default function EnvelopeOpening({ onComplete }) {
  const [stage, setStage] = useState('sealed'); // 'sealed' | 'opening' | 'revealing' | 'done'

  const handleOpen = () => {
    if (stage !== 'sealed') return;
    setStage('opening');
    setTimeout(() => setStage('revealing'), 1000); // Trigger card slide & fade out
    setTimeout(() => {
      setStage('done');
      if (onComplete) onComplete(); // Unlocks main website view
    }, 2800);
  };

  if (stage === 'done') return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-1000 bg-slate-950/70 backdrop-blur-md ${
      stage === 'revealing' ? 'opacity-0 pointer-events-none' : 'opacity-100'
    }`}>
      
      {/* Full Screen Envelope Container with 3D perspective */}
      <div className="relative w-[90vw] max-w-[420px] h-[600px] perspective-1200 flex items-center justify-center">

        {/* 1. Envelope Back Pocket (Uses your Canva paper texture) */}
        <div 
          className="absolute inset-0 rounded-xl shadow-2xl overflow-hidden border border-stone-300/30"
          style={{
            backgroundImage: 'url(/envelope-bg.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        ></div>

        {/* 2. Invitation Card Sliding Out */}
        <div className={`absolute w-[86%] h-[84%] bg-white rounded-lg shadow-xl p-6 flex flex-col justify-between items-center text-center transition-transform duration-1000 ease-in-out ${
          stage === 'revealing' ? '-translate-y-52 scale-105 shadow-2xl' : 'translate-y-6'
        }`} style={{ zIndex: 15 }}>
          <div className="border border-stone-200 inset-3 absolute rounded pointer-events-none"></div>
          <span className="font-serif text-xs tracking-widest text-stone-500 uppercase">Wedding Invitation</span>
          <h2 className="font-serif text-3xl text-stone-800">Jiv & Rochelle</h2>
          <p className="text-xs text-stone-600 tracking-wider">November 24, 2026</p>
        </div>

        {/* 3. Envelope Front V-Pocket Overlay */}
        <div 
          className="absolute inset-x-0 bottom-0 h-[55%] rounded-b-xl shadow-inner pointer-events-none"
          style={{
            backgroundImage: 'url(/envelope-bg.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            clipPath: 'polygon(0% 0%, 50% 45%, 100% 0%, 100% 100%, 0% 100%)',
            zIndex: 20
          }}
        ></div>

        {/* 4. Top Flap (3D Folding Animation) */}
        <div 
          className={`absolute top-0 inset-x-0 h-[52%] preserve-3d origin-top transition-transform duration-1000 ease-in-out ${
            stage !== 'sealed' ? 'rotate-x-180' : ''
          }`}
          style={{ zIndex: stage !== 'sealed' ? 10 : 30 }}
        >
          <div 
            className="absolute inset-0 backface-hidden shadow-md"
            style={{
              backgroundImage: 'url(/envelope-bg.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              clipPath: 'polygon(0 0, 100% 0, 50% 100%)'
            }}
          ></div>
        </div>

        {/* 5. Clickable Wax Seal / Button */}
        {stage === 'sealed' && (
          <button
            onClick={handleOpen}
            className="absolute left-1/2 top-[47%] -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full hover:scale-105 transition-transform cursor-pointer focus:outline-none group"
            style={{ zIndex: 40, background: 'transparent' }}
            aria-label="Open envelope"
          >
            <div className="w-full h-full rounded-full bg-amber-800/80 shadow-2xl flex items-center justify-center border-2 border-amber-600/50 text-amber-100 font-serif text-xl tracking-widest group-hover:bg-amber-700 transition-colors">
              JR
            </div>
          </button>
        )}

      </div>
    </div>
  );
}