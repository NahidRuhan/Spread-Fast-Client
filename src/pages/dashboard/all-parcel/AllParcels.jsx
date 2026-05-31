import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const AllParcels = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedParcel, setSelectedParcel] = useState(null);

  const { data: parcels = [], isLoading, refetch } = useQuery({
    queryKey: ["allParcels"],
    queryFn: async () => {
      const res = await axiosSecure.get("/parcels");
      return res.data;
    },
  });

  const hubParcels = parcels.filter(
    (parcel) =>
      ["at origin hub", "in transit"].includes((parcel.status || "").toLowerCase())
  );

  const handleUpdateStatus = (parcel) => {
    const currentStatus = (parcel.status || "").toLowerCase();

    const statusOptionsMap = {
      "at origin hub": { "in transit": "In Transit", "at destination": "At Destination" },
      "in transit": { "at destination": "At Destination" }
    };

    const options = statusOptionsMap[currentStatus] || {};

    Swal.fire({
      title: 'Update Parcel Status',
      input: 'select',
      inputOptions: options,
      inputPlaceholder: 'Select next status',
      showCancelButton: true,
      confirmButtonColor: "#0A2533",
      inputValidator: (value) => {
        if (!value) {
          return 'You need to choose a status!';
        }
      }
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/parcels/status/${parcel._id}`, { status: result.value }).then((res) => {
          if (res.data.modifiedCount > 0) {
            Swal.fire("Updated!", `Status changed to ${result.value}.`, "success");
            refetch();
          }
        });
      }
    });
  };

  return (
    <div className="w-full space-y-8 min-h-screen">
      
      {/* Parcels at Hub Section */}
      <div className="bg-white rounded-none md:rounded-3xl p-4 md:p-8 w-full shadow-sm">
        <div className="mb-6 border-b border-gray-100 pb-4">
          <h2 className="text-2xl font-bold text-[#0A2533] mb-2">Parcels at Hub & In Transit</h2>
          <p className="text-gray-500 font-medium">Manage parcels moving between origin and destination warehouses.</p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <span className="loading loading-spinner text-green-500 w-12 h-12 border-4 border-t-transparent border-green-500 rounded-full animate-spin"></span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse whitespace-nowrap">
              <thead>
                <tr className="bg-gray-50 text-slate-700 text-sm uppercase tracking-wide">
                  <th className="p-4 rounded-tl-xl font-semibold w-16">#</th>
                  <th className="p-4 font-semibold">Parcel Info</th>
                  <th className="p-4 font-semibold">Origin</th>
                  <th className="p-4 font-semibold">Destination</th>
                  <th className="p-4 font-semibold text-center">Status</th>
                  <th className="p-4 rounded-tr-xl font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {hubParcels.length > 0 ? (
                  hubParcels.map((parcel, index) => (
                    <tr key={parcel._id} className="hover:bg-gray-50 transition-colors duration-200 text-sm">
                      <td className="p-4 text-gray-500 font-medium">{index + 1}</td>
                      <td
                        onClick={() => setSelectedParcel(parcel)}
                        className="p-4 font-medium text-slate-800 cursor-pointer group"
                      >
                        <span className="group-hover:text-green-600 transition-colors">
                          {parcel.parcelName}
                        </span>
                        <br />
                        {parcel.trackingId ? (
                          <Link to={`/dashboard/tracking/${parcel._id}`} onClick={(e) => e.stopPropagation()} className="text-xs text-blue-500 hover:text-blue-700 hover:underline font-semibold tracking-wide inline-block mt-1">
                            Track: {parcel.trackingId}
                          </Link>
                        ) : (
                          <span className="text-xs text-gray-400 font-normal tracking-wide inline-block mt-1">
                            Tracking: N/A
                          </span>
                        )}
                      </td>
                      <td className="p-4 text-gray-600">
                        <p className="font-semibold text-[#0A2533] capitalize">{parcel.receive_warehouse || parcel.senderDistrict}</p>
                      </td>
                      <td className="p-4 text-gray-600">
                        <p className="font-semibold text-[#0A2533] capitalize">{parcel.dispatch_warehouse || parcel.receiverDistrict}</p>
                      </td>
                      <td className="p-4 text-center">
                        <span className="px-3 py-1 rounded-full text-xs font-semibold inline-block bg-purple-100 text-purple-700 capitalize">
                          {parcel.status}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <button 
                          onClick={() => handleUpdateStatus(parcel)}
                          className="bg-[#0A2533] hover:bg-gray-800 transition-colors text-white font-semibold py-2 px-5 rounded-lg text-xs shadow-sm cursor-pointer"
                        >
                          Update Status
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="p-12 text-center text-gray-400 font-medium">
                      No parcels currently at the hub or in transit.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* All Parcels Section */}
      <div className="bg-white rounded-none md:rounded-3xl p-4 md:p-8 w-full shadow-sm">
        <div className="mb-6 border-b border-gray-100 pb-4">
          <h1 className="text-2xl font-bold text-[#0A2533] mb-2">All Parcels</h1>
          <p className="text-gray-500 font-medium">
            View and manage all parcels placed by users across the system.
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <span className="loading loading-spinner text-green-500 w-12 h-12 border-4 border-t-transparent border-green-500 rounded-full animate-spin"></span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse whitespace-nowrap">
              <thead>
                <tr className="bg-gray-50 text-slate-700 text-sm uppercase tracking-wide">
                  <th className="p-4 rounded-tl-xl font-semibold w-16">#</th>
                  <th className="p-4 font-semibold">Parcel Info</th>
                  <th className="p-4 font-semibold">Sender Details</th>
                  <th className="p-4 font-semibold">Receiver Details</th>
                  <th className="p-4 font-semibold text-center">Cost</th>
                  <th className="p-4 rounded-tr-xl font-semibold text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {parcels.length > 0 ? (
                  parcels.map((parcel, index) => (
                    <tr key={parcel._id} className="hover:bg-gray-50 transition-colors duration-200 text-sm">
                      <td className="p-4 text-gray-500 font-medium">
                        {index + 1}
                      </td>
                      <td
                        onClick={() => setSelectedParcel(parcel)}
                        className="p-4 font-medium text-slate-800 cursor-pointer group"
                      >
                        <span className="group-hover:text-green-600 transition-colors">
                          {parcel.parcelName}
                        </span>
                        <br />
                        <span className="text-xs text-gray-400 font-normal tracking-wide">
                          Type: {parcel.documentType}
                        </span>
                        {parcel.trackingId && (
                          <>
                            <br />
                            <Link to={`/dashboard/tracking/${parcel._id}`} onClick={(e) => e.stopPropagation()} className="text-xs text-blue-500 hover:text-blue-700 hover:underline font-semibold tracking-wide inline-block mt-1">
                              Track: {parcel.trackingId}
                            </Link>
                          </>
                        )}
                      </td>
                      <td className="p-4 text-gray-600">
                        <p className="font-semibold text-[#0A2533]">
                          {parcel.senderName}
                        </p>
                        <p className="text-xs text-gray-500">
                          {parcel.senderPhone}
                        </p>
                        <p className="text-xs text-gray-500">
                          {parcel.senderDistrict}
                        </p>
                      </td>
                      <td className="p-4 text-gray-600">
                        <p className="font-semibold text-[#0A2533]">
                          {parcel.receiverName}
                        </p>
                        <p className="text-xs text-gray-500">
                          {parcel.receiverPhone}
                        </p>
                        <p className="text-xs text-gray-400">
                          {parcel.receiverDistrict}
                        </p>
                      </td>
                      <td className="p-4 font-semibold text-green-600 text-center">
                        ৳ {parcel.deliveryCharge}
                      </td>
                      <td className="p-4 text-center">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold inline-block capitalize ${parcel.status === "delivered" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}
                        >
                          {parcel.status || "pending"}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="p-12 text-center text-gray-400 font-medium"
                    >
                      No parcels found in the system.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Parcel Details Modal */}
      {selectedParcel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl w-full max-w-2xl shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h2 className="text-2xl font-bold text-[#0A2533]">
                Parcel Details
              </h2>
              <button
                onClick={() => setSelectedParcel(null)}
                className="text-gray-400 hover:text-red-500 transition-colors cursor-pointer p-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="p-6 overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* General Info */}
                <div className="space-y-4 md:col-span-2">
                  <h3 className="font-semibold text-lg text-gray-800 border-b pb-2">
                    General Info
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="md:col-span-3">
                      <p className="text-sm text-gray-500">Parcel ID</p>
                      <p className="font-medium text-gray-800 text-xs font-mono bg-gray-100 px-2 py-1 rounded inline-block mt-1">
                        {selectedParcel._id || "N/A"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Parcel Name</p>
                      <p className="font-medium text-gray-800">
                        {selectedParcel.parcelName || "N/A"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Document Type</p>
                      <p className="font-medium text-gray-800">
                        {selectedParcel.documentType || "N/A"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Weight</p>
                      <p className="font-medium text-gray-800">
                        {selectedParcel.parcelWeight ? `${selectedParcel.parcelWeight} kg` : "N/A"}
                      </p>
                    </div>
                    {selectedParcel.trackingId && (
                      <div>
                        <p className="text-sm text-gray-500">Tracking ID</p>
                        <p className="font-medium text-gray-800">
                          {selectedParcel.trackingId}
                        </p>
                      </div>
                    )}
                    <div>
                      <p className="text-sm text-gray-500">Delivery Charge</p>
                      <p className="font-medium text-green-600">
                        ৳ {selectedParcel.deliveryCharge || 0}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Created At</p>
                      <p className="font-medium text-gray-800">
                        {selectedParcel.created_at ? new Date(selectedParcel.created_at).toLocaleString() : "N/A"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Payment Status</p>
                      <span className={`px-2 py-0.5 rounded text-xs font-semibold capitalize ${selectedParcel.paymentStatus === "paid" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}`}>
                        {selectedParcel.paymentStatus || "N/A"}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Status</p>
                      <span className={`px-2 py-0.5 rounded text-xs font-semibold capitalize ${selectedParcel.status === "delivered" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                        {selectedParcel.status || "pending"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Sender Details */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-lg text-gray-800 border-b pb-2">
                    Sender Details
                  </h3>
                  <div>
                    <p className="text-sm text-gray-500">Name</p>
                    <p className="font-medium text-gray-800">
                      {selectedParcel.senderName || "N/A"}
                    </p>
                  </div>
                  <div className="grid grid-cols-1 gap-3">
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium text-gray-800 break-all">
                        {selectedParcel.senderEmail || "N/A"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-medium text-gray-800">
                        {selectedParcel.senderPhone || "N/A"}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Region & District</p>
                    <p className="font-medium text-gray-800">
                      {selectedParcel.senderRegion || "N/A"}, {selectedParcel.senderDistrict || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Address</p>
                    <p className="font-medium text-gray-800">
                      {selectedParcel.senderAddress || "N/A"}
                    </p>
                  </div>
                  {selectedParcel.pickupInstruction && (
                    <div>
                      <p className="text-sm text-gray-500">Pickup Instruction</p>
                      <p className="font-medium text-gray-800 text-sm bg-gray-50 p-2 rounded border border-gray-100 mt-1">
                        {selectedParcel.pickupInstruction}
                      </p>
                    </div>
                  )}
                </div>

                {/* Receiver Details */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-lg text-gray-800 border-b pb-2">
                    Receiver Details
                  </h3>
                  <div>
                    <p className="text-sm text-gray-500">Name</p>
                    <p className="font-medium text-gray-800">
                      {selectedParcel.receiverName || "N/A"}
                    </p>
                  </div>
                  <div className="grid grid-cols-1 gap-3">
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium text-gray-800 break-all">
                        {selectedParcel.receiverEmail || "N/A"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-medium text-gray-800">
                        {selectedParcel.receiverPhone || "N/A"}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Region & District</p>
                    <p className="font-medium text-gray-800">
                      {selectedParcel.receiverRegion || "N/A"}, {selectedParcel.receiverDistrict || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Address</p>
                    <p className="font-medium text-gray-800">
                      {selectedParcel.receiverAddress || "N/A"}
                    </p>
                  </div>
                  {selectedParcel.deliveryInstruction && (
                    <div>
                      <p className="text-sm text-gray-500">Delivery Instruction</p>
                      <p className="font-medium text-gray-800 text-sm bg-gray-50 p-2 rounded border border-gray-100 mt-1">
                        {selectedParcel.deliveryInstruction}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end">
              <button
                onClick={() => setSelectedParcel(null)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-6 rounded-xl transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllParcels;
