import React, { useContext } from "react";
import MovieSection from "./MovieSection";
import StateContext from "../state/StateContext";
import { FormikMovieProps } from "../types/form";

const CategoriesSection = ({ formik }: FormikMovieProps) => {
  const { state } = useContext(StateContext);
  return (
    <MovieSection
      title="Categories Section"
      description="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fuga minima explicabo ducimus dolorum omnis dolores deserunt incidunt atque, laborum sit expedita natus maiores eligendi, ab nostrum deleniti, facere consectetur tempora."
    >
      <div className="grid grid-cols-3 gap-1 overflow-y-scroll h-80 bg-slate-800 p-4 rounded-lg">
        {state?.categories.map((category, index) => {
          return (
            <div key={index} className="flex items-center">
              <input
                id={`category-${index}`}
                type="checkbox"
                name={`movieCategories.${index}`}
                value={category}
                checked={formik.values.movieCategories?.includes(category)}
                onChange={formik.handleChange}
                className=" text-blue-600 bg-gray-100  border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="default-checkbox"
                className="ms-2 text-xl font-medium overflow-hidden text-gray-900 dark:text-gray-300"
              >
                {category}
              </label>
            </div>
          );
        })}
      </div>
    </MovieSection>
  );
};

export default CategoriesSection;
