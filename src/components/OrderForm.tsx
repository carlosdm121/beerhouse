'use client';

import { useState } from "react";
import { OrderFormValues } from "@/types";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { Modal } from "./ui/Modal";
import { cn } from "@/lib/utils";
import { BEERS } from "@/constants/beers";

export function OrderForm() {
  const [formData, setFormData] = useState<OrderFormValues>({
    name: "",
    email: "",
    phone: "",
    address: "",
    beerId: BEERS[0]?.id ?? 1,
    quantity: 1,
    notes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "quantity" || name === "beerId" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowThankYou(true);
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
        beerId: BEERS[0]?.id ?? 1,
        quantity: 1,
        notes: "",
      });
    }, 1500);
  };

  return (
    <section id="formulario" className="py-12 bg-beer-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-card p-8">
          <h2 className="text-3xl font-bold text-center text-beer-900 mb-8">
            Envíanos tu pedido
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                label="Nombre completo"
                name="name"
                placeholder="Juan Pérez"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <Input
                label="Correo electrónico"
                name="email"
                type="email"
                placeholder="juan@ejemplo.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <Input
                label="Teléfono / WhatsApp"
                name="phone"
                type="tel"
                placeholder="+54 9 381 000-0000"
                value={formData.phone}
                onChange={handleChange}
                required
              />
              <Input
                label="Dirección de entrega"
                name="address"
                placeholder="Calle Falsa 123, Tucumán"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                  Cerveza elegida
                </label>
                <select
                  name="beerId"
                  value={formData.beerId}
                  onChange={handleChange}
                  className={cn(
                    "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                    "disabled:cursor-not-allowed disabled:opacity-50"
                  )}
                  required
                >
                  {BEERS.map((beer) => (
                    <option key={beer.id} value={beer.id}>
                      {beer.brand} - {beer.name} (${beer.price})
                    </option>
                  ))}
                </select>
              </div>
              <Input
                label="Cantidad (unidades)"
                name="quantity"
                type="number"
                min={1}
                value={formData.quantity}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Notas adicionales (opcional)
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                className={cn(
                  "flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                  "disabled:cursor-not-allowed disabled:opacity-50"
                )}
                placeholder="Instrucciones especiales para la entrega..."
                rows={4}
              />
            </div>

            <div className="pt-4 flex justify-center">
              <Button 
                variant="primary" 
                type="submit" 
                loading={isSubmitting}
                className="w-full sm:w-auto min-w-[200px]"
              >
                Enviar Pedido
              </Button>
            </div>
          </form>
        </div>
      </div>
      <Modal open={showThankYou} onClose={() => setShowThankYou(false)} title="¡Gracias por tu pedido!">
        <div className="text-center space-y-4">
          <p className="text-gray-600">
            Hemos recibido tu pedido correctamente. Un representante de <span className="font-bold text-beer-900">Beer House</span> se pondrá en contacto contigo vía WhatsApp o email para coordinar la entrega y el pago.
          </p>
          <div className="mt-6 flex justify-center">
            <Button variant="secondary" onClick={() => setShowThankYou(false)}>
              Entendido
            </Button>
          </div>
        </div>
      </Modal>
    </section>
  );
}