import MovieSection from "../components/MovieSection";
import MetadataFormRow from "../components/MetadataFormRow";
import { Field, Formik, FormikHelpers } from "formik";
import { useContext, useState } from "react";
import StateContext from "../state/StateContext";
import { Actions } from "../types/state";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

type AdminFormValues = {
  name: string;
  selection: "actor" | "category" | "series" | "studio";
};

const initialValues: AdminFormValues = {
  name: "",
  selection: "actor",
};

const AdminPage = () => {
  const [importStatus, setImportStatus] = useState("");
  const { dispatch } = useContext(StateContext);
  const navigate = useNavigate();
  const onSubmit = async (
    values: AdminFormValues,
    helpers: FormikHelpers<AdminFormValues>
  ) => {
    switch (values.selection) {
      case "actor":
        // Perform actor creation logic
        try {
          const response = await fetch(
            `${import.meta.env.VITE_REACT_APP_BACKEND}/add_actors`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ name: values.name }),
            }
          );
          const data = await response.json();
          console.log(data);
          if (!response.ok) {
            toast.error(
              `Failed to create actor: ${
                data?.detail?.error ? data?.detail?.error : "ERROR"
              }  `
            );
          } else {
            toast.success(`Actor ${values.name} created successfully!`);
            navigate("/");
          }
          // dispatch({
          //   type: Actions.SET_ACTORS,
          //   payload: values.name,
          // });
        } catch (error) {
          console.error(error);
        }

        break;
      case "category":
        // Perform category creation logic
        dispatch({
          type: Actions.SET_CATEGORIES,
          payload: values.name,
        });
        break;
      case "series":
        // Perform series creation logic
        dispatch({
          type: Actions.SET_SERIES,
          payload: values.name,
        });
        break;
      case "studio":
        dispatch({
          type: Actions.SET_STUDIO,
          payload: values.name,
        });
        // Perform studio creation logic
        break;
      default:
        break;
    }
    helpers.setFieldValue("name", "");
  };
  const onImportClick = async () => {
    const baseUrl = import.meta.env.VITE_REACT_APP_BACKEND;

    // Perform import logic
    try {
      const response = await fetch(`${baseUrl}/import_movies`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        setImportStatus("failed");
        throw new Error("Failed to import data");
      }
      const data = await response.json();
      console.log(data);
      setImportStatus("success");

      // Process the imported data
      console.log("Import data:", data);
      // Perform additional processing or validation if needed
      // dispatch({ type: Actions.SET_ACTORS, payload: data.actors });
      // dispatch({ type: Actions.SET_CATEGORIES, payload: data.categories });
      // dispatch({ type: Actions.SET_SERIES, payload: data.series });
      // dispatch({ type: Actions.SET_STUDIO, payload: data.studio });
      toast.success("Data imported successfully!");
    } catch (error: unknown) {
      toast.error("Failed to import data: " + error);

      return;
    }
  };

  return (
    <MovieSection
      title="Admin Page"
      description="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fuga minima explicabo ducimus dolorum omnis dolores deserunt incidunt atque, laborum sit expedita natus maiores eligendi, ab nostrum deleniti, facere consectetur tempora."
    >
      <div className="text-center">
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          {(formik) => (
            <form onSubmit={formik.handleSubmit}>
              <div className="flex justify-center gap-x-8">
                <div className="text-xl">
                  <Field
                    type="radio"
                    name="selection"
                    value="actor"
                    className="mx-2"
                  />
                  Actor
                </div>
                <div className="text-xl ">
                  <Field
                    type="radio"
                    name="selection"
                    value="category"
                    className="mx-2"
                  />
                  Category
                </div>

                <div className="text-xl">
                  {" "}
                  <Field
                    type="radio"
                    name="selection"
                    value="series"
                    className="mx-2"
                  />
                  Series
                </div>
                <div className="text-xl">
                  <Field
                    type="radio"
                    name="selection"
                    value="studio"
                    className="mx-2"
                  />{" "}
                  Studio
                </div>
              </div>

              <MetadataFormRow title="">
                <Field
                  type="text"
                  name="name"
                  className="movie-data-input"
                  required
                />
              </MetadataFormRow>
              <button
                type="submit"
                className="text-white my-2 capitalize  text-xl w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Add {formik.values.selection}
              </button>

              <br />
            </form>
          )}
        </Formik>
      </div>
      <button
        type="button"
        className="text-white my-2 capitalize  text-xl w-full bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 text-center "
        onClick={onImportClick}
      >
        Import Clips
      </button>

      {importStatus}
    </MovieSection>
  );
};

export default AdminPage;
