import App from "@/App";
import { ErrorPage } from "@/pages/ErrorPage/ErrorPage";
import { MainPage } from "@/pages/MainPage/MainPage";
import { ResultsPage } from "@/pages/ResultsPage/ResultsPage";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <MainPage /> },
      { path: "/results", element: <ResultsPage /> },
    ],
  },
]);
