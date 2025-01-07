import React from "react";
import { useTablesContext } from "../context/TablesProvider";
import TableNotAvailable from "./TableNotAvailable";
import AvailableTable from "./AvailableTable";

const TableModal: React.FC = () => {
  const { selectedTable, closeModal } = useTablesContext();

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
          <TableNotAvailable />
        ) : (
          <AvailableTable />
        )}
      </div>
    </div>
  );
};

export default TableModal;
