import Accordion from "./Accordion";

const Faq = () => {
    const data = [
  {
    question: "How can I track my parcel?",
    answer: "You can track your parcel in real-time using our live tracking feature. Simply enter your unique tracking number on our tracking page to see the current status and location of your shipment."
  },
  {
    question: "What happens if my parcel is damaged during delivery?",
    answer: "We guarantee 100% safe delivery and handle all items with the utmost care. In the rare event that a parcel arrives damaged, please contact our 24/7 support team immediately for a swift resolution."
  },
  {
    question: "Can I change my delivery address after placing an order?",
    answer: "Yes, you can update your delivery address as long as the parcel has not yet been dispatched from our facility. You can do this directly through your account dashboard or by contacting customer support."
  },
  {
    question: "Do you offer international shipping?",
    answer: "Yes, we provide reliable international shipping to over 100 countries. Delivery times and shipping rates will vary depending on the destination and the selected shipping method."
  },
  {
    question: "How do I reach customer support if I have a problem?",
    answer: "Our dedicated support team is available 24/7. You can reach us anytime via our toll-free call center, email, or the live chat feature available on our website."
  }
];

  return (
    <div className="flex flex-col gap-5 items-center px-4">
        <p className="text-secondary font-extrabold text-3xl md:text-5xl text-center">Frequently Asked Question (FAQ)</p>
        <p className="text-center max-w-2xl text-gray-600">Enhance posture, mobility, and well-being effortlessly with Posture Pro. Achieve proper alignment, reduce pain, and strengthen your body with ease!</p>
        <div className="space-y-3 w-full max-w-4xl mt-6">
      {
        data.map((data,idx)=><Accordion key={idx} data={data}></Accordion>)
      }            
        </div>

    </div>
  )
}

export default Faq
