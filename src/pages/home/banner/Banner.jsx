import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import banner1 from "../../../assets/banner/banner1.png";
import banner2 from "../../../assets/banner/banner2.png";
import banner3 from "../../../assets/banner/banner3.png";
import { Link } from "react-router";

const Banner = () => {
  return (
    <div>
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showThumbs={false}
        showStatus={false}
      >
        <div className="relative">
          <img src={banner1} />
          <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 flex gap-5">
            <button className="bg-primary p-5 text-[#1f1f1f] py-4 px-8 rounded-full font-bold text-xl border hover:cursor-pointer">
              Track your parcel
            </button>
            <Link to="/rider">
              <button className=" text-[#1f1f1f] py-4 px-8 rounded-xl font-bold text-xl border bg-white hover:cursor-pointer">
                Be A Rider
              </button>
            </Link>
          </div>
        </div>
        <div className="relative">
          <img src={banner2} />
          <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 flex gap-5">
            <button className="bg-primary p-5 text-[#1f1f1f] py-4 px-8 rounded-full font-bold text-xl border hover:cursor-pointer">
              Track your parcel
            </button>
            <Link to="/rider">
              <button className=" text-[#1f1f1f] py-4 px-8 rounded-xl font-bold text-xl border bg-white hover:cursor-pointer">
                Be A Rider
              </button>
            </Link>
          </div>
        </div>
        <div className="relative">
          <img src={banner3} />
          <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 flex gap-5">
            <button className="bg-primary p-5 text-[#1f1f1f] py-4 px-8 rounded-full font-bold text-xl border hover:cursor-pointer">
              Track your parcel
            </button>
            <Link to="/rider">
              <button className=" text-[#1f1f1f] py-4 px-8 rounded-xl hover:cursor-pointer font-bold text-xl border bg-white">
                Be A Rider
              </button>
            </Link>
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;
