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
    errors,
  } = useTablesContext();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) {
      toast.error("Please correct the errors in the form.");
      return;
    }

    toast.success("Reservation was successful!");
    if (selectedTable) {
      dispatch(
        bookATable({
          tableId: selectedTable?.id,
          customerData: {
            name: customerData?.name?.trim(),
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
          toast.error("An error occurred while booking the table.");
        });
    }
  };

  return (
    <div className="available">
      <p>*Please do not forgot your details.</p>
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

        <label>Phone Number</label>
        <input
          type="text"
          name="phoneNumber"
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
