import React, { useContext, useEffect, useState } from "react";
import MovieSection from "./MovieSection";
import ActorSelector from "./ActorSelectorList";
import StateContext from "../state/StateContext";
import { FormikMovieProps } from "../types/form";
import { Actions } from "../types/state";
import SketelonPlaceholder from "./SketelonPlaceholder";
import toast from "react-hot-toast";
const ActorSection = ({ formik }: FormikMovieProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { state, dispatch } = useContext(StateContext);
  const baseUrl = import.meta.env.VITE_REACT_APP_BACKEND;

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

        // Dispatch the data to the reducer
        dispatch({ type: Actions.SET_ACTORS, payload: data });

        await new Promise((resolve) => setTimeout(resolve, 1000));
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    })();
  }, [dispatch]);

  const onUpdateActor = async (id: string, selected: boolean) => {
    console.log("masuk");
    console.log(formik.values.movieId);
    if (formik.values.movieId) {
      const qString = new URLSearchParams({
        movie_id: formik.values.movieId.toString(),
        data: id,
      });

      console.log(selected, id);
      const response = await fetch(`${baseUrl}/actors/select/?${qString}`, {
        method: selected ? "POST" : "DELETE",
      });
      const data = await response.json();
      console.log("data", data);
      if (response.ok) {
        const updatedActors = selected
          ? [
              ...state!.actorsSelected,
              state!.actors.find((actor) => actor.id === +id)!,
            ]
          : state!.actorsSelected.filter((actor) => actor.id !== +id);

        dispatch({ type: Actions.SELECT_ACTORS, payload: updatedActors });
      }
    }
  };

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
                  onDoubleClick={(e) => {
                    console.log("clicked");
                    const selectedActorId = e.currentTarget.value;
                    console.log("selectedActor", selectedActorId);
                    if (selectedActorId) {
                      console.log("masuk");
                      onUpdateActor(selectedActorId, true); // Pass the selected ID to the handler
                    }
                  }}
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
              {state!.actorsSelected && state!.actorsSelected.length > 0 ? ( // Check if actorsSelected is defined
                <select
                  size={10}
                  name="movieActorSelectedId"
                  onDoubleClick={(e) => {
                    const selectedActorId = e.currentTarget.value;
                    if (selectedActorId) {
                      onUpdateActor(selectedActorId, false); // Deselect actor on double-click
                    }
                  }}
                  className="text-lg rounded-lg focus:ring-primary-blue focus:border-primary-blue block w-full p-2.5 dark:bg-slate-800 dark:border-gray-600 dark:placeholder-white dark:text-white"
                >
                  {state!.actorsSelected.map((actorSelected) => (
                    <option key={actorSelected.id} value={actorSelected.id}>
                      {actorSelected.name}
                    </option>
                  ))}
                </select>
              ) : (
                <div className="p-2.5 border rounded-lg font-bold text-center text-lg">
                  <h3>None</h3>
                </div>
              )}
            </form>
          </div>
        </ActorSelector>
      </div>
    </MovieSection>
  );
};

export default ActorSection;
