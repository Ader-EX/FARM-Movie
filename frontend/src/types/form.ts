import { FormikProps } from "formik";

export type MainPageInitialStateType = {
  movieId: string | undefined;
  movieName: string;
  movieStudioId: string;
  movieSeriesId: string;
  movieSeriesNumber: string | undefined;
  movieActorAvailableId: string;
  movieActorSelectedId: string;
  movieCategories: string[];
};

export type FormikMovieProps = {
  formik: FormikProps<MainPageInitialStateType>;
};
