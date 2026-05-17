
const ReviewCard = ({ reviewData, positionOffset }) => {
  const { userName, review, user_photoURL, user_email } = reviewData;

  // Base styles
  let cardStyle = "absolute w-80 md:w-[400px] transition-all duration-700 ease-in-out p-8 rounded-[2rem] ";
  let contentOpacity = "opacity-100";
  let quoteColor = "text-[#9cd1d8]"; 
  let textColor = "text-gray-600";
  let titleColor = "text-[#0d3b3e]"; 

  if (positionOffset === 0) {
    // Active Center Card - No translation
    cardStyle += "z-30 scale-100 translate-x-0 translate-y-0 bg-white shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] opacity-100";
  } else if (positionOffset === -1) {
    // Immediate Left Card - Pushed further left (-105%) and down (translate-y-8)
    cardStyle += "z-20 scale-90 -translate-x-[85%] md:-translate-x-[105%] translate-y-8 bg-[#e9f0f1] opacity-60";
    quoteColor = "text-[#d1dde0]";
    textColor = "text-gray-400";
    titleColor = "text-gray-400";
  } else if (positionOffset === 1) {
    // Immediate Right Card - Pushed further right (105%) and down (translate-y-8)
    cardStyle += "z-20 scale-90 translate-x-[85%] md:translate-x-[105%] translate-y-8 bg-[#e9f0f1] opacity-60";
    quoteColor = "text-[#d1dde0]";
    textColor = "text-gray-400";
    titleColor = "text-gray-400";
  } else if (positionOffset <= -2) {
    // Far Left Cards - Pushed very far left and even further down (translate-y-16)
    cardStyle += "z-10 scale-75 -translate-x-[140%] md:-translate-x-[180%] translate-y-16 bg-[#e9f0f1] opacity-30";
    contentOpacity = "opacity-50";
  } else if (positionOffset >= 2) {
    // Far Right Cards - Pushed very far right and even further down (translate-y-16)
    cardStyle += "z-10 scale-75 translate-x-[140%] md:translate-x-[180%] translate-y-16 bg-[#e9f0f1] opacity-30";
    contentOpacity = "opacity-50";
  }

  return (
    <div className={cardStyle}>
      <div className={contentOpacity}>
        {/* Quote Icon */}
        <svg className={`w-10 h-10 mb-4 ${quoteColor} fill-current`} viewBox="0 0 24 24">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>

        {/* Review Text */}
        <p className={`${textColor} text-[15px] leading-relaxed mb-8 min-h-25`}>
          {review}
        </p>

        {/* Dashed Divider */}
        <div className="w-full border-t border-dashed border-gray-300 mb-6"></div>

        {/* User Info */}
        <div className="flex items-center gap-4">
          {user_photoURL ? (
            <img src={user_photoURL} alt={userName} className="w-12 h-12 rounded-full object-cover bg-gray-200" />
          ) : (
            <div className="w-12 h-12 rounded-full bg-[#0d3b3e]"></div>
          )}
          
          <div>
            <h4 className={`font-bold ${titleColor}`}>{userName}</h4>
            <p className={`text-xs mt-0.5 ${positionOffset === 0 ? 'text-gray-500' : 'text-gray-400'}`}>
              {user_email || 'Customer'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;