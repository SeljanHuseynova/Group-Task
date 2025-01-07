import React, { useEffect } from "react";
import { useTablesContext } from "../context/TablesProvider";
import TableNotAvailable from "./TableNotAvailable";
import AvailableTable from "./AvailableTable";
import AOS from "aos";
import "aos/dist/aos.css"; 

const TableModal: React.FC = () => {
  const { selectedTable, closeModal } = useTablesContext();

  useEffect(() => {
    AOS.init({
      duration: 500, 
      easing: "ease-out-cubic", 
    });
  }, []);

  return (
    <div className="modal-overlay" data-aos="fade-in">
      <div className="modal-content" data-aos="zoom-in">
        <button className="close-button" onClick={closeModal}>
          &times;
        </button>
        <span>Online Reservation</span>
        <h2>BOOK A TABLE</h2>
        <p className="table-id">Table: {selectedTable?.id}</p>
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
