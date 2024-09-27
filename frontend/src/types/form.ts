import { FormikProps } from "formik";

export type MainPageInitialStateType = {
  movieId: string | undefined;
  movieName: string;
  movieStudioId: string;
  movieSeriesId: string;
  movieSeriesNumber: string;
  movieActorAvailableId: string | undefined;
  movieActorSelectedId: string | undefined;
  movieCategories: string[];
};

export type FormikMovieProps = {
  formik: FormikProps<MainPageInitialStateType>;
};
