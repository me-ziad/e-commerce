import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {NavLink } from 'react-router-dom';
import Slider from 'react-slick';

export default function CategorySlider() {


    const [loader, setLoader] = useState(true)
    const [categorys, setCategory] = useState([]);
    var settings = {
        dots: false,
        infinite: true,
        speed: 1000,
        slidesToShow: 7,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows : false,

  
      };

    async function categorySliderImg(){
try{
    
    let {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/categories')
    // console.log(data.data)
    setCategory(data.data)
    setLoader(false)

}catch(err){
    console.log(err);
}
    }

    useEffect(()=>{
        categorySliderImg()
    },[]
)
  return<>

  <NavLink to={'/category'}>
            <Slider {...settings}>               
                        {categorys.map((category)=><div key={category._id} className='my-10'>
                        
                                <img src={category.image} className='w-full h-[200px] object-cover object-center' alt="" />
                        </div>
                        )}
                       </Slider>  
                        </NavLink>

  </>
}
