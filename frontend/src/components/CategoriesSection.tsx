import React, { useContext, useEffect } from "react";
import MovieSection from "./MovieSection";
import StateContext from "../state/StateContext";
import { FormikMovieProps } from "../types/form";
import { Actions } from "../types/state";
const baseUrl = import.meta.env.VITE_REACT_APP_BACKEND;
const CategoriesSection = ({ formik }: FormikMovieProps) => {
  const { state, dispatch } = useContext(StateContext);

  const onUpdateCategory = async (id: string, selected: boolean) => {
    if (formik.values.movieId) {
      const qString = new URLSearchParams({
        movie_id: formik.values.movieId,
        category_id: id,
      });
      console.log(id, selected);
      const response = await fetch(
        `${baseUrl}/movie/add_category/?${qString}`,
        {
          method: selected ? "POST" : "DELETE",
        }
      );
      const data = await response.json();
      console.log(data);
    }
  };

  useEffect(() => {
    const fetchCategory = async () => {
      const response = await fetch(`${baseUrl}/categories`);
      const data = await response.json();
      console.log(data);
      dispatch({ type: Actions.SET_CATEGORIES, payload: data });
    };
    fetchCategory();
  }, []);
  return (
    <MovieSection
      title="Categories Section"
      description="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fuga minima explicabo ducimus dolorum omnis dolores deserunt incidunt atque, laborum sit expedita natus maiores eligendi, ab nostrum deleniti, facere consectetur tempora."
    >
      <div className="grid grid-cols-3 gap-1 overflow-y-scroll h-80 bg-slate-800 p-4 rounded-lg">
        {state?.categories.map((category) => (
          <div key={category.id} className="flex items-center">
            <input
              id={`category-${category.id}`}
              type="checkbox"
              name={`movieCategories`}
              value={category.id}
              checked={formik.values.movieCategories?.includes(
                category.id.toString()
              )}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                formik.handleChange(e);
                onUpdateCategory(e.target.value, e.target.checked);
              }}
              className="text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor={`category-${category.id}`}
              className="ms-2 text-xl font-medium overflow-hidden text-gray-900 dark:text-gray-300"
            >
              {category.name}
            </label>
          </div>
        ))}
      </div>
    </MovieSection>
  );
};

export default CategoriesSection;
