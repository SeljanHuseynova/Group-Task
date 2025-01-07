import React from "react";
import tablePhoto from "../assets/images/table2.jpg";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useTablesContext } from "../context/TablesProvider";

const TablesContainer: React.FC = () => {
  const { openModal} = useTablesContext();
  const { tables, error, status } = useSelector((state: RootState) => state.rootReducer.reservation);
  return (
    <div className="tables row container g-4">
      {status === "loading" && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {tables?.map((table) => (
        <div className="col-6 col-lg-3" key={table.id}>
          <div className="table" onClick={() => openModal(table)}>
            <div className="overlay">
              <img src={tablePhoto} alt={`Table ${table.id}`} />
              <div className="status">
                {table.isReserved ? "Not Available" : "Available"}
              </div>
            </div>
          </div>
          <div className="tables-details">Table ID: {table.id}</div>
        </div>
      ))}
    </div>
  );
};

export default TablesContainer;
