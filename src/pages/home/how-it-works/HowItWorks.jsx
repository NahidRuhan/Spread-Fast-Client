import icon from '../../../assets/bookingIcon.png'
const HowItWorks = () => {
    const data = [
        {
            title: "Booking Pick & Drop",
            description: "Easily schedule a pickup from your location and have it delivered directly to the destination with real-time tracking."
        },
        {
            title: "Cash On Delivery",
            description: "Secure and reliable payment collection from your customers upon successful delivery of their orders."
        },
        {
            title: "Delivery Hub",
            description: "Our centralized fulfillment centers ensure rapid sorting, processing, and dispatching for faster delivery times."
        },
        {
            title: "Booking SME & Corporate",
            description: "Tailored logistics solutions for small businesses and enterprises, offering bulk shipments and dedicated support."
        },
    ]
  return (
    <div className='space-y-10 px-20'>
      <p className="test-secondary font-extrabold text-4xl">How it Works</p>
      <div className="flex gap-6 justify-around">

        {
            data.map((data, index)=>
        <div key={index} className='p-8 text-secondary border rounded-4xl space-y-3 hover:bg-primary transition-colors duration-300 cursor-pointer'>
            <img src={icon} alt="" />
            <p className='font-bold text-xl'>{data.title}</p>
            <p>{data.description}</p>
        </div>)
        }
        
      </div>
    </div>
  )
}

export default HowItWorks
