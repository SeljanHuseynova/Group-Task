import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { AppDispatch } from "../redux/store";
import { toast } from "react-toastify";
import {
  bookATable,
  cancelReservation,
  fetchTables,
} from "../redux/reservationSlice";

import { ICustomerData, Table } from "../model";
import TablesContainer from "./TablesContainer";

import { GoArrowRight } from "react-icons/go";
const Tables = () => {
  const [isModal, setIsModal] = useState(false);
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);
  const [isCancel, setIsCancel] = useState<boolean>(false);
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

  useEffect(() => {
    dispatch(fetchTables());
  }, [dispatch]);
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
  const closeModal = () => {
    setIsModal(false);
    setSelectedTable(null);
    setIsCancel(false);
  };
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
          surname: customerData?.surname?.trim() || "",
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
          console.log("Reservation canceled successfully.");
          dispatch(fetchTables());
          setCustomerData({
            name: "",
            surname: "",
            phoneNumber: "",
          });
          setIsModal(false);
          setIsCancel(false);
        })
        .catch((error) => {
          console.error("Error cancelling reservation:", error);
        });
    } else {
      toast.error("Customer details do not match the reservation.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };
  return (
    <div className="tables-container">
      <div className="title">
        <h1>Book A Table</h1>
      </div>
      <TablesContainer openModal={openModal}/>

      {/* Modal */}
      {isModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-button" onClick={closeModal}>
              &times;
            </button>
            <span>Online Reservation</span>
            <h2>BOOK A TABLE</h2>
            <p>Table: {selectedTable?.id}</p>
            {selectedTable?.isReserved ? (
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
                    {errors.surname && (
                      <p className="error">{errors.surname}</p>
                    )}
                    <label>PhoneNumber</label>
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
                ) : (
                  <>
                    <p>This table is not available</p>
                    <button onClick={() => setIsCancel(true)} className="cancel-btn">
                      Cancel <GoArrowRight className="arrow" />
                    </button>
                  </>
                )}
              </div>
            ) : (
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
                  {errors.phoneNumber && (
                    <p className="error">{errors.phoneNumber}</p>
                  )}
                  <button>Book A Table</button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Tables;
