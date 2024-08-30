import "./App.css";
import Container from "./components/Container";
import MovieSection from "./components/MovieSection";
import MainPage from "./pages/MainPage";

function App() {
  return (
    <>
      <Container>
        <div className="items-start flex w-full flex-col gap-2 py-4">
          <h2
            className=" text-xl text-opacity-60 text-white font-bold
          "
          >
            Community Stats
          </h2>
          <h1 className="text-4xl font-semibold">Movie Enjoyer Viewer</h1>
          <p className="max-w-xl text-left text-xl">
            Interactive Movie,Clips, and Actor adder made using{" "}
            <span className="text-primary-blue font-semibold">Typescript</span>{" "}
            and <span className="text-primary-blue font-semibold">FastAPI</span>
            . Checkout the{" "}
            <span className="text-primary-blue font-semibold">
              Github Repository
            </span>{" "}
            for more information
          </p>
        </div>
        <MainPage />
      </Container>
    </>
  );
}

export default App;
