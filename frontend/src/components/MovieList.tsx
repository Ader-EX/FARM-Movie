import { useContext } from "react";
import MovieSection from "./MovieSection";
import StateContext from "../state/StateContext";
import { FormikProps } from "formik";
import { FormikMovieProps, MainPageInitialStateType } from "../types/form";

const MovieList = ({ formik }: FormikMovieProps) => {
  const { state } = useContext(StateContext);
  return (
    <div>
      <MovieSection
        title="Movie"
        description="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fuga minima explicabo ducimus dolorum omnis dolores deserunt incidunt atque, laborum sit expedita natus maiores eligendi, ab nostrum deleniti, facere consectetur tempora."
      >
        <form className="">
          <label htmlFor="movie" className="block mb-2 text-lg font-medium">
            Select an option
          </label>
          <select
            {...formik.getFieldProps("movieId")}
            size={10}
            className=" text-lg rounded-lg focus:ring-primary-blue h-96 focus:border-primary-blue block w-full p-2.5 dark:bg-slate-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          >
            {state?.movies?.map((item, index) => {
              return (
                <option key={index} value={index}>
                  {item}
                </option>
              );
            })}
          </select>
        </form>
      </MovieSection>
    </div>
  );
};

export default MovieList;
