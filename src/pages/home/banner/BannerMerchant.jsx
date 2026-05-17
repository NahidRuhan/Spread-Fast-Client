import locationMerchant from "../../../assets/location-merchant.png";

const BannerMerchant = () => {
  return (
    <div className="grid grid-cols-5 justify-between gap-5 p-20 bg-secondary rounded-4xl">
      <div className="space-y-5 col-span-3">
        <p className="font-extrabold text-5xl text-white">
          Merchant and Customer Satisfaction is Our First Priority
        </p>
        <p className="text-white">
          We offer the lowest delivery charge with the highest value along with
          100% safety of your product. Spread Fast courier delivers your parcels in
          every corner of Bangladesh right on time.
        </p>
        <div className="flex gap-5">
          <button className="bg-primary p-5 text-[#1f1f1f] py-4 px-8 rounded-full font-bold text-xl border">
            Become a Merchant
          </button>
          <button className=" text-primary py-4 px-8 font-bold text-xl border bg-secondary rounded-full">
            Earn with Spread Fast Courier
          </button>
        </div>
      </div>
      <img className="col-span-2" src={locationMerchant} alt="" />
    </div>
  );
};

export default BannerMerchant;
