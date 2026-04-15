'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Search, 
  ShoppingBasket, 
  Flame, 
  Menu, 
  X, 
  ChevronDown, 
  Beer, 
  Wrench, 
  GlassWater, 
  Star, 
  Globe, 
  Truck 
} from 'lucide-react';
import { cn } from '@/lib/utils';

export function Header() {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={cn(
      "fixed top-0 w-full z-50 transition-all duration-300",
      isScrolled ? "shadow-2xl" : ""
    )}>
      {/* --- TOP BAR --- */}
      <div className="relative h-24 bg-[#6B0000] overflow-hidden border-b border-white/10">
        {/* Background Overlay with Banner Image */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/img/banner.png" 
            alt="header-bg" 
            fill 
            className="object-cover opacity-30 mix-blend-overlay"
          />
        </div>
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#6B0000] via-transparent to-[#6B0000]" />
        
        {/* Watermark logo center */}
        <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none opacity-5">
           <Image src="/img/log2.png" alt="watermark" width={300} height={300} className="object-contain grayscale invert" />
        </div>

        <div className="relative z-20 max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo (Gothic Display Style) */}
          <Link href="/" className="flex items-center space-x-3 group">
            <Image
              src="/img/logo.jpeg"
              width={60}
              height={60}
              alt="Mefisto Logo"
              className="rounded-full border-2 border-beer-500/20 shadow-lg"
              priority
            />
            <div className="flex flex-col">
              <span className="text-white text-2xl font-black tracking-tighter leading-none italic uppercase group-hover:text-beer-400 transition-colors">
                BEER HOUSE
              </span>
              <span className="text-beer-500 text-[10px] font-bold tracking-[0.3em] uppercase">
                BEER POINT
              </span>
            </div>
          </Link>

          {/* Right Controls */}
          <div className="flex items-center space-x-4 md:space-x-6">
            <Link href="#" className="hidden md:block text-[10px] font-bold text-white/70 hover:text-white uppercase tracking-widest transition-colors">
              INICIAR SESIÓN
            </Link>

            {/* Expansible Search Bar */}
            <div className={cn(
              "relative flex items-center bg-black/40 border border-white/20 rounded-full px-3 py-1.5 transition-all duration-300",
              isSearchFocused ? "w-48 md:w-64 border-beer-500" : "w-32 md:w-40"
            )}>
              <Search className="w-4 h-4 text-white/50" />
              <input 
                type="text"
                placeholder="BUSCAR..."
                className="bg-transparent border-none text-[10px] text-white placeholder:text-white/30 focus:ring-0 w-full ml-2 uppercase"
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
            </div>

            {/* Custom Flame/Basket Icon */}
            <button className="relative group p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors">
              <ShoppingBasket className="w-5 h-5 md:w-6 md:h-6 text-white" />
              <div className="absolute -top-1 -right-1">
                <Flame className="w-3 h-3 md:w-4 md:h-4 text-orange-500 fill-orange-500 animate-pulse" />
              </div>
              <span className="absolute -top-1 -right-1 bg-[#8B0000] text-[9px] font-bold text-white w-4 h-4 rounded-full flex items-center justify-center border border-white/20">
                0
              </span>
            </button>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-white p-1"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* --- BOTTOM NAVIGATION BAR --- */}
      <nav className="hidden md:block bg-[#4A0000] border-b border-black/20 shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <ul className="flex items-center justify-center space-x-8 text-white py-3">
            <NavItem label="CERVEZAS" icon={<Beer size={14} />} hasDropdown />
            <NavItem label="ACCESORIOS" icon={<Wrench size={14} />} hasDropdown />
            <NavItem label="OTRAS BEBIDAS" icon={<GlassWater size={14} />} />
            <NavItem label="PROMO Y PACKS" icon={<Star size={14} />} />
            <NavItem label="ORIGEN" icon={<Globe size={14} />} hasDropdown />
            <NavItem label="IMPORTADORES" icon={<Truck size={14} />} />
          </ul>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      <div className={cn(
        "md:hidden fixed inset-0 z-40 bg-[#4A0000] transition-transform duration-500 ease-in-out pt-24 px-6",
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <ul className="space-y-6 flex flex-col uppercase font-black text-sm tracking-widest text-white/90">
          <li><Link href="#" className="flex items-center space-x-4 border-b border-white/10 pb-4"><Beer className="text-beer-500" /> <span>Cervezas</span></Link></li>
          <li><Link href="#" className="flex items-center space-x-4 border-b border-white/10 pb-4"><Wrench className="text-beer-500" /> <span>Accesorios</span></Link></li>
          <li><Link href="#" className="flex items-center space-x-4 border-b border-white/10 pb-4"><GlassWater className="text-beer-500" /> <span>Otras Bebidas</span></Link></li>
          <li><Link href="#" className="flex items-center space-x-4 border-b border-white/10 pb-4"><Star className="text-beer-500" /> <span>Promo y Packs</span></Link></li>
          <li><Link href="#" className="flex items-center space-x-4 border-b border-white/10 pb-4"><Globe className="text-beer-500" /> <span>Origen</span></Link></li>
          <li className="pt-6"><Link href="#" className="text-xs text-white/50 block text-center uppercase tracking-widest">Iniciar Sesión</Link></li>
        </ul>
      </div>
    </header>
  );
}

function NavItem({ label, icon, hasDropdown = false }: { label: string; icon: React.ReactNode; hasDropdown?: boolean }) {
  return (
    <li className="group relative">
      <Link 
        href="#" 
        className="flex items-center space-x-2 text-[10px] font-black tracking-widest hover:text-beer-500 transition-colors py-1"
      >
        <span className="text-beer-500">{icon}</span>
        <span>{label}</span>
        {hasDropdown && <ChevronDown size={10} className="ml-1 opacity-50 group-hover:rotate-180 transition-transform" />}
      </Link>
      
      {hasDropdown && (
        <div className="absolute top-full left-0 mt-3 w-48 bg-[#300000] border border-white/10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0 shadow-2xl z-[100]">
          <div className="flex flex-col p-2">
            <Link href="#" className="px-4 py-3 text-[9px] font-bold hover:bg-white/5 transition-colors border-b border-white/5 uppercase tracking-widest">Novedades</Link>
            <Link href="#" className="px-4 py-3 text-[9px] font-bold hover:bg-white/5 transition-colors border-b border-white/5 uppercase tracking-widest">Más Populares</Link>
            <Link href="#" className="px-4 py-3 text-[9px] font-bold hover:bg-white/5 transition-colors uppercase tracking-widest">Ver todo</Link>
          </div>
        </div>
      )}
    </li>
  );
}