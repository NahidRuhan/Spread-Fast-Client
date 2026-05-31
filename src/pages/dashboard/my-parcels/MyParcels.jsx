import { useQuery } from "@tanstack/react-query"
import useAuth from "../../../hooks/useAuth"
import useAxiosSecure from "../../../hooks/useAxiosSecure"
import { Trash2 } from "lucide-react"
import Swal from "sweetalert2"
import { Link } from "react-router-dom"
// import { useEffect, useState } from "react"

const MyParcels = () => {
    const {user} = useAuth()
    const axiosSecure = useAxiosSecure()
    const { data: parcels = [], refetch } = useQuery({
        queryKey: ['myParcels',user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels?email=${user.email}`)
            return res.data
        }
    })
    console.log("Used tanstack: ",parcels)

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
    <div className="bg-white rounded-3xl p-8 shadow-sm">
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
                  <td className="p-4 font-medium text-slate-800">
                    {parcel.parcelName}
                    {parcel.trackingId && (
                      <>
                        <br />
                        <span className="text-xs text-gray-400 font-normal tracking-wide">Tracking ID: {parcel.trackingId}</span>
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
                      className="bg-red-50 text-red-600 hover:bg-red-100 transition-colors p-2 rounded-lg inline-flex items-center justify-center"
                      title="Delete"
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
    </div>
  )
}

export default MyParcels
