import { Helmet } from "react-helmet";
import CategorySlider from "../CategorySlider/CategorySlider";
import HomeSliderCateory from "../HomeSliderCategory/HomeSliderCateory";
import Loader from "../Loader/loader";
import RecentProduct from "../RecentProduct/RecentProduct";


export default function Home() {

  return<>

    <div className="container overflow-hidden">
      <HomeSliderCateory></HomeSliderCateory>
       <Helmet>
                      <title>Home</title>
                      <link rel="canonical" href="http://mysite.com/example" />
                  </Helmet>


    <CategorySlider></CategorySlider>
      <RecentProduct></RecentProduct>   

    </div>

  </>
}
