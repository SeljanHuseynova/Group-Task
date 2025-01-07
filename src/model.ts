import { AppDispatch } from "./redux/store";

export interface ICustomerData {
  name?: string; 
  surname?: string; 
  phoneNumber?: string; 
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

export interface ITablesContextProps {
  isModal: boolean;
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
  selectedTable: Table | null ;
  setSelectedTable: React.Dispatch<React.SetStateAction<Table | null>>;
  isCancel: boolean;
  setIsCancel: React.Dispatch<React.SetStateAction<boolean>>;
  customerData: ICustomerData;
  setCustomerData: React.Dispatch<React.SetStateAction<ICustomerData>>;
  errors: ICustomerData;
  setErrors: React.Dispatch<React.SetStateAction<ICustomerData>>;
  dispatch: AppDispatch;
  closeModal: () => void;
  openModal: (table: Table) => void;
  validate: () => boolean;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

