export interface ICustomerData {
  name: string | null;
  surname?: string | null;
  phoneNumber: string | null;
}
export interface Table extends ICustomerData {
  id: number;
  isReserved: boolean;
}
