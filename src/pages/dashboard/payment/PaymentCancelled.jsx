import { XCircle } from "lucide-react"
import { Link } from "react-router-dom"

const PaymentCancelled = () => {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm max-w-md w-full text-center border border-gray-50">
        <div className="flex justify-center mb-6">
          <XCircle size={64} className="text-red-500" />
        </div>
        <h1 className="text-3xl font-bold text-[#0A2533] mb-4">Payment Cancelled</h1>
        <p className="text-gray-500 mb-8">You have cancelled the checkout process. You can still pay for your parcel later from your dashboard.</p>
        <Link to="/dashboard">
          <button className="bg-primary text-[#0A2533] font-bold py-3 px-8 rounded-xl w-full hover:bg-opacity-90 transition-colors">
            Back to My Parcels
          </button>
        </Link>
      </div>
    </div>
  )
}

export default PaymentCancelled
