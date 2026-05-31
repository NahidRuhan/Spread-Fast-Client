import FastMarquee from "react-fast-marquee";
import img1 from "../../../assets/brands/amazon.png"
import img2 from "../../../assets/brands/amazon_vector.png"
import img3 from "../../../assets/brands/casio.png"
import img4 from "../../../assets/brands/moonstar.png"
import img5 from "../../../assets/brands/randstad.png"
import img6 from "../../../assets/brands/star.png"
import img7 from "../../../assets/brands/start_people.png"

// Interop handling in case Vite imports the module as an object with a default property
const Marquee = FastMarquee.default || FastMarquee;
const brandLogo = [img1,img2,img3,img4,img5,img6,img7]

const Colab = () => {
  return (
    <div className="py-8 flex flex-col justify-center items-center gap-6 md:gap-10 overflow-hidden px-4 text-center">
        <p className="font-extrabold text-2xl md:text-3xl text-secondary">We've helped thousands of sales teams</p>
      <Marquee speed={60}>
    {
        brandLogo.map((logo,idx)=><img key={idx} src={logo} alt="Amazon" className="mx-8 w-24 md:w-32 object-contain" />)
    }
      </Marquee>
    </div>
  );
};

export default Colab;
