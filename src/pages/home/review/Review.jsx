import { use, useState } from "react";
import ReviewCard from "./ReviewCard";

const Review = ({ reviewsPromise }) => {
  const reviews = use(reviewsPromise);
  const [activeIndex, setActiveIndex] = useState(1);

  if (!reviews || reviews.length === 0) return null;

  const nextSlide = () => {
    setActiveIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  return (
    <div className="py-16 px-4 flex flex-col items-center overflow-hidden font-sans">
      
      {/* 1. Header */}
      <div className="text-center max-w-2xl mb-16 relative z-40">
        <div className="flex justify-center mb-6">
          <svg className="w-48 h-24 text-[#0f6c75]" viewBox="0 0 200 100" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M70 80 H130 M85 80 V40 L95 40 M95 40 L95 80 M75 80 A 4 4 0 1 1 75 79 M105 80 V50 H125 V80 M105 65 H125 M115 50 V40 H135 V80 M135 60 L145 50 M145 50 L145 60" />
            <rect x="75" y="60" width="15" height="15" />
            <rect x="80" y="45" width="15" height="15" />
            <rect x="100" y="60" width="20" height="20" />
            <rect x="120" y="55" width="20" height="25" />
          </svg>
        </div>
        <h2 className="text-4xl font-extrabold text-[#0d3b3e] mb-4">
          What our customers are sayings
        </h2>
        <p className="text-[#8c9c9f] text-sm md:text-base px-8 leading-relaxed font-medium">
          Enhance posture, mobility, and well-being effortlessly with Posture Pro. Achieve proper alignment, reduce pain, and strengthen your body with ease!
        </p>
      </div>

      {/* 2. Carousel Container - HEIGHT INCREASED HERE */}
      <div className="relative w-full max-w-7xl h-112 flex justify-center mb-10 items-start pt-4">
        {reviews.map((review, index) => {
          let offset = index - activeIndex;
          const total = reviews.length;
          
          if (offset < -Math.floor(total / 2)) offset += total;
          if (offset > Math.floor(total / 2)) offset -= total;

          return (
            <ReviewCard 
              key={review.id || index} 
              reviewData={review} 
              positionOffset={offset} 
            />
          );
        })}
      </div>

      {/* 3. Navigation Controls */}
      <div className="flex items-center gap-6 z-40">
        <button 
          onClick={prevSlide}
          className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md hover:bg-primary transition-colors"
        >
          <svg className="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
        
        <div className="flex gap-2.5 items-center">
          {reviews.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`rounded-full transition-all duration-300 ${
                index === activeIndex 
                  ? 'bg-[#0d3b3e] w-2.5 h-2.5' 
                  : 'bg-[#a3c9cd] w-2 h-2 hover:bg-[#72a1a6]'
              }`}
            />
          ))}
        </div>

        <button 
          onClick={nextSlide}
          className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md hover:bg-primary transition-colors"
        >
          <svg className="w-5 h-5 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>

    </div>
  );
};

export default Review;