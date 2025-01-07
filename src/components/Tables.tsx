import React, { useEffect } from "react";
import TablesContainer from "./TablesContainer";
import TableModal from "./TableModal";
import { fetchTables } from "../redux/reservationSlice";
import { useTablesContext } from "../context/TablesProvider";
import "aos/dist/aos.css"; 
import AOS from "aos"; 

const Tables: React.FC = () => {
  const { isModal, dispatch } = useTablesContext();

  useEffect(() => {
    dispatch(fetchTables());
    AOS.init(); 
  }, [dispatch]);

  return (
    <div className="tables-container">
      <div className="title">
        <h1 data-aos="fade-up">Book A Table</h1> 
      </div>
      <TablesContainer />

      {isModal && <TableModal />}
    </div>
  );
};

export default Tables;
