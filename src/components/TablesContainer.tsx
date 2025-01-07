import React, { useEffect } from "react";
import tablePhoto from "../assets/images/table2.jpg";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useTablesContext } from "../context/TablesProvider";
import AOS from "aos";
import "aos/dist/aos.css";

const TablesContainer: React.FC = () => {
  const { openModal } = useTablesContext();
  const { tables, error, status } = useSelector(
    (state: RootState) => state.rootReducer.reservation
  );

  useEffect(() => {
    AOS.init({
      duration: 600,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  return (
    <div className="tables row container g-4" data-aos="fade-up">
      {status === "loading" && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {tables?.map((table) => (
        <div
          className="col-6 col-lg-3"
          key={table.id}
          data-aos="zoom-in"
          data-aos-delay={table.id * 50}
        >
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
