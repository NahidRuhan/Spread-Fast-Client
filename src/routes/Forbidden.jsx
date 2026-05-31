import { useNavigate } from "react-router";
import { ShieldAlert } from "lucide-react";

const Forbidden = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#EAECED] p-4">
      <div className="bg-white p-10 rounded-3xl shadow-sm flex flex-col items-center max-w-md w-full text-center">
        <div className="bg-red-50 p-6 rounded-full mb-6 text-red-500">
          <ShieldAlert size={64} />
        </div>
        <h1 className="text-5xl font-extrabold text-[#0A2533] mb-2">403</h1>
        <h2 className="text-2xl font-bold text-[#0A2533] mb-4">Access Denied</h2>
        <p className="text-gray-500 font-medium mb-8">
          You do not have the required permissions to view this page. If you believe this is a mistake, please contact support.
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

export default Forbidden;