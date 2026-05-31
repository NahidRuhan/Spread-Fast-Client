import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Package, UserCheck, Truck, Building, Map, CheckCircle, ArrowLeft, XCircle } from "lucide-react";

const Tracking = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  // Fetch the specific parcel details
  const { data: parcel, isLoading } = useQuery({
    queryKey: ["tracking", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${id}`);
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20 min-h-screen">
        <span className="loading loading-spinner text-green-500 w-12 h-12 border-4 border-t-transparent border-green-500 rounded-full animate-spin"></span>
      </div>
    );
  }

  if (!parcel) {
    return (
      <div className="bg-white rounded-none md:rounded-3xl p-4 md:p-8 shadow-sm text-center">
        <h2 className="text-2xl font-bold text-gray-800">Parcel Not Found</h2>
        <button onClick={() => navigate(-1)} className="mt-4 text-blue-500 hover:underline">Go Back</button>
      </div>
    );
  }

  // Define the workflow stages based on location mapping
  const getSteps = (isSameCity) => {
    if (isSameCity) {
      return [
        { status: "pending", label: "Pending", icon: Package },
        { status: "assigned", label: "Assigned", icon: UserCheck },
        { status: "picked up", label: "Picked Up", icon: Truck },
        { status: "delivered", label: "Delivered", icon: CheckCircle },
      ];
    }
    return [
      { status: "pending", label: "Pending", icon: Package },
      { status: "assigned", label: "Assigned", icon: UserCheck },
      { status: "picked up", label: "Picked Up", icon: Truck },
      { status: "at origin hub", label: "At Origin Hub", icon: Building },
      { status: "in transit", label: "In Transit", icon: Map },
      { status: "at destination", label: "At Destination", icon: Building },
      { status: "processing", label: "Processing", icon: Package },
      { status: "out for delivery", label: "Out for Delivery", icon: Truck },
      { status: "delivered", label: "Delivered", icon: CheckCircle },
    ];
  };

  const currentStatus = (parcel.status || "pending").toLowerCase();
  const isCancelled = currentStatus === "cancelled";
  const steps = getSteps(parcel.sameCity);
  
  const currentIndex = steps.findIndex((s) => s.status === currentStatus);
  const activeIndex = currentIndex === -1 ? 0 : currentIndex;

  return (
    <div className="w-full space-y-8 min-h-screen">
      <div className="bg-white rounded-none md:rounded-3xl p-4 md:p-8 shadow-sm">
        <div className="flex items-center gap-4 mb-6 border-b border-gray-100 pb-4">
          <button onClick={() => navigate(-1)} className="p-2 bg-gray-50 hover:bg-gray-100 text-gray-600 rounded-full transition-colors">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-[#0A2533]">Tracking Details</h1>
            <p className="text-gray-500 font-medium tracking-wide">
              {parcel.trackingId ? `Tracking ID: ${parcel.trackingId}` : `Parcel ID: ${parcel._id}`}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100">
            <p className="text-sm text-gray-500 mb-1">From</p>
            <p className="font-semibold text-gray-800">{parcel.senderName}</p>
            <p className="text-sm text-gray-600 capitalize">{parcel.senderDistrict}</p>
          </div>
          <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100">
            <p className="text-sm text-gray-500 mb-1">To</p>
            <p className="font-semibold text-gray-800">{parcel.receiverName}</p>
            <p className="text-sm text-gray-600 capitalize">{parcel.receiverDistrict}</p>
          </div>
          <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100">
            <p className="text-sm text-gray-500 mb-1">Current Status</p>
            <p className={`font-bold capitalize ${isCancelled ? 'text-red-500' : currentStatus === 'delivered' ? 'text-green-600' : 'text-blue-600'}`}>
              {parcel.status || "Pending"}
            </p>
          </div>
        </div>

        <h2 className="text-xl font-bold text-[#0A2533] mb-8">Delivery Workflow</h2>

        {isCancelled ? (
          <div className="flex items-center gap-4 text-red-500 bg-red-50 p-6 rounded-2xl border border-red-100">
            <XCircle size={32} />
            <div>
              <h3 className="text-lg font-bold">Delivery Cancelled</h3>
              <p className="text-sm">This parcel delivery has been cancelled.</p>
            </div>
          </div>
        ) : (
          <div className="relative pl-6 md:pl-10 space-y-10">
            {/* Background Line */}
            <div className="absolute left-10 md:left-13 top-4 bottom-4 w-1 bg-gray-100 rounded-full"></div>
            {/* Animated Progress Line */}
            <div 
              className="absolute left-10 md:left-13 top-4 w-1 bg-green-500 rounded-full transition-all duration-700 ease-in-out" 
              style={{ height: `${(activeIndex / (steps.length - 1)) * 100}%` }}
            ></div>

            {steps.map((step, index) => {
              const isCompleted = index <= activeIndex;
              const isCurrent = index === activeIndex;
              const Icon = step.icon;

              return (
                <div key={step.status} className="relative flex items-center gap-6 md:gap-8 z-10">
                  <div 
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-4 border-white shadow-sm transition-colors duration-300 ${
                      isCompleted ? "bg-green-500 text-white" : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    <Icon size={18} />
                  </div>
                  <div>
                    <h3 className={`font-bold md:text-lg transition-colors ${
                      isCurrent ? "text-green-600" : isCompleted ? "text-gray-800" : "text-gray-400"
                    }`}>
                      {step.label}
                    </h3>
                    {isCurrent && (
                      <p className="text-xs md:text-sm text-green-500 font-medium mt-0.5">Currently in this stage</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Tracking;