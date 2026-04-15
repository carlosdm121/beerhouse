import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { BeerGrid } from "@/components/BeerGrid";
import { PaymentIcons } from "@/components/PaymentIcons";
import { OrderForm } from "@/components/OrderForm";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <section id="cervezas" className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-beer-900 mb-8">
              Nuestra Selección de Cervezas
            </h2>
            <BeerGrid />
          </div>
        </section>
        <PaymentIcons />
        <OrderForm />
      </main>
      <Footer />
    </>
  );
}