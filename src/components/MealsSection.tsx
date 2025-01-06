import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMeals } from "../redux/mealsSlice";
import { AppDispatch } from "../redux/store";
import { Link } from "react-router";

const MealsSection = () => {
  const dispach = useDispatch<AppDispatch>();
  const { meals, error, status } = useSelector(
    (state: any) => state.rootReducer.meals
  );
  error;
  status;
  console.log(meals);
  useEffect(() => {
    dispach(fetchMeals());
  }, [dispach]);
  return (
    <div>
      <div className="menuList">
        {meals.map((meal: any) => (
          <div key={meal.id}>
            <div className="meal-img">
              <img src={meal.img} alt="meal image" />
            </div>
            <div className="meal-text">
              <div>
                <h2>{meal.Name}</h2>
              </div>
              <p>{meal.Description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="orderDiv">
        <button>
          <Link to="/Reservation">Order online</Link>
        </button>
      </div>
    </div>
  );
};

export default MealsSection;
