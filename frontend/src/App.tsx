import { useReducer } from "react";
import "./App.css";
import Container from "./components/Container";

import MainPage from "./pages/MainPage";
import reducer from "./state/reducer";
import { initialState } from "./state/initialState";
import StateContext from "./state/StateContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminPage from "./pages/AdminPage";

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <BrowserRouter>
        <StateContext.Provider value={{ state, dispatch }}>
          <Container>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/admin" element={<AdminPage />} />
              {/* Add more routes here */}
              {/* <Route exact path="/movies/:id" element={<MovieDetails />} /> */}
              {/* <Route exact path="/actors/:id" element={<ActorDetails />} /> */}
              {/* <Route exact path="/series/:id" element={<SeriesDetails />} /> */}
              {/* <Route exact path="/add-movie" element={<AddMovie />} /> */}
              {/* <Route exact path="/add-actor" element={<AddActor />} /> */}
              {/* <Route exact path="/add-series" element={<AddSeries />} /> */}
              {/* <Route exact path="/search" element={<SearchPage />} /> */}
              {/* <Route exact path="/about" element={<AboutPage />} /> */}
              {/* <Route exact path="/contact" element={<ContactPage />} /> */}
            </Routes>
          </Container>
        </StateContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
