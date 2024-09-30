import { Formik, FormikHelpers } from "formik";
import ActorSection from "../components/ActorSection";
import CategoriesSection from "../components/CategoriesSection";
import MetadataSection from "../components/MetadataSection";
import MovieList from "../components/MovieList";
import { MainPageInitialStateType } from "../types/form";
import toast from "react-hot-toast";

const initialValues: MainPageInitialStateType = {
  movieId: "",
  movieName: "",
  movieStudioId: "",
  movieSeriesId: "",
  movieSeriesNumber: "",
  movieActorAvailableId: undefined,
  movieActorSelectedId: undefined,
  movieCategories: [],
};

const onSubmit = async (
  val: MainPageInitialStateType,
  helpers: FormikHelpers<MainPageInitialStateType>
) => {
  console.log("Main VAl", val);

  if (val.movieId) {
    const baseUrl = import.meta.env.VITE_REACT_APP_BACKEND;

    const body = {
      name: val.movieName ? val.movieName : null,
      studio_id: val.movieStudioId ? +val.movieStudioId : null, // Corrected to `studio_id`
      series_id: val.movieSeriesId ? +val.movieSeriesId : null, // Corrected to `series_id`
      series_num: val.movieSeriesNumber ? +val.movieSeriesNumber : null, // Corrected to `series_num`
    };

    console.log("body", body);
    const response = await fetch(`${baseUrl}/movie/${val.movieId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    toast.success("Data saved successfully");
    console.log("data", data);
  }
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
              <span className="text-primary-blue font-semibold">
                {" "}
                React Context,
              </span>{" "}
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
