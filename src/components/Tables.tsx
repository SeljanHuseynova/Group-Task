import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { RootState, AppDispatch } from "../redux/store";
import { fetchTables } from "../redux/reservationSlice";
import tablePhoto from "../assets/images/table.jpeg";
import { Table } from "../model";

const Tables = () => {
  const [isModal, setIsModal] = useState(false);
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const { tables, error, status } = useSelector(
    (state: RootState) => state.reservation
  );

  useEffect(() => {
    dispatch(fetchTables());
  }, [dispatch]);

  const openModal = (table: Table) => {
    setSelectedTable(table);
    setIsModal(true);
  };

  const closeModal = () => {
    setIsModal(false);
    setSelectedTable(null);
  };

  return (
    <div className="tables-container">
      <div className="title">
        <h1>Book A Table</h1>
      </div>
      <div className="tables row container g-4">
        {status === "loading" && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {tables?.map((table) => (
          <div className="col-6 col-lg-3" key={table.id}>
            <div className="table" onClick={() => openModal(table)}>
              <div className="overlay">
                <img src={tablePhoto} alt={`Table ${table.id}`} />
              </div>
            </div>
            <div className="tables-details">
              <p>Table: {table.id}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-button" onClick={closeModal}>
              &times;
            </button>
            <h2>Table Details</h2>
            <p>Selected Table ID: {selectedTable?.id}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tables;
