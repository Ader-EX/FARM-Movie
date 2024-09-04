export type StateType = {
  movies: string[];
  actors: string[];
  categories: string[];
  series: string[];
  studios: string[];
};

export enum Actions {
  SET_MOVIES = "SET_MOVIES",
  SET_ACTORS = "SET_ACTORS",
  SET_SERIES = "SET_SERIES",
  SET_STUDIO = "SET_STUDIO",
  SET_MOVIE_NAME = "SET_MOVIE_NAME",
  DESELECT_MOVIE = "DESELECT_MOVIE",
  DESELECT_ACTORS = "DESELECT_ACTORS",
  DESELECT_CATEGORIES = "DESELECT_CATEGORIES",
  CLEAR_SELECTED_MOVIES = "CLEAR_SELECTED_MOVIES",
  CLEAR_SELECTED_ACTORS = "CLEAR_SELECTED_ACTORS",
  CLEAR_SELECTED_CATEGORIES = "CLEAR_SELECTED_CATEGORIES",
  SET_CATEGORIES = "SET_CATEGORIES",
  SELECT_MOVIE = "SELECT_MOVIE",
  SELECT_ACTORS = "SELECT_ACTORS",
  SELECT_CATEGORIES = "SELECT_CATEGORIES",
  UPDATE_MOVIE_NAME = "UPDATE_MOVIE_NAME",
  UPDATE_STUDIO_ID = "UPDATE_STUDIO_ID",
  UPDATE_SERIES_ID = "UPDATE_SERIES_ID",
  UPDATE_SERIES_NUMBER = "UPDATE_SERIES_NUMBER",
}

export type ActionType =
  | { type: Actions.SET_MOVIES; payload: string }
  | { type: Actions.SET_ACTORS; payload: string }
  | { type: Actions.SET_CATEGORIES; payload: string }
  | { type: Actions.SET_SERIES; payload: string }
  | { type: Actions.SET_STUDIO; payload: string }
  | { type: Actions.SELECT_MOVIE; payload: number }
  | { type: Actions.SELECT_ACTORS; payload: string[] }
  | { type: Actions.SELECT_CATEGORIES; payload: string[] }
  | { type: Actions.SET_MOVIE_NAME; payload: string }
  | { type: Actions.DESELECT_MOVIE }
  | { type: Actions.DESELECT_ACTORS }
  | { type: Actions.DESELECT_CATEGORIES }
  | { type: Actions.CLEAR_SELECTED_MOVIES }
  | { type: Actions.CLEAR_SELECTED_ACTORS }
  | { type: Actions.CLEAR_SELECTED_CATEGORIES }
  | { type: Actions.UPDATE_MOVIE_NAME; payload: string }
  | { type: Actions.UPDATE_STUDIO_ID; payload: number }
  | { type: Actions.UPDATE_SERIES_ID; payload: number }
  | { type: Actions.UPDATE_SERIES_NUMBER; payload: number };
