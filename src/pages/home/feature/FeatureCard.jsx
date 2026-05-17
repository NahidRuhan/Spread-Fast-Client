
const FeatureCard = ({ data }) => {
    const {image, title, description} = data
  return (
    <div className="bg-white rounded-4xl p-8 md:p-10 w-full max-w-5xl mx-auto flex flex-col md:flex-row items-center md:items-stretch gap-8 md:gap-4 shadow-sm md:h-75">
      
      {/* 1. Illustration Container */}
      <div className="w-full md:w-1/3 flex justify-center items-center shrink-0">
        {/* Handles both image URLs (strings) or inline SVG React elements */}
        {typeof image === 'string' ? (
          <img src={image} alt={title} className="w-48 h-48 object-contain" />
        ) : (
          image
        )}
      </div>

      {/* 2. Content Container with Dashed Divider */}
      <div className="w-full md:w-2/3 flex flex-row items-center">
        
        {/* Vertical Dashed Line Divider (Hidden on small screens) */}
        <div className="hidden md:block h-32 border-l border-dashed border-[#81aeb3] mr-8 shrink-0"></div>
        
        {/* Text Box */}
        <div>
          <h3 className="text-xl font-bold text-[#0d3b3e] mb-3">
            {title}
          </h3>
          <p className="text-[#8c9c9f] text-[15px] leading-relaxed">
            {description}
          </p>
        </div>
        
      </div>

    </div>
  );
};

export default FeatureCard;