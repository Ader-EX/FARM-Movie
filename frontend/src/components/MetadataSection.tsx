import React, { useContext, useEffect } from "react";
import MovieSection from "./MovieSection";
import MetadataFormRow from "./MetadataFormRow";
import { FormikMovieProps } from "../types/form";
import StateContext from "../state/StateContext";
import { Field } from "formik";
import { Actions } from "../types/state";
const baseUrl = import.meta.env.VITE_REACT_APP_BACKEND;

const MetadataSection = ({ formik }: FormikMovieProps) => {
  const { state, dispatch } = useContext(StateContext);

  useEffect(() => {
    // Fetch studios and update state when the component mounts
    const fetchSeries = async () => {
      const response = await fetch(`${baseUrl}/series`);
      const data = await response.json();
      dispatch({ type: Actions.SET_SERIES, payload: data });
    };
    const fetchStudios = async () => {
      const response = await fetch(`${baseUrl}/studios`);
      const data = await response.json();

      dispatch({ type: Actions.SET_STUDIO, payload: data });
    };
    fetchSeries();
    fetchStudios();
    // eslint-disable-next-line
  }, []);
  console.log(state);
  return (
    <MovieSection
      title="Metadata"
      description="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fuga minima explicabo ducimus dolorum omnis dolores deserunt incidunt atque, laborum sit expedita natus maiores eligendi, ab nostrum deleniti, facere consectetur tempora."
    >
      <div className="h-90">
        <form className="" onSubmit={formik.handleSubmit}>
          <MetadataFormRow title="Name">
            <div className="mb-2">
              <Field
                type="text"
                placeholder="Name"
                className="movie-data-input"
                name="movieName"
              />
            </div>
          </MetadataFormRow>

          {/* Studio Select */}
          <MetadataFormRow title="Studio">
            <select
              id="studio"
              className="movie-data-input"
              {...formik.getFieldProps("movieStudioId")}
            >
              <option value="">Select Studio</option> {/* Placeholder option */}
              {state?.studios?.map((studio) => (
                <option value={studio.id} key={studio.id}>
                  {studio.name} {/* Display studio title */}
                </option>
              ))}
            </select>
          </MetadataFormRow>

          {/* Series Select */}
          <MetadataFormRow title="Series">
            <select
              id="series"
              className="movie-data-input"
              {...formik.getFieldProps("movieSeriesId")}
            >
              <option value="">Select Series</option> {/* Placeholder option */}
              {state?.series?.map((serie) => (
                <option value={serie.id} key={serie.id}>
                  {serie.name} {/* Display series title */}
                </option>
              ))}
            </select>
          </MetadataFormRow>

          <MetadataFormRow title="Series #">
            <div className="mb-2">
              <Field
                type="text"
                placeholder="Series Number"
                className="movie-data-input"
                name="movieSeriesNumber"
                value={formik.values.movieSeriesNumber}
              />
            </div>
          </MetadataFormRow>

          <div className="flex w-full gap-x-4 justify-between">
            <button
              type="submit"
              className="text-white my-2 w-1/2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Update
            </button>
            <button
              type="submit"
              className="text-white my-2 w-1/2 bg-red-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
            >
              Remove
            </button>
          </div>
        </form>
      </div>
    </MovieSection>
  );
};

export default MetadataSection;
