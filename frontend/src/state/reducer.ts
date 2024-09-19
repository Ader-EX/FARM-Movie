import { ActionType, StateType } from "../types/state";

export default (state: StateType, action: ActionType) => {
  switch (action.type) {
    case "SET_MOVIES":
      return { ...state, movies: action.payload };
    case "SET_SERIES":
      return { ...state, series: [...state.series, action.payload] };
    case "SET_ACTORS":
      return { ...state, actors: [...state.actors, action.payload] };
    case "SET_CATEGORIES":
      return { ...state, categories: [...state.categories, action.payload] };
    case "SELECT_MOVIE":
      return { ...state, selectedMovieId: action.payload };
    case "DESELECT_MOVIE":
      return { ...state, selectedMovieId: null };
    case "SELECT_ACTORS":
      return { ...state, selectedActors: action.payload };
    case "DESELECT_ACTORS":
      return { ...state, selectedActors: null };
    case "SELECT_CATEGORIES":
      return { ...state, selectedCategories: action.payload };
    case "DESELECT_CATEGORIES":
      return { ...state, selectedCategories: null };
    case "SET_MOVIE_NAME":
      return { ...state };
    default:
      return state;
  }
};
