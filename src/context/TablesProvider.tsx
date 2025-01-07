import React, { createContext, useContext, useState } from "react";
import { ICustomerData, ITablesContextProps, Table } from "../model";
import { AppDispatch } from "../redux/store";
import { useDispatch } from "react-redux";

const TablesContext = createContext<ITablesContextProps | undefined>(undefined);

const TablesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isModal, setIsModal] = useState(false);
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);
  const [isCancel, setIsCancel] = useState(false);
  const [customerData, setCustomerData] = useState<ICustomerData>({
    name: "",
    surname: "",
    phoneNumber: "",
  });
  const [errors, setErrors] = useState<ICustomerData>({
    name: "",
    surname: "",
    phoneNumber: "",
  });
  const dispatch = useDispatch<AppDispatch>();

  const closeModal = () => {
    setIsModal(false);
    setSelectedTable(null);
    setIsCancel(false);
  };

  const openModal = (table: Table) => {
    setSelectedTable(table);
    setIsModal(true);
    setCustomerData({
      name: "",
      surname: "",
      phoneNumber: "",
    });
    setErrors({
      name: "",
      surname: "",
      phoneNumber: "",
    });
  };

  const validate = (): boolean => {
    const newErrors = { name: "", surname: "", phoneNumber: "" };
    const nameRegex = /^[A-Za-z]+$/;
    const phoneRegex = /^\+994\d{9}$/;

    if (!customerData.name || !nameRegex.test(customerData?.name)) {
      newErrors.name = "Name must contain only letters.";
    }
    if (!customerData.surname || !nameRegex.test(customerData?.surname)) {
      newErrors.surname = "Surname must contain only letters.";
    }
    if (
      !customerData.phoneNumber ||
      !phoneRegex.test(customerData?.phoneNumber)
    ) {
      newErrors.phoneNumber =
        "Phone number must be in the format +994XXXXXXXXX.";
    }

    setErrors(newErrors);

    return !newErrors.name && !newErrors.surname && !newErrors.phoneNumber;
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCustomerData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  return (
    <TablesContext.Provider
      value={{
        isModal,
        setIsModal,
        selectedTable,
        setSelectedTable,
        isCancel,
        setIsCancel,
        customerData,
        setCustomerData,
        errors,
        setErrors,
        dispatch,
        closeModal,
        openModal,
        validate,
        handleChange,
      }}
    >
      {children}
    </TablesContext.Provider>
  );
};

export default TablesProvider;

export const useTablesContext = () => {
  const context = useContext(TablesContext);
  if (!context) {
    throw new Error("useTablesContext must be used within a TablesProvider");
  }
  return context;
};
