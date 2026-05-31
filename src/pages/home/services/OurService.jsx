import icon from "../../../assets/service.png"
const OurService = () => {
    const data = [
  {
    title: "Express & Standard Delivery",
    description: "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off."
  },
  {
    title: "Nationwide Delivery",
    description: "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours."
  },
  {
    title: "Fulfillment Solution",
    description: "We also offer customized service with inventory management support, online order processing, packaging, and after sales support."
  },
  {
    title: "Cash on Home Delivery",
    description: "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product."
  },
  {
    title: "Corporate Service / Contract In Logistics",
    description: "Customized corporate services which includes warehouse and inventory management support."
  },
  {
    title: "Parcel Return",
    description: "Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants."
  }
];
  return (
    <div className="text-center items-center bg-secondary py-12 px-6 md:py-24 md:px-20 lg:px-40 rounded-4xl space-y-5 mx-4 md:mx-0">
        <p className="text-white font-extrabold text-3xl md:text-[40px]">Our Services</p>
        <p className="font-medium text-sm md:text-base text-white">Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {
                    data.map((data, index)=>
                <div key={index} className='flex flex-col items-center p-6 md:p-8 text-black border rounded-4xl space-y-3 bg-white hover:bg-primary transition-colors duration-300 cursor-pointer'>
                    <img src={icon} alt="" />
                    <p className='font-bold text-xl'>{data.title}</p>
                    <p>{data.description}</p>
                </div>)
                }
                
              </div>
      
    </div>
  )
}

export default OurService
