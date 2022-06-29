export interface Subscriber {
  id: string;
  name?: string;
  phone?: string;
  ordersRef?: string[];
  homeAddress?: string;
  registrDate?: Date;
  description?: string;
}
