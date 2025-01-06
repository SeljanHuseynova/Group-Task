import { useEffect, useState } from "react";
import { ICustomerData, Table } from "../model";
import TablesContainer from "./TablesContainer";
import TableModal from "./TableModal";
import { fetchTables } from "../redux/reservationSlice";
import { AppDispatch } from "../redux/store";
import { useDispatch } from "react-redux";
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

  return (
    <div className="tables-container">
      <div className="title">
        <h1>Book A Table</h1>
      </div>
      <TablesContainer openModal={openModal} />

      {/* Modal */}
      {isModal && (
        <TableModal
          selectedTable={selectedTable}
          customerData={customerData}
          setCustomerData={setCustomerData}
          setIsModal={setIsModal}
          closeModal={closeModal}
          isCancel={isCancel}
          errors={errors}
          setIsCancel={setIsCancel}
          setErrors={setErrors}
          dispatch={dispatch}
        />
      )}
    </div>
  );
};

export default Tables;
