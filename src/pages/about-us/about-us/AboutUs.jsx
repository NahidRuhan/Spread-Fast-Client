import { useState } from 'react';

const AboutUs = () => {
  // State to handle the active tab
  const [activeTab, setActiveTab] = useState('Story');

  // Tab data structure containing the text content for each section
  const tabContent = {
    Story: [
      "We started with a simple promise — to make parcel delivery fast, reliable, and stress-free. Over the years, our commitment to real-time tracking, efficient logistics, and customer-first service has made us a trusted partner for thousands. Whether it's a personal gift or a time-sensitive business delivery, we ensure it reaches its destination — on time, every time.",
      "We started with a simple promise — to make parcel delivery fast, reliable, and stress-free. Over the years, our commitment to real-time tracking, efficient logistics, and customer-first service has made us a trusted partner for thousands. Whether it's a personal gift or a time-sensitive business delivery, we ensure it reaches its destination — on time, every time.",
      "We started with a simple promise — to make parcel delivery fast, reliable, and stress-free. Over the years, our commitment to real-time tracking, efficient logistics, and customer-first service has made us a trusted partner for thousands. Whether it's a personal gift or a time-sensitive business delivery, we ensure it reaches its destination — on time, every time."
    ],
    Mission: [
      "Our mission is to revolutionize urban logistics by providing seamless, sustainable, and lightning-fast delivery networks. We empower businesses and individuals alike by bridging distances with cutting-edge tracking software and an elite fleet of riders dedicated to care and speed.",
      "We aim to set a new standard for transparency in delivery services, eliminating the traditional friction points of waiting times and opaque pricing structures."
    ],
    Success: [
      "With over millions of parcels safely delivered across the region, our success is measured by the growth of the businesses we support and the smiles on our customers' faces. We pride ourselves on a 99.8% on-time delivery rate and zero-loss operations.",
      "Through continuously optimized route algorithms and dedicated support channels, we keep setting industry milestones day after day."
    ],
    "Team & Others": [
      "Behind ZapShift is a diverse group of logistics experts, software engineers, and passionate customer advocates working 24/7 to move your world. We believe that a happy team breeds happy customers, which is why we invest heavily in rider welfare and workplace innovation.",
      "Together, we build the infrastructure that powers commerce and connection in our cities."
    ]
  };

  const tabs = ['Story', 'Mission', 'Success', 'Team & Others'];

  return (
      <div className="bg-white rounded-3xl p-8 md:p-16 w-full shadow-sm">
        
        {/* Header Section */}
        <div className="mb-10 max-w-xl">
          <h1 className="text-4xl font-bold text-[#0A2533] mb-4">About Us</h1>
          <p className="text-gray-500 text-sm leading-relaxed">
            Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal 
            packages to business shipments — we deliver on time, every time.
          </p>
        </div>
        

        {/* Divider */}
        <div className="border-b border-gray-100 mb-8"></div>

        {/* Tab Navigation Controls */}
        <div className="flex flex-wrap gap-x-8 gap-y-4 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-lg font-medium transition-all duration-200 outline-none ${
                activeTab === tab
                  ? 'text-[#608035] font-semibold' // Active green/olive color matching design
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Dynamic Content Display */}
        <div className="space-y-6">
          {tabContent[activeTab].map((paragraph, index) => (
            <p 
              key={index} 
              className="text-gray-500 text-sm leading-relaxed max-w-4xl"
            >
              {paragraph}
            </p>
          ))}
        </div>

      </div>
  );
};

export default AboutUs;