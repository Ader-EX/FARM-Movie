import ActorSection from "../components/ActorSection";
import CategoriesSection from "../components/CategoriesSection";
import MetadataSection from "../components/MetadataSection";
import MovieList from "../components/MovieList";
const MainPage = () => {
  return (
    <>
      <div className="lg:flex">
        <div className="my-2 lg:w-3/5">
          <MovieList />
        </div>
        <div className="my-2 lg:w-2/5">
          <MetadataSection />
        </div>
      </div>
      <div className="flex">
        <div className="my-2 lg:w-1/2">
          <ActorSection />
        </div>
        <div className="my-2 lg:w-1/2">
          <CategoriesSection />
        </div>
      </div>
    </>
  );
};

export default MainPage;
