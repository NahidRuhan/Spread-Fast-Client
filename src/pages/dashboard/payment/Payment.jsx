import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import useAxiosSecure from "../../../hooks/useAxiosSecure"

const Payment = () => {
  const { parcelId } = useParams()
  const axiosSecure = useAxiosSecure()

  const { data: parcel = {}, isLoading, isError, error } = useQuery({
    queryKey: ['parcel', parcelId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${parcelId}`)
      return res.data
    },
    retry: false
  })

  if (isLoading) return <div className="p-8 text-center text-gray-500">Loading payment details...</div>
  if (isError) return <div className="p-8 text-center text-red-500">Error: {error.message}</div>

  const handlePayment = async() => {
    const paymentInfo = {
        deliveryCharge: parcel.deliveryCharge,
        parcelId: parcel._id,
        senderEmail: parcel.senderEmail,
        parcelName: parcel.parcelName
    }
    const res = await axiosSecure.post('/payment-checkout-session',paymentInfo)
    window.location.href = res.data.url
  }

  return (
    <div className="bg-white rounded-none md:rounded-3xl p-4 md:p-12 shadow-sm max-w-3xl mx-auto md:mt-4 border-0 md:border md:border-gray-50">
      <h1 className="text-3xl font-bold text-[#0A2533] mb-2">Checkout</h1>
      <p className="text-gray-500 mb-8">Review your parcel details and complete the payment.</p>

      <div className="bg-gray-50 p-4 md:p-8 rounded-2xl border border-gray-100 mb-8">
        <h2 className="text-xl font-semibold mb-6 text-slate-800 border-b border-gray-200 pb-4">Order Summary</h2>
        <div className="flex flex-col gap-3 text-sm md:text-base text-gray-600">
          <p className="flex justify-between"><span className="font-medium text-slate-800">Parcel Name:</span> <span>{parcel?.parcelName}</span></p>
          <p className="flex justify-between"><span className="font-medium text-slate-800">Document Type:</span> <span>{parcel?.documentType}</span></p>
          <p className="flex justify-between"><span className="font-medium text-slate-800">Weight:</span> <span>{parcel?.parcelWeight ? `${parcel.parcelWeight} kg` : 'N/A'}</span></p>
          <p className="flex justify-between"><span className="font-medium text-slate-800">Receiver:</span> <span className="text-right">{parcel?.receiverName} <br/> <span className="text-xs text-gray-400">{parcel?.receiverPhone}</span></span></p>
          <p className="flex justify-between"><span className="font-medium text-slate-800">Destination:</span> <span className="text-right">{parcel?.receiverDistrict}, {parcel?.receiverRegion}</span></p>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-200 flex justify-between items-center">
          <span className="text-xl font-bold text-[#0A2533]">Total Amount</span>
          <span className="text-3xl font-bold text-green-600">৳ {parcel?.deliveryCharge}</span>
        </div>
      </div>

      {/* Payment Action */}
      <div className="bg-linear-to-br from-purple-600 to-indigo-600 border border-purple-500 p-6 md:p-10 rounded-2xl flex flex-col items-center justify-center text-center shadow-lg shadow-purple-200/50">
        <p className="font-bold text-white mb-2 text-xl">Secure Checkout</p>
        <p className="text-sm text-purple-100 mb-6">You will be securely redirected to Stripe to complete your payment.</p>
        <button onClick={handlePayment} className="bg-primary text-[#0A2533] hover:bg-opacity-90 transition-colors hover:cursor-pointer font-bold py-3 px-10 rounded-xl w-full md:w-auto">
          Pay ৳ {parcel?.deliveryCharge}
        </button>
      </div>
    </div>
  )
}

export default Payment
