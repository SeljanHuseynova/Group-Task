import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMeals } from "../redux/mealsSlice";
import { AppDispatch } from "../redux/store";

const MealsSection = () => {
  const dispach = useDispatch<AppDispatch>();
  const meals = useSelector((state: any) => state.rootReducer.meals);
  console.log(meals);
  useEffect(() => {
    dispach(fetchMeals());
  }, [dispach]);
  return <div>MealsSection</div>;
};

export default MealsSection;
