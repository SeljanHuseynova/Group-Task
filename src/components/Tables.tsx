import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { RootState, AppDispatch } from "../redux/store";
import { fetchTables } from "../redux/reservationSlice";
import tablePhoto from '../assets/images/table.jpeg';

const Tables = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { tables, error, status } = useSelector((state: RootState) => state.reservation);

  useEffect(() => {
    dispatch(fetchTables());
  }, [dispatch]);

  return (
    <div className="tables-container">
      <div className="title">
        <h1>Tables</h1>
      </div>
      <div className="tables row container">
        {status === "loading" && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {tables?.map((table) => (
            <div className="col-6 col-lg-3">
          <div key={table.id} className="table">
            <img src={tablePhoto} alt={`Table ${table.id}`} />
            <p>Table ID: {table.id}</p>
            <p>Status: {table.isReserved ? "Not Available" : "Available"}</p>
          </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tables;
