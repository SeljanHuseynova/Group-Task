import React from "react";
import { useTablesContext } from "../context/TablesProvider";
import { toast } from "react-toastify";
import { bookATable, fetchTables } from "../redux/reservationSlice";

const AvailableTable: React.FC = () => {
  const {
    validate,
    handleChange,
    dispatch,
    selectedTable,
    customerData,
    setCustomerData,
    closeModal,
  } = useTablesContext();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    toast.success("Reservation was successful!");

    dispatch(
      bookATable({
        tableId: selectedTable?.id || 0,
        customerData: {
          name: customerData?.name?.trim(),  // look at this point too
          surname: customerData?.surname?.trim(),
          phoneNumber: customerData?.phoneNumber?.trim(),
        },
      })
    )
      .then(() => {
        dispatch(fetchTables());
        setCustomerData({ name: "", surname: "", phoneNumber: "" });
        closeModal();
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
        <label>Surname</label>
        <input
          type="text"
          name="surname"
          onChange={handleChange}
          value={customerData.surname || ""}
        />
        <label>Phone Number</label>
        <input
          type="text"
          name="phoneNumber"
          onChange={handleChange}
          value={customerData.phoneNumber || ""}
        />
        <button type="submit">Book A Table</button>
      </form>
    </div>
  );
};

export default AvailableTable;
