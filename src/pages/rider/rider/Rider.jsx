import { useForm, useWatch } from "react-hook-form";
import riderImg from "../../../assets/agent-pending.png";
// import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useLoaderData } from "react-router";

const Rider = () => {
  const {
    register,
    handleSubmit,
    control,
    // formState: { errors },
  } = useForm();

  // const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const serviceCenters = useLoaderData();
  const uniqueRegions = serviceCenters
    ? [...new Set(serviceCenters.map((center) => center.region))]
    : [];
  const selectedRiderRegion = useWatch({ control, name: "region" });
  const riderDistrict =
    serviceCenters && selectedRiderRegion
      ? [
          ...new Set(
            serviceCenters
              .filter((c) => c.region === selectedRiderRegion)
              .map((c) => c.district),
          ),
        ]
      : [];

  const onSubmit = (data) => {
    console.log("Rider Application Data:", data);
    // Add your API call here
    axiosSecure.post('/riders',data)
    .then(()=>alert("Rider created"))
  };

  const inputClass =
    "w-full border border-gray-200 rounded-md p-3 text-sm outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors mt-1 placeholder-gray-400";
  const labelClass = "text-sm font-medium text-slate-800 block";

  return (
    <div className="bg-white rounded-3xl p-8 md:p-16 w-full shadow-sm">
      {/* Header Section */}
      <div className="mb-10 max-w-xl">
        <h1 className="text-4xl font-bold text-[#0A2533] mb-4">Be a Rider</h1>
        <p className="text-gray-500 text-sm leading-relaxed">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to business shipments — we deliver on
          time, every time.
        </p>
      </div>

      {/* Section Title */}
      <h2 className="text-2xl font-bold text-[#0A2533] mb-6 pb-6 border-b border-gray-100">
        Tell us about yourself
      </h2>

      {/* Main Content Grid (Form + Image) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left Column: Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className={labelClass}>Your Name</label>
            <input
              type="text"
              placeholder="Your Name"
              {...register("name", { required: true })}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Driving License Number</label>
            <input
              type="text"
              placeholder="Driving License Number"
              {...register("licenseNumber", { required: true })}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Your Email</label>
            <input
              type="email"
              placeholder="Your Email"
              {...register("email", { required: true })}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Your Region</label>
            <select
              {...register("region", { required: true })}
              className={`${inputClass} bg-white`}
            >
              <option value="">Select your Region</option>
              {uniqueRegions.map((region, index) => (
                <option key={index} value={region}>
                  {region}
                </option>
              ))}
            </select>
          </div>

                <div>
                  <label className={labelClass}>Your District</label>
                  <select
                    {...register('district', { required: true })}
                    className={`${inputClass} bg-white`}
                    disabled={!selectedRiderRegion}
                  >
                    <option value="">Select your District</option>
                    {riderDistrict.map((district, index) => (
                      <option key={index} value={district}>{district}</option>
                    ))}
                  </select>
                </div>

          <div>
            <label className={labelClass}>NID No</label>
            <input
              type="text"
              placeholder="NID"
              {...register("nid", { required: true })}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Phone Number</label>
            <input
              type="tel"
              placeholder="Phone Number"
              {...register("phone", { required: true })}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Bike Brand Model and Year</label>
            <input
              type="text"
              placeholder="Bike Brand Model and Year"
              {...register("bikeDetails", { required: true })}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Bike Registration Number</label>
            <input
              type="text"
              placeholder="Bike Registration Number"
              {...register("bikeRegistration", { required: true })}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Tell Us About Yourself</label>
            <input
              type="text"
              placeholder="Tell Us About Yourself"
              {...register("aboutYourself")}
              className={inputClass}
            />
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-primary hover:cursor-pointer text-[#0A2533] font-semibold py-3 px-8 rounded-md transition-colors"
            >
              Submit
            </button>
          </div>
        </form>

        {/* Right Column: Illustration Image */}
        <div className="hidden lg:flex justify-center items-center h-full">
          {/* Replace the src with your actual image path */}
          <img
            src={riderImg}
            alt="Rider Illustration"
            className="w-full max-w-md object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Rider;
