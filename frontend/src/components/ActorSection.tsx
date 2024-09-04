import React, { useContext } from "react";
import MovieSection from "./MovieSection";
import ActorSelector from "./ActorSelectorList";
import StateContext from "../state/StateContext";
import { FormikMovieProps } from "../types/form";
const ActorSection = ({ formik }: FormikMovieProps) => {
  const { state } = useContext(StateContext);

  return (
    <MovieSection
      title="Actor Section"
      description="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fuga minima explicabo ducimus dolorum omnis dolores deserunt incidunt atque, laborum sit expedita natus maiores eligendi, ab nostrum deleniti, facere consectetur tempora."
    >
      <div className="flex h-84  gap-4 w-full justify-between">
        <ActorSelector title="Available">
          <div className=" ">
            <form className="">
              <select
                size={10}
                {...formik.getFieldProps("movieActorAvailableId")}
                className=" text-lg rounded-lg focus:ring-primary-blue focus:border-primary-blue block w-full p-2.5 dark:bg-slate-800 dark:border-gray-600 dark:placeholder-white dark:text-white"
              >
                {state?.actors?.map((act, index) => {
                  return (
                    <option key={index} value={index}>
                      {act}
                    </option>
                  );
                })}
              </select>
            </form>
          </div>
        </ActorSelector>
        <ActorSelector title="Selected">
          <div>
            <form className=" ">
              <select
                size={10}
                {...formik.getFieldProps("movieActorSelectedId")}
                className=" text-lg rounded-lg focus:ring-primary-blue focus:border-primary-blue block w-full p-2.5 dark:bg-slate-800 dark:border-gray-600 dark:placeholder-white dark:text-white"
              >
                <option>1</option>
              </select>
            </form>
          </div>
        </ActorSelector>
      </div>
    </MovieSection>
  );
};

export default ActorSection;
