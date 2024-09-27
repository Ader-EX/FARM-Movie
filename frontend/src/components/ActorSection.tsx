import React, { useContext, useEffect, useState } from "react";
import MovieSection from "./MovieSection";
import ActorSelector from "./ActorSelectorList";
import StateContext from "../state/StateContext";
import { FormikMovieProps } from "../types/form";
import { Actions } from "../types/state";
import SketelonPlaceholder from "./SketelonPlaceholder";
const ActorSection = ({ formik }: FormikMovieProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { state, dispatch } = useContext(StateContext);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${import.meta.env.VITE_REACT_APP_BACKEND}/get_actors`,
          {
            method: "GET",
          }
        );
        const data = await response.json();

        // Log the actual fetched data
        console.log("Fetched data:", data);

        // Dispatch the data to the reducer
        dispatch({ type: Actions.SET_ACTORS, payload: data });
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    })();
  }, []);
  return (
    <MovieSection
      title="Actor Section"
      description="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fuga minima explicabo ducimus dolorum omnis dolores deserunt incidunt atque, laborum sit expedita natus maiores eligendi, ab nostrum deleniti, facere consectetur tempora."
    >
      <div className="flex h-84  gap-4 w-full justify-between">
        <ActorSelector title="Available">
          <div className=" ">
            <form className="">
              {isLoading ? (
                <SketelonPlaceholder />
              ) : (
                <select
                  size={10}
                  {...formik.getFieldProps("movieActorAvailableId")}
                  className=" text-lg rounded-lg focus:ring-primary-blue focus:border-primary-blue block w-full p-2.5 dark:bg-slate-800 dark:border-gray-600 dark:placeholder-white dark:text-white"
                >
                  {state?.actors?.map((act) => {
                    return (
                      <option key={act.id} value={act.id}>
                        {act.name}
                      </option>
                    );
                  })}
                </select>
              )}
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
