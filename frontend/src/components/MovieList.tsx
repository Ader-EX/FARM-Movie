import MovieSection from "./MovieSection";

const MovieList = () => {
  return (
    <div>
      <MovieSection
        title="Movie"
        description="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fuga minima explicabo ducimus dolorum omnis dolores deserunt incidunt atque, laborum sit expedita natus maiores eligendi, ab nostrum deleniti, facere consectetur tempora."
      >
        <form className="">
          <label htmlFor="years" className="block mb-2 text-lg font-medium">
            Select an option
          </label>
          <select
            id="years"
            size={10}
            className=" text-lg rounded-lg focus:ring-primary-blue h-96 focus:border-primary-blue block w-full p-2.5 dark:bg-slate-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
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
      </MovieSection>
    </div>
  );
};

export default MovieList;
