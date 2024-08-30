import React from "react";
import MovieSection from "./MovieSection";

const ActorSection = () => {
  return (
    <MovieSection
      title="Actor Section"
      description="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fuga minima explicabo ducimus dolorum omnis dolores deserunt incidunt atque, laborum sit expedita natus maiores eligendi, ab nostrum deleniti, facere consectetur tempora."
    >
      <div className="flex h-96  gap-4 w-full justify-between">
        <div className="md:w-1/2 sm:w-full">
          <div className=" ">
            <form className="">
              <label htmlFor="years" className="block mb-2 text-lg font-medium">
                <h2>Available</h2>
              </label>
              <select
                id="years"
                size={10}
                className=" text-lg rounded-lg focus:ring-primary-blue focus:border-primary-blue block w-full p-2.5 dark:bg-slate-800 dark:border-gray-600 dark:placeholder-white dark:text-white"
              >
                <option>Star Wars 2020</option>
                <option>Lord Of The Rings</option>
                <option>Ironman 5</option>
                <option>Avengers : Infinity War</option>
                <option>Night in Elm Street</option>
                <option>Friday the 10th</option>
                <option>Children of The Corn</option>
              </select>
            </form>
          </div>
        </div>
        <div className="md:w-1/2 sm:w-full">
          <div>
            <form className=" ">
              <label htmlFor="years" className="block mb-2 text-lg font-medium">
                <h2>Selected</h2>
              </label>
              <select
                id="years"
                size={10}
                className=" text-lg rounded-lg focus:ring-primary-blue focus:border-primary-blue block w-full p-2.5 dark:bg-slate-800 dark:border-gray-600 dark:placeholder-white dark:text-white"
              >
                <option>Star Wars 2020</option>
                <option>Lord Of The Rings</option>
                <option>Ironman 5</option>
                <option>Avengers : Infinity War</option>
                <option>Night in Elm Street</option>
                <option>Friday the 10th</option>
                <option>Children of The Corn</option>
              </select>
            </form>
          </div>
        </div>
      </div>
    </MovieSection>
  );
};

export default ActorSection;
