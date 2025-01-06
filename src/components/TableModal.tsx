import React from "react";
import { ICustomerData, Table } from "../model";
import { AppDispatch } from "../redux/store";
import TableNotAvailable from "./TableNotAvailable";
import AvailableTable from "./AvailableTable";

interface TableModalProps {
  selectedTable: Table | null;
  customerData: ICustomerData;
  setCustomerData: React.Dispatch<React.SetStateAction<ICustomerData>>;
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
  closeModal: () => void;
  isCancel: boolean;
  errors: ICustomerData;
  setErrors: React.Dispatch<React.SetStateAction<ICustomerData>>;
  setIsCancel: React.Dispatch<React.SetStateAction<boolean>>;
  dispatch: AppDispatch;
}

const TableModal: React.FC<TableModalProps> = ({
  selectedTable,
  customerData,
  setCustomerData,
  setIsModal,
  closeModal,
  isCancel,
  errors,
  setIsCancel,
  setErrors,
  dispatch,
}) => {
  const validate = () => {
    const newErrors: ICustomerData = { name: "", surname: "", phoneNumber: "" };
    const nameRegex = /^[A-Za-z]+$/;
    const phoneRegex = /^\+994\d{9}$/;

    if (!customerData.name || !nameRegex.test(customerData.name)) {
      newErrors.name = "Name must contain only letters.";
    }
    if (!customerData.surname || !nameRegex.test(customerData.surname)) {
      newErrors.surname = "Surname must contain only letters.";
    }
    if (
      !customerData.phoneNumber ||
      !phoneRegex.test(customerData.phoneNumber)
    ) {
      newErrors.phoneNumber =
        "Phone number must be in the format +994XXXXXXXXX.";
    }

    setErrors(newErrors);
    const hasNoErrors =
      !newErrors.name && !newErrors.surname && !newErrors.phoneNumber;

    return hasNoErrors;
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
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={closeModal}>
          &times;
        </button>
        <span>Online Reservation</span>
        <h2>BOOK A TABLE</h2>
        <p>Table: {selectedTable?.id}</p>
        {selectedTable?.isReserved ? (
          <TableNotAvailable
            isCancel={isCancel}
            validate={validate}
            setIsCancel={setIsCancel}
            selectedTable={selectedTable}
            dispatch={dispatch}
            setCustomerData={setCustomerData}
            customerData={customerData}
            setIsModal={setIsModal}
            errors={errors}
            handleChange={handleChange}
          />
        ) : (
          <AvailableTable
            validate={validate}
            dispatch={dispatch}
            selectedTable={selectedTable}
            customerData={customerData}
            setCustomerData={setCustomerData}
            setIsModal={setIsModal}
            errors={errors}
            handleChange={handleChange}
          />
        )}
      </div>
    </div>
  );
};

export default TableModal;
