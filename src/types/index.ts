export interface Beer {
  id: number;
  name: string;
  brand: string;
  description: string;
  price: number; // in ARS
  imageUrl: string;
  alcoholContent: number; // percentage
  type: string; // e.g., Lager, IPA, Stout
}

export interface OrderFormValues {
  name: string;
  email: string;
  phone: string;
  address: string;
  beerId: number;
  quantity: number;
  notes?: string;
}