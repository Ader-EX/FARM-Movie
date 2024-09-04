import { Formik, FormikHelpers } from "formik";
import ActorSection from "../components/ActorSection";
import CategoriesSection from "../components/CategoriesSection";
import MetadataSection from "../components/MetadataSection";
import MovieList from "../components/MovieList";
import { MainPageInitialStateType } from "../types/form";

const initialValues: MainPageInitialStateType = {
  movieId: "",
  movieName: "",
  movieStudioId: "",
  movieSeriesId: "",
  movieSeriesNumber: "",
  movieActorAvailableId: "",
  movieActorSelectedId: "",
  movieCategories: [],
};

const onSubmit = async (
  val: MainPageInitialStateType,
  helpers: FormikHelpers<MainPageInitialStateType>
) => {
  console.log(val);
};

const MainPage = () => {
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {(formik) => (
        <>
          <div className="items-start flex w-full flex-col gap-2 py-4">
            <h2 className=" text-xl text-opacity-60 text-white font-bold">
              Community Stats
            </h2>
            <h1 className="text-4xl font-semibold">Movie Enjoyer Viewer</h1>
            <p className="max-w-xl text-left text-xl">
              Interactive Movie,Clips, and Actor adder made using{" "}
              <span className="text-primary-blue font-semibold">
                Typescript,
              </span>{" "}
              <span className="text-primary-blue font-semibold"> Redux,</span>{" "}
              and{" "}
              <span className="text-primary-blue font-semibold">FastAPI</span>.
              Checkout the{" "}
              <span className="text-primary-blue font-semibold">
                Github Repository
              </span>{" "}
              for more information
            </p>
          </div>
          <div className="lg:flex">
            <div className="my-2 lg:w-3/5">
              <MovieList formik={formik} />
            </div>
            <div className="my-2 lg:w-2/5">
              <MetadataSection formik={formik} />
            </div>
          </div>
          <div className="flex">
            <div className="my-2 lg:w-1/2">
              <ActorSection formik={formik} />
            </div>
            <div className="my-2 lg:w-1/2">
              <CategoriesSection formik={formik} />
            </div>
          </div>
        </>
      )}
    </Formik>
  );
};

export default MainPage;
