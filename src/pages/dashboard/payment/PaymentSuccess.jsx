import { useSearchParams, Link } from "react-router-dom"
import useAxiosSecure from "../../../hooks/useAxiosSecure"
import { useEffect, useState } from "react"
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react"

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams()
    const sessionId = searchParams.get("session_id")
    const axiosSecure = useAxiosSecure()
    const [status, setStatus] = useState(sessionId ? 'loading' : 'error')
    const [paymentInfo,setPaymentInfo] = useState({})

    useEffect(()=>{
        if(sessionId){
            axiosSecure.patch(`/payment-success?session_id=${sessionId}`)
                .then((res) => {
                    setStatus('success')
                    setPaymentInfo({
                        transactionId: res.data.transactionId,
                        trackingId: res.data.trackingId
                    })
                })
                .catch(() => setStatus('error'))
        }
    },[sessionId,axiosSecure])

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="bg-white rounded-none md:rounded-3xl p-4 md:p-12 shadow-sm max-w-md w-full text-center border-0 md:border md:border-gray-50">
        
        {status === 'loading' && (
          <div className="flex flex-col items-center">
            <Loader2 size={48} className="text-blue-500 animate-spin mb-4" />
            <p className="text-gray-500 font-medium">Verifying your payment...</p>
          </div>
        )}

        {status === 'success' && (
          <div className="flex flex-col items-center">
            <CheckCircle size={64} className="text-green-500 mb-6" />
            <h1 className="text-3xl font-bold text-[#0A2533] mb-4">Payment Successful!</h1>
            <p className="text-gray-500 mb-6">Thank you for your payment. Your parcel delivery is now fully confirmed.</p>
            
            <div className="bg-gray-50 w-full rounded-2xl p-5 md:p-6 mb-8 border border-gray-100 text-left space-y-3">
              <p className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-sm text-gray-600 gap-2">
                <span className="font-medium text-slate-800">Transaction ID:</span>
                <span className="font-mono text-xs sm:text-sm bg-white px-2.5 py-1 rounded-md border border-gray-200 break-all">{paymentInfo?.transactionId}</span>
              </p>
              <p className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-sm text-gray-600 gap-2">
                <span className="font-medium text-slate-800">Tracking ID:</span>
                <span className="font-mono font-bold text-blue-700 text-xs sm:text-sm bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200">{paymentInfo?.trackingId}</span>
              </p>
            </div>
            
          </div>
        )}

        {status === 'error' && (
          <div className="flex flex-col items-center">
            <AlertCircle size={64} className="text-red-500 mb-6" />
            <h1 className="text-2xl font-bold text-[#0A2533] mb-4">Verification Failed</h1>
            <p className="text-gray-500 mb-8">We could not verify your payment session, or it may have already been processed.</p>
          </div>
        )}

        {(status === 'success' || status === 'error') && (
          <Link to="/dashboard">
            <button className="bg-primary text-[#0A2533] font-bold py-3 px-8 rounded-xl w-full hover:bg-opacity-90 transition-colors">
              Return to My Parcels
            </button>
          </Link>
        )}
        
      </div>
    </div>
  )
}

export default PaymentSuccess
