import { createBrowserRouter } from "react-router-dom";
import { DetailActivityPage, activityLoader } from "../pages/DetailActivityPage";
import { HomePage } from "../pages/HomePage";
import Error404Page from "../pages/Error404Page";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />,
        errorElement: <Error404Page />,
    },
    {
        path: "/detail/:id",
        loader: activityLoader,
        element: <DetailActivityPage />,
    },
]);