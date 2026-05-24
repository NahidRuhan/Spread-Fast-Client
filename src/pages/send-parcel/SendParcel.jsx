import { useForm, useWatch } from 'react-hook-form';
import { useLoaderData } from 'react-router';
import { useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';

const SendParcel = () => {
  const {user} = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    // formState: { errors },
  } = useForm({
    defaultValues: {
      documentType: 'Document',
      senderEmail: user?.email || '',
    },
  });

  const axiosSecure = useAxiosSecure();
  const serviceCenters = useLoaderData();


  // Extract unique regions from the serviceCenters data
  const uniqueRegions = serviceCenters ? [...new Set(serviceCenters.map(center => center.region))] : [];

  const selectedSenderRegion = useWatch({ control, name: 'senderRegion' });
  const selectedReceiverRegion = useWatch({ control, name: 'receiverRegion' });

  // Watch fields for delivery charge calculation
  const documentType = useWatch({ control, name: 'documentType', defaultValue: 'Document' });
  const parcelWeight = useWatch({ control, name: 'parcelWeight' });
  const senderDistrict = useWatch({ control, name: 'senderDistrict' });
  const receiverDistrict = useWatch({ control, name: 'receiverDistrict' });

  const senderDistricts = serviceCenters && selectedSenderRegion 
    ? [...new Set(serviceCenters.filter(c => c.region === selectedSenderRegion).map(c => c.district))] : [];
  const receiverDistricts = serviceCenters && selectedReceiverRegion 
    ? [...new Set(serviceCenters.filter(c => c.region === selectedReceiverRegion).map(c => c.district))] : [];

  // Calculate delivery charge reactively
  let deliveryCharge = 0;
  if (senderDistrict && receiverDistrict && (documentType === 'Document' || parcelWeight)) {
    const isWithinCity = senderDistrict === receiverDistrict;
    const isDocument = documentType === "Document";
    const weight = parseFloat(parcelWeight) || 0;
    const isWeightAbove3 = weight > 3;

    if (isDocument && isWithinCity) deliveryCharge = 60;
    else if (isDocument && !isWithinCity) deliveryCharge = 80;
    else if (!isDocument && !isWeightAbove3 && isWithinCity) deliveryCharge = 110;
    else if (!isDocument && !isWeightAbove3 && !isWithinCity) deliveryCharge = 150;
    else if (!isDocument && isWeightAbove3 && isWithinCity) deliveryCharge = weight * 40;
    else if (!isDocument && isWeightAbove3 && !isWithinCity) deliveryCharge = (weight * 40) + 40;
  }

  const onSubmit = (data) => {
    const finalData = { ...data, deliveryCharge };
    console.log('Form Data Submitted:', finalData);
    console.log("The cost is: ", deliveryCharge);
    // Add your API call here
    axiosSecure.post('/parcels', finalData)
      .then(res => {
        console.log("after saving parcel: ", res.data);
        if (res.data.insertedId) {
          Swal.fire({
            title: 'Success!',
            text: 'Your parcel has been booked successfully.',
            icon: 'success',
            showCancelButton: true,
            confirmButtonText: 'Proceed to Payment',
            cancelButtonText: 'Pay Later'
          }).then((result) => {
            if (result.isConfirmed) {
              navigate(`/dashboard/payment/${res.data.insertedId}`);
            }
          });
        }
      })
      .catch(error => {
        console.error("Error saving parcel: ", error);
        Swal.fire({
          title: 'Error!',
          text: 'Something went wrong while booking your parcel.',
          icon: 'error',
          confirmButtonText: 'Try Again'
        });
      });

    // Old method 

    //     fetch('http://localhost:8000/parcels', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(finalData),
    // })
    //   .then((res) => res.json())
    //   .then((data) => console.log("after saving parcel: ", data))
    //   .catch((error) => console.error("Error saving parcel: ", error));
    
  };



  const inputClass = "w-full border border-gray-200 rounded-md p-3 text-sm outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors mt-1 placeholder-gray-400";
  const labelClass = "text-sm font-medium text-slate-800";

  return (
    <div className="bg-white rounded-3xl p-8 md:p-16 w-full flex-1 shadow-sm">
        
        {/* Header Section */}
        <h1 className="text-4xl font-bold text-[#0A2533] mb-6">Send A Parcel</h1>
        <h2 className="text-xl font-semibold text-[#0A2533] mb-6 pb-6 border-b border-gray-100">
          Enter your parcel details
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Radio Buttons for Document Type */}
          <div className="flex items-center gap-6 mb-8">
            <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-slate-800">
              <input
                type="radio"
                value="Document"
                {...register('documentType')}
                className="w-5 h-5 text-green-500 bg-gray-100 border-gray-300 focus:ring-green-500 accent-[#28a745]"
              />
              Document
            </label>
            <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-slate-800">
              <input
                type="radio"
                value="Not-Document"
                {...register('documentType')}
                className="w-5 h-5 text-green-500 bg-gray-100 border-gray-300 focus:ring-green-500 accent-[#28a745]"
              />
              Not-Document
            </label>
          </div>

          {/* Parcel General Details Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-8 pb-8 border-b border-gray-100">
            <div>
              <label className={labelClass}>Parcel Name</label>
              <input
                type="text"
                placeholder="Parcel Name"
                {...register('parcelName', { required: true })}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Parcel Weight (KG)</label>
              <input
                type="number"
                step="any"
                placeholder="Parcel Weight (KG)"
                {...register('parcelWeight', { required: true })}
                className={inputClass}
              />
            </div>
          </div>

          {/* Details Wrapper */}
          <div className="flex flex-col lg:flex-row gap-8 mb-8 pb-8 border-b border-gray-100">
            
            {/* Sender Details Section */}
            <div className="flex-1">
              <h3 className="text-xl font-bold text-[#0A2533] mb-6">Sender Details</h3>
              <div className="flex flex-col gap-6">
                <div>
                  <label className={labelClass}>Sender Name</label>
                  <input
                    type="text"
                    placeholder="Sender Name"
                    defaultValue={user?.displayName}
                    {...register('senderName', { required: true })}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Sender Phone No</label>
                  <input
                    type="tel"
                    placeholder="Sender Phone No"
                    {...register('senderPhone', { required: true })}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Sender Email</label>
                  <input
                    type="email"
                    defaultValue={user?.email}
                    placeholder="Sender Email"
                    {...register('senderEmail')}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Address</label>
                  <input
                    type="text"
                    placeholder="Address"
                    {...register('senderAddress', { required: true })}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Your Region</label>
                  <select
                    {...register('senderRegion', { required: true })}
                    className={`${inputClass} bg-white`}
                  >
                    <option value="">Select your Region</option>
                    {uniqueRegions.map((region, index) => (
                      <option key={index} value={region}>{region}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Your District</label>
                  <select
                    {...register('senderDistrict', { required: true })}
                    className={`${inputClass} bg-white`}
                    disabled={!selectedSenderRegion}
                  >
                    <option value="">Select your District</option>
                    {senderDistricts.map((district, index) => (
                      <option key={index} value={district}>{district}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Pickup Instruction</label>
                  <textarea
                    rows="3"
                    placeholder="Pickup Instruction"
                    {...register('pickupInstruction')}
                    className={`${inputClass} resize-none`}
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Receiver Details Section */}
            <div className="flex-1">
              <h3 className="text-xl font-bold text-[#0A2533] mb-6">Receiver Details</h3>
              <div className="flex flex-col gap-6">
                <div>
                  <label className={labelClass}>Receiver Name</label>
                  <input
                    type="text"
                    placeholder="Receiver Name" 
                    {...register('receiverName', { required: true })}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Receiver Contact No</label>
                  <input
                    type="tel"
                    placeholder="Receiver Contact No"
                    {...register('receiverPhone', { required: true })}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Receiver Email</label>
                  <input
                    type="email"
                    placeholder="Receiver Email"
                    {...register('receiverEmail')}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Receiver Address</label>
                  <input
                    type="text"
                    placeholder="Receiver Address"
                    {...register('receiverAddress', { required: true })}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Receiver Region</label>
                  <select
                    {...register('receiverRegion', { required: true })}
                    className={`${inputClass} bg-white`}
                  >
                    <option value="">Select a Region</option>
                    {uniqueRegions.map((region, index) => (
                      <option key={index} value={region}>{region}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Receiver District</label>
                  <select
                    {...register('receiverDistrict', { required: true })}
                    className={`${inputClass} bg-white`}
                    disabled={!selectedReceiverRegion}
                  >
                    <option value="">Select a District</option>
                    {receiverDistricts.map((district, index) => (
                      <option key={index} value={district}>{district}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Delivery Instruction</label>
                  <textarea
                    rows="3"
                    placeholder="Delivery Instruction"
                    {...register('deliveryInstruction')}
                    className={`${inputClass} resize-none`}
                  ></textarea>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Area */}
          <div className="mt-4">
            
            {/* Delivery Charge Display */}
            <div className="bg-gray-50 border border-gray-100 rounded-xl p-6 mb-6 flex justify-between items-center">
              <span className="text-xl font-bold text-[#0A2533]">Delivery Charge:</span>
              <span className="text-3xl font-bold text-green-600">৳ {deliveryCharge}</span>
            </div>

            <p className="text-sm font-medium text-slate-800 mb-6">
              * PickUp Time 4pm-7pm Approx.
            </p>
            <button
              type="submit"
              className="bg-primary hover:cursor-pointer text-[#0A2533] font-semibold py-3 px-8 rounded-md transition-colors"
            >
              Proceed to Confirm Booking
            </button>
          </div>
        </form>
        
      </div>
  );
};

export default SendParcel;