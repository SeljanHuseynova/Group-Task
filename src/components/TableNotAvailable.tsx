import React, { useEffect } from "react";
import { useTablesContext } from "../context/TablesProvider";
import { toast } from "react-toastify";
import { cancelReservation, fetchTables } from "../redux/reservationSlice";
import { IoIosArrowForward } from "react-icons/io";
import AOS from "aos";
import "aos/dist/aos.css";

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
    errors,
  } = useTablesContext();

  useEffect(() => {
    AOS.init({
      duration: 500,
      easing: "ease-in-out",
    });
  }, []);

  const handleCancel = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) {
      toast.error("Please correct the errors in the form.");
      return;
    }

    if (
      selectedTable &&
      selectedTable.name?.trim() === customerData.name?.trim() &&
      selectedTable.surname?.trim() === customerData.surname?.trim() &&
      selectedTable.phoneNumber?.trim() === customerData.phoneNumber?.trim()
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
      toast.error("This table is not reserved under this name.");
    }
  };

  return (
    <div className="not-available">
      {isCancel ? (
        <>
          <h5>Enter the details you provided during the reservation.</h5>

          <form onSubmit={handleCancel} data-aos="fade-up">
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
              name="phoneNumber"
              type="text"
              onChange={handleChange}
              value={customerData.phoneNumber || ""}
            />
            {errors.phoneNumber && (
              <p className="error">{errors.phoneNumber}</p>
            )}

            <button className="cancel-btn">Cancel Reservation</button>
          </form>
        </>
      ) : (
        <>
          <p>This table is not available</p>
          <button onClick={() => setIsCancel(true)} className="cancel-btn">
            Cancel <IoIosArrowForward className="arrow" />
          </button>
        </>
      )}
    </div>
  );
};

export default TableNotAvailable;
