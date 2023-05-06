import { Link, useRouteError } from "react-router-dom";
import { BlankLayout } from "../components/layouts/BlankLayout";

export default function Error404Page() {
  const error = useRouteError();
  console.error(error);

  return (
    <BlankLayout>
      <div id="error-page" className="flex items-center justify-center h-full">
        <div className="text-white flex flex-col gap-5 text-center">
          <h1>Oops!</h1>

          <div className="flex gap-4 items-center mx-auto">
            <h2 className="font-semibold text-xl">{error?.status}</h2>
            <p>
              <i>{error.statusText || error.message}</i>
            </p>
          </div>
          
          <p className="p-5 bg-gray-800 rounded-lg">Sorry, an unexpected error has occurred.</p>

          <div>
            <Link to={'/'}
              className="bg-gray-800 rounded-full px-3 py-2"
            >
              Back to Home page
            </Link>
          </div>
        </div>
      </div>
    </BlankLayout>
  );
}