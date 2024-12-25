export interface ICustomerData {
  name: string | null;
  surname?: string | null;
  phoneNumber: string | null;
}
export interface Table extends ICustomerData {
  id: number;
  isReserved: boolean;
}

export interface Meals {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
}

export interface IContact {
  name:string;
  email:string;
  phoneNumber:string;
  message:string;

}

export interface IRequest  extends IContact{
  id:number;
}

