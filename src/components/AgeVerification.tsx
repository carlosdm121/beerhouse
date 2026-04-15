'use client';

import { useState, useEffect } from 'react';
import { Button } from './ui/Button';

export function AgeVerification() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Comprobar si ya ha verificado su edad
    const isVerified = localStorage.getItem('age-verified-mefisto');
    if (!isVerified) {
      setShow(true);
      // Bloquear el scroll del cuerpo mientras el modal está activo
      document.body.style.overflow = 'hidden';
    }
  }, []);

  const handleVerify = () => {
    localStorage.setItem('age-verified-mefisto', 'true');
    document.body.style.overflow = 'auto';
    setShow(false);
  };

  const handleExit = () => {
    window.location.href = 'https://www.google.com';
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-xl p-4">
      {/* Tarjeta del Modal */}
      <div className="relative bg-[#8B0000] max-w-lg w-full rounded-[2rem] p-12 text-center shadow-[0_0_50px_rgba(139,0,0,0.5)] border border-white/10 overflow-hidden">
        
        {/* Marca de Agua: Pirámide Illuminati (SVG centrado con baja opacidad) */}
        <div className="absolute inset-0 z-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
          <svg viewBox="0 0 200 200" className="w-[120%] h-[120%] fill-white">
            <path d="M100 20 L180 160 L20 160 Z M100 60 C110 60 118 68 118 78 C118 88 110 96 100 96 C90 96 82 88 82 78 C82 68 90 60 100 60 Z" />
            <circle cx="100" cy="78" r="5" />
          </svg>
        </div>

        <div className="relative z-10">
          {/* Logo Estilo Gótico */}
          <div className="mb-10">
            <h1 className="text-white text-5xl font-black tracking-tighter leading-none italic uppercase drop-shadow-lg">
              BEER HOUSE
            </h1>
            <p className="text-white/60 text-xs font-bold tracking-[0.5em] mt-2 uppercase">
              BEER POINT
            </p>
          </div>

          {/* Pregunta elegante Serif */}
          <h2 className="text-white text-2xl font-serif italic mb-10 tracking-wide">
            ¿Sos mayor de 18 años?
          </h2>

          {/* Botones */}
          <div className="flex flex-row gap-4 justify-center">
            <button 
              onClick={handleVerify}
              className="flex-1 bg-white text-[#8B0000] font-black py-4 rounded-xl hover:bg-gray-100 transition-all active:scale-95 text-lg uppercase tracking-widest shadow-xl"
            >
              SI
            </button>
            <button 
              onClick={handleExit}
              className="flex-1 bg-transparent border-2 border-white text-white font-black py-4 rounded-xl hover:bg-white/10 transition-all active:scale-95 text-lg uppercase tracking-widest"
            >
              NO
            </button>
          </div>

          <p className="mt-10 text-[9px] text-white/30 uppercase font-bold tracking-[0.3em]">
            Beber con moderación. Prohibida su venta a menores de 18 años.
          </p>
        </div>
      </div>
    </div>
  );
}