import { Helmet } from "react-helmet-async";
import CategorySlider from "../CategorySlider/CategorySlider";
import HomeSliderCateory from "../HomeSliderCategory/HomeSliderCateory";
import RecentProduct from "../RecentProduct/RecentProduct";

export default function Home() {
  return (
    <>
      <div className="  overflow-hidden">
        <HomeSliderCateory></HomeSliderCateory>
        <Helmet>
          <title>Home</title>
          <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>

        <CategorySlider></CategorySlider>
        <RecentProduct></RecentProduct>
      </div>
    </>
  );
}
