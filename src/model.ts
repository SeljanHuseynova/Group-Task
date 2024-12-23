export interface Table {
  id: number;
  isReserved: boolean;
  reservedPersonName: string | null;
  reservedPersonSurname: string | null;
  phoneNumber: string | null;
}

export interface Meals {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
}
