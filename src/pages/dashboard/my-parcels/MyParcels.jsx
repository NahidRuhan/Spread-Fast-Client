import { useQuery } from "@tanstack/react-query"
import useAuth from "../../../hooks/useAuth"
import useAxiosSecure from "../../../hooks/useAxiosSecure"
import { Trash2 } from "lucide-react"
import Swal from "sweetalert2"
import { Link } from "react-router-dom"
import { useState } from "react"

const MyParcels = () => {
    const {user} = useAuth()
    const axiosSecure = useAxiosSecure()
    const [selectedParcel, setSelectedParcel] = useState(null);
    const { data: parcels = [], refetch } = useQuery({
        queryKey: ['myParcels',user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels?email=${user.email}`)
            return res.data
        }
    })

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ef4444", // Red color to match delete action
            cancelButtonColor: "#94a3b8",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/parcels/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your parcel has been deleted.",
                                icon: "success"
                            });
                            refetch(); // Automatically update the table
                        }
                    })
                    .catch(error => {
                        console.error("Error deleting parcel:", error);
                        Swal.fire("Error!", error.response?.data?.message || "Failed to delete the parcel.", "error");
                    });
            }
        });
    }

    // OLD METHOD 
    //     const [parcels, setParcels] = useState([])

    // useEffect(() => {
    //     if (user?.email) {
    //         axiosSecure.get(`/parcels?email=${user.email}`)
    //             .then(res => setParcels(res.data))
    //             .catch(error => console.error("Error fetching parcels:", error))
    //     }
    // }, [user?.email, axiosSecure])

    // console.log("Used useEffect: ",parcels)

  return (
    <div className="bg-white rounded-none md:rounded-3xl p-4 md:p-8 shadow-sm">
      <h1 className="text-3xl font-bold text-[#0A2533] mb-6">My Parcels</h1>
      <p className="text-gray-600">Here you will see a list of all your booked parcels.</p>
      
      <div className="overflow-x-auto mt-8">
        <table className="w-full text-left border-collapse whitespace-nowrap">
          <thead>
            <tr className="bg-gray-50 text-slate-700 text-sm uppercase tracking-wide">
              <th className="p-4 rounded-tl-xl font-semibold">#</th>
              <th className="p-4 font-semibold">Parcel Name</th>
              <th className="p-4 font-semibold">Type</th>
              <th className="p-4 font-semibold">Receiver</th>
              <th className="p-4 font-semibold text-center">Destination</th>
              <th className="p-4 font-semibold text-center">Cost</th>
              <th className="p-4 font-semibold text-center">Delivery Status</th>
              <th className="p-4 font-semibold text-center">Payment</th>
              <th className="p-4 rounded-tr-xl font-semibold text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {parcels.length > 0 ? (
              parcels.map((parcel, index) => (
                <tr key={parcel._id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors text-sm">
                  <td className="p-4 text-gray-600 font-medium">{index + 1}</td>
                  <td 
                    onClick={() => setSelectedParcel(parcel)}
                    className="p-4 font-medium text-slate-800 cursor-pointer group"
                  >
                    <span className="group-hover:text-green-600 transition-colors">
                      {parcel.parcelName}
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
                    {parcel.documentType}
                    {parcel.parcelWeight && (
                      <><br /><span className="text-xs text-gray-400">{parcel.parcelWeight} kg</span></>
                    )}
                  </td>
                  <td className="p-4 text-gray-600">{parcel.receiverName} <br/><span className="text-xs text-gray-400">{parcel.receiverPhone}</span></td>
                  <td className="p-4 text-gray-600 text-center">{parcel.receiverDistrict}, {parcel.receiverRegion}</td>
                  <td className="p-4 font-semibold text-green-600 text-center">৳ {parcel.deliveryCharge}</td>
                  <td className="p-4 text-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold inline-block capitalize ${
                      parcel.status === 'delivered' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {parcel.status || 'pending'}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    {parcel.paymentStatus === 'paid' ? (
                      <span className="font-semibold text-green-600">Paid</span>
                    ) : (
                      <Link to={`/dashboard/payment/${parcel._id}`}>
                        <button className="bg-primary text-[#0A2533] px-4 py-1.5 rounded-lg text-xs font-bold hover:bg-opacity-90 transition-colors">
                          Pay
                        </button>
                      </Link>
                    )}
                  </td>
                  <td className="p-4 text-center">
                    <button
                      onClick={() => handleDelete(parcel._id)}
                      disabled={parcel.paymentStatus === 'paid'}
                      className={`${
                        parcel.paymentStatus === 'paid'
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-red-50 text-red-600 hover:bg-red-100 cursor-pointer'
                      } transition-colors p-2 rounded-lg inline-flex items-center justify-center`}
                      title={parcel.paymentStatus === 'paid' ? 'Cannot delete paid parcel' : 'Delete'}
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="p-8 text-center text-gray-500">No parcels found.</td>
              </tr>
            )}
          </tbody>
        </table>
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
  )
}

export default MyParcels
