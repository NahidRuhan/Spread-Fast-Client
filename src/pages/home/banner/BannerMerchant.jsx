import locationMerchant from "../../../assets/location-merchant.png";

const BannerMerchant = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 justify-between items-center gap-10 lg:gap-5 p-8 md:p-12 lg:p-20 bg-secondary rounded-4xl mx-4 md:mx-0">
      <div className="space-y-5 lg:col-span-3 text-center lg:text-left">
        <p className="font-extrabold text-3xl md:text-4xl lg:text-5xl text-white leading-tight">
          Merchant and Customer Satisfaction is Our First Priority
        </p>
        <p className="text-white text-sm md:text-base">
          We offer the lowest delivery charge with the highest value along with
          100% safety of your product. Spread Fast courier delivers your parcels in
          every corner of Bangladesh right on time.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
          <button className="bg-primary text-[#1f1f1f] py-3 px-6 md:py-4 md:px-8 rounded-full font-bold text-base md:text-xl border">
            Become a Merchant
          </button>
          <button className="text-primary py-3 px-6 md:py-4 md:px-8 font-bold text-base md:text-xl border bg-secondary rounded-full">
            Earn with Spread Fast Courier
          </button>
        </div>
      </div>
      <img className="lg:col-span-2 w-full max-w-sm mx-auto" src={locationMerchant} alt="" />
    </div>
  );
};

export default BannerMerchant;
