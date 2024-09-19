import { useContext, useEffect, useState } from "react";
import MovieSection from "./MovieSection";
import StateContext from "../state/StateContext";

import { FormikMovieProps } from "../types/form";
import { Actions } from "../types/state";
import SketelonPlaceholder from "./SketelonPlaceholder";

const MovieList = ({ formik }: FormikMovieProps) => {
  const { state, dispatch } = useContext(StateContext);
  const [isLoading, setIsLoading] = useState(false);
  const baseUrl = import.meta.env.VITE_REACT_APP_BACKEND;
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${baseUrl}/get_movies`, {
          method: "GET",
        });
        const data = await response.json();

        // Log the actual fetched data
        console.log("Fetched data:", data);

        // Dispatch the data to the reducer
        dispatch({ type: Actions.SET_MOVIES, payload: data });
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    })();
  }, [baseUrl, dispatch]);

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
          {isLoading ? (
            <SketelonPlaceholder />
          ) : (
            <select
              {...formik.getFieldProps("movieId")}
              size={10}
              className=" text-lg rounded-lg focus:ring-primary-blue h-96 focus:border-primary-blue block w-full p-2.5 dark:bg-slate-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            >
              {state?.movies.map((movie) => {
                return (
                  <option key={movie.id} value={movie.id}>
                    {movie.filename}
                  </option>
                );
              })}
            </select>
          )}
        </form>
      </MovieSection>
    </div>
  );
};

export default MovieList;
