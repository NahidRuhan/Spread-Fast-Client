import { useQuery } from "@tanstack/react-query"
import useAuth from "../../../hooks/useAuth"
import useAxiosSecure from "../../../hooks/useAxiosSecure"

const PaymentHistory = () => {
  const axiosSecure = useAxiosSecure()
  const {user} = useAuth()

  const {data: payments = []} = useQuery({
    queryKey: ['payments',user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user?.email}`)
      return res.data
    },
    enabled: !!user?.email
  })

  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm">
      <h1 className="text-3xl font-bold text-[#0A2533] mb-6">Payment History</h1>
      <p className="text-gray-600">Here you can view the record of all your successful transactions.</p>
      
      <div className="overflow-x-auto mt-8">
        <table className="w-full text-left border-collapse whitespace-nowrap">
          <thead>
            <tr className="bg-gray-50 text-slate-700 text-sm uppercase tracking-wide">
              <th className="p-4 rounded-tl-xl font-semibold">#</th>
              <th className="p-4 font-semibold">Parcel Name</th>
              <th className="p-4 font-semibold">Amount</th>
              <th className="p-4 font-semibold">Transaction ID</th>
              <th className="p-4 font-semibold">Tracking ID</th>
              <th className="p-4 font-semibold">Date</th>
              <th className="p-4 rounded-tr-xl font-semibold text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.length > 0 ? (
              payments.map((payment, index) => (
                <tr key={payment._id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors text-sm">
                  <td className="p-4 text-gray-600 font-medium">{index + 1}</td>
                  <td className="p-4 font-medium text-slate-800">{payment.parcelName}</td>
                  <td className="p-4 font-semibold text-green-600">
                    {payment.amount} <span className="uppercase">{payment.currency}</span>
                  </td>
                  <td className="p-4 font-mono text-xs text-gray-500">{payment.transactionId}</td>
                  <td className="p-4 font-mono text-xs font-bold text-blue-600">{payment.trackingId}</td>
                  <td className="p-4 text-gray-600">{new Date(payment.paid_at).toLocaleDateString()}</td>
                  <td className="p-4 text-center">
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold inline-block capitalize">
                      {payment.paymentStatus}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="p-8 text-center text-gray-500">No payment history found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default PaymentHistory
