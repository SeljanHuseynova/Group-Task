import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMeals } from "../redux/mealsSlice";
import { AppDispatch } from "../redux/store";
import { Link } from "react-router";

const MealsSection = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { meals } = useSelector((state: any) => state.rootReducer.meals);

  const [sortedMeals, setSortedMeals] = useState<any[]>([]);
  const [sortOption, setSortOption] = useState<string>("name-asc");

  useEffect(() => {
    dispatch(fetchMeals());
  }, [dispatch]);

  useEffect(() => {
    setSortedMeals(meals);
  }, [meals]);

  const handleSort = (option: string) => {
    setSortOption(option);

    const sorted = [...meals].sort((a, b) => {
      if (option === "name-asc") {
        return a.Name.localeCompare(b.Name);
      }
      if (option === "name-desc") {
        return b.Name.localeCompare(a.Name);
      }
      if (option === "price-asc") {
        return a.Price - b.Price;
      }
      if (option === "price-desc") {
        return b.Price - a.Price;
      }
      return 0;
    });

    setSortedMeals(sorted);
  };

  return (
    <div>
      <div className="sort-container">
        <label htmlFor="sort">Sort by:</label>
        <select
          id="sort"
          value={sortOption}
          onChange={(e) => handleSort(e.target.value)}
        >
          <option value="name-asc">Name (A to Z)</option>
          <option value="name-desc">Name (Z to A)</option>
          <option value="price-asc">Price (Low to High)</option>
          <option value="price-desc">Price (High to Low)</option>
        </select>
      </div>
      <div className="menuList">
        {sortedMeals.map((meal: any) => (
          <div key={meal.id} className="meal-item">
            <div className="meal-img">
              <img src={meal.img} alt={meal.Name} />
            </div>
            <div className="meal-text">
              <h2>{meal.Name}</h2>
              <p>{meal.Description}</p>
              <p className="price">${meal.Price.toFixed(2)}</p>
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
