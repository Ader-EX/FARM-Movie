import { useContext, useEffect, useState } from "react";
import MovieSection from "./MovieSection";
import StateContext from "../state/StateContext";

import { FormikMovieProps } from "../types/form";
import { Actions } from "../types/state";
import SketelonPlaceholder from "./SketelonPlaceholder";
import { MovieInfoResponseType } from "../types/api";

const MovieList = ({ formik }: FormikMovieProps) => {
  const { state, dispatch } = useContext(StateContext);
  const [isLoading, setIsLoading] = useState(false);
  const baseUrl = import.meta.env.VITE_REACT_APP_BACKEND;
  console.log(state?.actorsSelected);
  const onSelectMovieHandler = async (id: number) => {
    const response = await fetch(`${baseUrl}/movies/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (response.ok) {
      console.log(data);
      formik.setFieldValue("movieName", data.name);
    }
  };

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${baseUrl}/get_movies`, {
          method: "GET",
        });
        const data = await response.json();

        console.log("Fetched data:", data); // Check the fetched data

        dispatch({ type: Actions.SET_MOVIES, payload: data });
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    })();
  }, [baseUrl, dispatch]);

  useEffect(() => {
    (async () => {
      if (formik.values.movieId) {
        const response = await fetch(
          `${baseUrl}/movies/${formik.values.movieId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data: MovieInfoResponseType = await response.json();
        console.log("data.movieList", data);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any

        if (response.ok) {
          formik.setValues({
            ...formik.values,
            movieName: data.name ?? "",
            movieSeriesId: data.series ? data.series.id.toString() : "",
            movieSeriesNumber: data.series_number
              ? data.series_number.toString()
              : "",
            movieStudioId: data.studio ? data.studio.id.toString() : "",
            movieCategories: data.categories.map((item) => item.id.toString()),
          });
          dispatch({
            type: Actions.SELECT_ACTORS,
            payload: data.actors,
          });
        }
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.movieId, dispatch]);

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
              onChange={(e) => {
                formik.handleChange(e); // Use Formik's default handler
                const selectedMovieId = Number(e.target.value);
                onSelectMovieHandler(selectedMovieId); // Fetch the movie details
              }}
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
