import liveTracking from "../../../assets/live-tracking.png"
import safeDelivery from "../../../assets/safe-delivery.png"
import tinyDeliveryMan from "../../../assets/tiny-deliveryman.png"
import FeatureCard from "./FeatureCard";

const Feature = () => {

    const data = [
  {
    image: liveTracking, // Placeholder for the actual image path
    title: "Live Parcel Tracking",
    description: "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind."
  },
  {
    image: safeDelivery, // Placeholder for the actual image path
    title: "100% Safe Delivery",
    description: "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time."
  },
  {
    image: tinyDeliveryMan, // Placeholder for the actual image path
    title: "24/7 Call Center Support",
    description: "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us."
  }

];
  return (
    <div className="flex flex-col gap-5 px-4 md:px-0">

        {
            data.map((data,idx)=><FeatureCard key={idx} data={data}></FeatureCard>)
        }
      
    </div>
  )
}

export default Feature
