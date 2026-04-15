'use client';

import Image from "next/image";
import Link from "next/link";
import { 
  Camera, 
  Share2, 
  MessageCircle, 
  Music2, 
  ArrowRight 
} from "lucide-react";

export function Footer() {
  return (
    <footer className="relative bg-[#6B0000] text-white overflow-hidden border-t border-white/20">
      {/* --- MANTENER FONDO EXISTENTE (NO MODIFICAR) --- */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/img/banner.png" 
          alt="footer-bg" 
          fill 
          className="object-cover opacity-30 mix-blend-overlay"
        />
      </div>
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#6B0000] via-transparent to-[#6B0000]" />
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none opacity-5">
         <Image src="/img/log2.png" alt="watermark" width={500} height={500} className="object-contain grayscale invert" />
      </div>
      {/* --- FIN FONDO EXISTENTE --- */}

      <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          {/* COLUMNA 1: IDENTIDAD */}
          <div className="flex flex-col space-y-6">
            <Link href="/" className="flex flex-col group">
              <span className="text-white text-3xl font-black tracking-tighter leading-none italic uppercase">
                BEER HOUSE
              </span>
              <span className="text-white/60 text-[10px] font-bold tracking-[0.4em] uppercase ml-1">
                BEER POINT
              </span>
            </Link>
            <p className="text-white/70 text-sm leading-relaxed max-w-xs">
              Tu destino definitivo para las mejores cervezas artesanales e importadas. Pasión por la malta en cada entrega.
            </p>
            <div className="flex flex-wrap gap-x-2 gap-y-1 text-[10px] text-white/40 uppercase font-bold tracking-widest pt-4">
              <span>© 2026</span>
              <span>|</span>
              <Link href="#" className="hover:text-white transition-colors">Privacidad</Link>
              <span>|</span>
              <Link href="#" className="hover:text-white transition-colors">Términos</Link>
              <span>|</span>
              <Link href="#" className="hover:text-white transition-colors">Contacto</Link>
            </div>
          </div>

          {/* COLUMNA 2: REDES Y NAV */}
          <div className="flex flex-col space-y-6 text-left">
            <h3 className="text-sm font-black tracking-[0.2em] uppercase">Seguinos</h3>
            <div className="flex space-x-3">
              <SocialIcon icon={<Camera size={18} />} href="#" title="Instagram" />
              <SocialIcon icon={<Share2 size={18} />} href="#" title="Facebook" />
              <SocialIcon icon={<MessageCircle size={18} />} href="#" title="WhatsApp" />
              <SocialIcon icon={<Music2 size={18} />} href="#" title="TikTok" />
            </div>
            <ul className="flex flex-col space-y-3 pt-2">
              <FooterLink href="/">Inicio</FooterLink>
              <FooterLink href="#cervezas">Cervezas</FooterLink>
              <FooterLink href="#accesorios">Accesorios</FooterLink>
              <FooterLink href="#promos">Promos</FooterLink>
              <FooterLink href="#contacto">Contacto</FooterLink>
            </ul>
          </div>

          {/* COLUMNA 3: MAYORISTAS */}
          <div className="flex flex-col space-y-6">
            <h3 className="text-sm font-black tracking-[0.2em] uppercase">¿Querés Mayorista?</h3>
            <p className="text-white/70 text-sm italic leading-snug">
              Potenciá tu negocio con nuestro catálogo exclusivo para bares y revendedores.
            </p>
            <Link 
              href="#" 
              className="inline-flex items-center justify-center border-2 border-white px-6 py-3 text-xs font-black uppercase tracking-widest hover:bg-white hover:text-[#6B0000] transition-all duration-500 rounded-sm"
            >
              Contactar Ventas
            </Link>
            <Link href="#" className="group flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest text-white/60 hover:text-white transition-colors">
              <span>Conocé nuestras promos</span>
              <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* COLUMNA 4: INFORMACIÓN */}
          <div className="flex flex-col space-y-6">
            <h3 className="text-sm font-black tracking-[0.2em] uppercase">Información</h3>
            <div className="grid grid-cols-2 gap-4">
              <ul className="flex flex-col space-y-3">
                <FooterLink href="#">Envíos</FooterLink>
                <FooterLink href="#">Devoluciones</FooterLink>
                <FooterLink href="#">FAQ</FooterLink>
                <FooterLink href="#">Nosotros</FooterLink>
              </ul>
              <ul className="flex flex-col space-y-3">
                <FooterLink href="#">Blog</FooterLink>
                <FooterLink href="#">Maridajes</FooterLink>
                <FooterLink href="#">Novedades</FooterLink>
                <FooterLink href="#">Trabajo</FooterLink>
              </ul>
            </div>
          </div>

        </div>
      </div>

      {/* BARRA DE ADVERTENCIA LEGAL */}
      <div className="relative z-20 bg-black/20 py-3 border-t border-white/5">
        <p className="text-center text-[9px] font-black uppercase tracking-[0.4em] text-white/30">
          Beber con moderación. Prohibida su venta a menores de 18 años. Ley 24.788
        </p>
      </div>
    </footer>
  );
}

function SocialIcon({ icon, href, title }: { icon: React.ReactNode; href: string; title: string }) {
  return (
    <Link 
      href={href} 
      title={title}
      className="w-10 h-10 flex items-center justify-center rounded-full border border-white/30 hover:bg-white hover:text-[#6B0000] transition-all duration-300"
    >
      {icon}
    </Link>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link 
        href={href} 
        className="text-[11px] font-bold uppercase tracking-widest text-white/60 hover:text-white hover:pl-1 transition-all duration-300"
      >
        {children}
      </Link>
    </li>
  );
}