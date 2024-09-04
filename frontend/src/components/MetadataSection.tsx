import React, { useContext } from "react";
import MovieSection from "./MovieSection";
import MetadataFormRow from "./MetadataFormRow";
import { FormikMovieProps } from "../types/form";
import StateContext from "../state/StateContext";
import { Field } from "formik";

const MetadataSection = ({ formik }: FormikMovieProps) => {
  const { state } = useContext(StateContext);

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
          <MetadataFormRow title="studio">
            <select
              id="studio"
              className="movie-data-input"
              {...formik.getFieldProps("movieStudioId")}
            >
              {state?.studios?.map((studio, index) => {
                return (
                  <option value={index} key={index}>
                    {studio}
                  </option>
                );
              })}
            </select>
          </MetadataFormRow>
          <MetadataFormRow title="Series">
            <select
              id="studio"
              className="movie-data-input"
              {...formik.getFieldProps("movieSeriesId")}
            >
              {state?.series?.map((serie, index) => {
                return (
                  <option value={index} key={index}>
                    {serie}
                  </option>
                );
              })}
            </select>
          </MetadataFormRow>

          <MetadataFormRow title="Series #">
            <div className="mb-2">
              <Field
                type="text"
                placeholder="Name"
                className="movie-data-input"
                name="movieSeriesNumber"
              />
            </div>
          </MetadataFormRow>

          <div className="flex w-full gap-x-4 justify-between">
            <button
              type="submit"
              className="text-white my-2 w-1/2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Submit
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
