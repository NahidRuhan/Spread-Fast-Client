import Border from "../../shared/border/Border"
import Banner from "../banner/Banner"
import BannerMerchant from "../banner/BannerMerchant"
import Colab from "../colab/Colab"
import Faq from "../faq/Faq"
import Feature from "../feature/Feature"
import HowItWorks from "../how-it-works/HowItWorks"
import Review from "../review/Review"
import OurService from "../services/OurService"

const reviewsPromise = fetch('/reviews.json').then(res=>res.json())

const Home = () => {
  return (
    <div className="space-y-10">
      <Banner></Banner>
      <HowItWorks></HowItWorks>
      <OurService></OurService>
      <Colab></Colab>
      <Border></Border>
      <Feature></Feature>
      <Border></Border>
      <BannerMerchant></BannerMerchant>
      <Review reviewsPromise={reviewsPromise}></Review>
      <Faq></Faq>
    </div>
  )
}

export default Home
