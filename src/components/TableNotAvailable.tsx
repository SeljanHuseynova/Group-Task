import React from "react";
import { useTablesContext } from "../context/TablesProvider";
import { toast } from "react-toastify";
import { cancelReservation, fetchTables } from "../redux/reservationSlice";

const TableNotAvailable: React.FC = () => {
  const {
    validate,
    handleChange,
    isCancel,
    setIsCancel,
    selectedTable,
    dispatch,
    customerData,
    setCustomerData,
    closeModal,
  } = useTablesContext();

  const handleCancel = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    if (
      selectedTable &&
      selectedTable?.name?.trim() === customerData.name &&
      selectedTable?.surname?.trim() === customerData.surname &&
      selectedTable?.phoneNumber?.trim() === customerData.phoneNumber
    ) {
      dispatch(cancelReservation({ tableId: selectedTable.id }))
        .then(() => {
          toast.success("Reservation canceled successfully!");
          dispatch(fetchTables());
          setCustomerData({ name: "", surname: "", phoneNumber: "" });
          closeModal();
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
          <label>Surname</label>
          <input
            type="text"
            name="surname"
            onChange={handleChange}
            value={customerData.surname || ""}
          />
          <label>PhoneNumber</label>
          <input
            name="phoneNumber"
            type="text"
            onChange={handleChange}
            value={customerData.phoneNumber || ""}
          />
          <button className="cancel-btn">Cancel Reservation</button>
        </form>
      ) : (
        <>
          <p>This table is not available</p>
          <button onClick={() => setIsCancel(true)} className="cancel-btn">
            Cancel
          </button>
        </>
      )}
    </div>
  );
};

export default TableNotAvailable;
