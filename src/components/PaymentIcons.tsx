import Image from "next/image";

export function PaymentIcons() {
  return (
    <section id="pagos" className="py-12 bg-beer-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-beer-900 mb-8">
          Medios de Pago
        </h2>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {/* Visa */}
          <div className="relative w-16 h-10">
            <Image
              src="/img/visa.png"
              alt="Visa"
              fill
              className="object-contain"
            />
          </div>
          {/* Mastercard */}
          <div className="relative w-16 h-10">
            <Image
              src="/img/mastercard.png"
              alt="Mastercard"
              fill
              className="object-contain"
            />
          </div>
          {/* Mercado Pago */}
          <div className="relative w-24 h-10">
            <Image
              src="/img/MercadoPago.svg"
              alt="Mercado Pago"
              fill
              className="object-contain"
            />
          </div>
          {/* Go Cuotas */}
          <div className="relative w-20 h-10">
            <Image
              src="/img/gocuotas.png"
              alt="Go Cuotas"
              fill
              className="object-contain"
            />
          </div>
          {/* Rapipago */}
          <div className="relative w-20 h-10">
            <Image
              src="/img/rapipago.png"
              alt="Rapipago"
              fill
              className="object-contain"
            />
          </div>
          {/* Pago Fácil */}
          <div className="relative w-20 h-10">
            <Image
              src="/img/pagofacil.png"
              alt="Pago Fácil"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}