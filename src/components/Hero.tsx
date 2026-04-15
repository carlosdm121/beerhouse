import Image from "next/image";

export function Hero() {
  return (
    <section className="relative bg-black h-[600px] flex items-center overflow-hidden">
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center bg-black/40 py-12 backdrop-blur-sm rounded-3xl border border-white/10">
        <h2 className="text-5xl font-black text-white sm:text-7xl tracking-tighter drop-shadow-2xl">
          BIENVENIDO A <span className="text-beer-500">BEER HOUSE</span>
        </h2>
        <p className="mt-6 text-xl text-beer-50 max-w-2xl mx-auto font-medium drop-shadow-lg">
          La mejor selección de cervezas artesanales de Tucumán y el país. 
          Tradición y pasión en cada vaso.
        </p>
      </div>
      {/* Decorative background image */}
      <div className="absolute inset-0 z-10">
        <Image
          src="/img/banner.png"
          alt="Banner Beer House"
          className="object-cover opacity-80"
          fill
          priority
        />
      </div>
    </section>
  );
}