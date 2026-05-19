import { useQuery } from "@tanstack/react-query"
import useAuth from "../../../hooks/useAuth"
import useAxiosSecure from "../../../hooks/useAxiosSecure"

const MyParcels = () => {
    const {user} = useAuth()
    const axiosSecure = useAxiosSecure()
    const { data: parcels = [] } = useQuery({
        queryKey: ['myParcels',user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels?email=${user.email}`)
            return res.data
        }
    })
    console.log("Used tanstack: ",parcels)
  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm">
      <h1 className="text-3xl font-bold text-[#0A2533] mb-6">My Parcels: {parcels.length}</h1>
      <p className="text-gray-600">Here you will see a list of all your booked parcels.</p>
      {/* You can add tables, lists, or grids here later */}
    </div>
  )
}

export default MyParcels
