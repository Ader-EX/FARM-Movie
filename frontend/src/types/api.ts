import { ActorType, CategoryType, SeriesType, StudioType } from "./state";

export type MovieInfoResponseType = {
  id: number;
  filename: string;
  name: string | null;
  actors: ActorType[];
  categories: CategoryType[];
  series: SeriesType;
  studio: StudioType;
  series_number: number;
};

// {
//     "id": 0,
//     "filename": "string",
//     "name": "string",
//     "actors": [
//       {
//         "id": 0,
//         "name": "string"
//       }
//     ],
//     "categories": [
//       {
//         "id": 0,
//         "name": "string"
//       }
//     ],
//     "series": {
//       "id": 0,
//       "name": "string"
//     },
//     "series_number": 0,
//     "studios": {
//       "id": 0,
//       "name": "string"
//     }
//   }
