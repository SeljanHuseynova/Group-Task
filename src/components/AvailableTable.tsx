import React from "react";
import { toast } from "react-toastify";
import { bookATable, fetchTables } from "../redux/reservationSlice";
import { AppDispatch } from "../redux/store";
import { ICustomerData, Table } from "../model";

interface TableAvailableProps {
  validate: () => boolean;
  dispatch: AppDispatch;
  selectedTable: Table | null;
  customerData: ICustomerData;
  setCustomerData: React.Dispatch<React.SetStateAction<ICustomerData>>;
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
  errors: ICustomerData;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
const AvailableTable: React.FC<TableAvailableProps> = ({
  validate,
  dispatch,
  selectedTable,
  customerData,
  setCustomerData,
  setIsModal,
  errors,
  handleChange,
}) => {
    
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    toast.success("Reservation was successful!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

    dispatch(
      bookATable({
        tableId: selectedTable?.id || 0,
        customerData: {
          name: customerData?.name?.trim() || "",
          surname: customerData?.surname?.trim(),
          phoneNumber: customerData?.phoneNumber?.trim() || "",
        },
      })
    )
      .then(() => {
        dispatch(fetchTables());
        setCustomerData({
          name: "",
          surname: "",
          phoneNumber: "",
        });
        setIsModal(false);
      })
      .catch((error) => {
        console.error("Error booking table:", error);
      });
  };

  return (
    <div className="available">
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          type="text"
          name="name"
          onChange={handleChange}
          value={customerData.name || ""}
        />
        {errors.name && <p className="error">{errors.name}</p>}

        <label>Surname</label>
        <input
          type="text"
          name="surname"
          onChange={handleChange}
          value={customerData.surname || ""}
        />
        {errors.surname && <p className="error">{errors.surname}</p>}

        <label>PhoneNumber</label>
        <input
          name="phoneNumber"
          type="text"
          onChange={handleChange}
          value={customerData.phoneNumber || ""}
        />
        {errors.phoneNumber && <p className="error">{errors.phoneNumber}</p>}

        <button type="submit">Book A Table</button>
      </form>
    </div>
  );
};

export default AvailableTable;
