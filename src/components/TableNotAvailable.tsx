import React from "react";
import { cancelReservation, fetchTables} from "../redux/reservationSlice";
import { toast } from "react-toastify";
import { GoArrowRight } from "react-icons/go";
import { AppDispatch } from "../redux/store";
import { ICustomerData, Table } from "../model";

interface ITablesNotAvailable {
  isCancel: boolean;
  validate: () => boolean;
  setIsCancel: React.Dispatch<React.SetStateAction<boolean>>;
  selectedTable: Table | null;
  dispatch: AppDispatch;
  setCustomerData: React.Dispatch<React.SetStateAction<ICustomerData>>;
  customerData: ICustomerData;
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
  errors: ICustomerData;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const TableNotAvailable: React.FC<ITablesNotAvailable> = ({
  isCancel,
  validate,
  setIsCancel,
  selectedTable,
  dispatch,
  setCustomerData,
  customerData,
  setIsModal,
  errors,
  handleChange,
}) => {
  const handleCancel = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    if (
      selectedTable?.name?.trim() === customerData.name &&
      selectedTable?.surname?.trim() === customerData.surname &&
      selectedTable?.phoneNumber?.trim() === customerData.phoneNumber
    ) {
      dispatch(cancelReservation({ tableId: selectedTable.id || 0 }))
        .then(() => {
          toast.success("Reservation canceled successfully!");
          dispatch(fetchTables());
          setCustomerData({ name: "", surname: "", phoneNumber: "" });
          setIsModal(false);
          setIsCancel(false);
        })
        .catch((error) => {
          console.error("Error cancelling reservation:", error);
          toast.error("Failed to cancel the reservation.");
        });
    } else {
      toast.error("Customer details do not match the reservation.");
    }
  };

  return (
    <div className="not-available">
      {isCancel ? (
        <form onSubmit={handleCancel}>
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
          <button className="cancel-btn">Cancel Reservation</button>
        </form>
      ) : (
        <>
          <p>This table is not available</p>
          <button onClick={() => setIsCancel(true)} className="cancel-btn">
            Cancel <GoArrowRight className="arrow" />
          </button>
        </>
      )}
    </div>
  );
};
export default TableNotAvailable;