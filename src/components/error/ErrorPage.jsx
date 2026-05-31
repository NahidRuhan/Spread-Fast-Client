import { useNavigate, useRouteError } from "react-router";
import { AlertTriangle } from "lucide-react";

const ErrorPage = () => {
  const navigate = useNavigate();
  const error = useRouteError();

  // If rendered via a catch-all route (path: "*"), useRouteError() will be null
  const is404 = error?.status === 404 || !error;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#EAECED] p-4">
      <div className="bg-white p-10 rounded-3xl shadow-sm flex flex-col items-center max-w-md w-full text-center">
        <div className="bg-red-50 p-6 rounded-full mb-6 text-red-500">
          <AlertTriangle size={64} />
        </div>
        <h1 className="text-5xl font-extrabold text-[#0A2533] mb-2">
          {is404 ? "404" : error?.status || "Oops!"}
        </h1>
        <h2 className="text-2xl font-bold text-[#0A2533] mb-4">
          {is404 ? "Page Not Found" : error?.statusText || "Something went wrong"}
        </h2>
        <p className="text-gray-500 font-medium mb-8">
          {is404 
            ? "The page you are looking for doesn't exist or has been moved." 
            : error?.data || error?.message || "An unexpected error occurred."}
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-primary hover:bg-green-500 transition-colors text-[#0A2533] font-bold py-3 px-8 rounded-xl w-full"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;