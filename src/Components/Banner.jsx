import React from 'react'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { Link } from 'react-router';

var settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 800,
    cssEase: "ease-in-out",
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    pauseOnHover: false,
    pauseOnFocus: true,
};

const  SlideList = [
    {
        id: 1,
        img: "https://i.ibb.co/0RvbyGYz/38014.jpg",
        title:" Stay Fresh, Eat Smart",
        description:"Keep track of expiry dates and enjoy your food at its freshest. FoodGuard helps you reduce waste and eat healthy every day."
    },
    {
        id: 2,
        img: "https://i.ibb.co/8DzS65Ms/2149230519.jpg",
        title:"Never Miss an Expiry Date",
        description:"Get real-time alerts before your food expires. Say goodbye to spoiled groceries and hello to smart kitchen management."
    },
    {
        id: 3,
        img: "https://i.ibb.co/7ws6VhS/2149316581.jpg",
        title:"Save Food, Save Money",
        description:"Wasting food is wasting money. With FoodGuard, you know what to use and when — helping your wallet and the planet."
    },
];


function Banner() {
   return (
    <div className='  w-full mx-auto pb-10'>
                  <Slider {...settings}>
                 {SlideList.map((data)=>(
                    <div key={data.id}>
                        <div className=' flex  pt-12 sm:px-20 px-8 place-items-center justify-center md:justify-start h-[400px] sm:h-[650px] w-full' 
                        style={{
            backgroundImage: `linear-gradient(to bottom right, rgba(0, 0, 0, 0.9), rgba(17, 17, 17, 0.6)),url(${data.img})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}>
                     <div className=' flex flex-col justify-center items-center  gap-4  sm:pt-8   text-center w-full  '>
                  <h1 className='text-2xl  lg:w-[70%] sm:text-6xl lg:text-7xl font-bold text-white'>{data.title}</h1>
                  <p className='text-sm  text-white py-4 lg:w-[50%]'>{data.description}</p>
                <Link to='/fridge'> <button className='btn btn-primary dark:bg-[#c71f37] dark:border-none '>Learn More</button></Link>
                     </div>
                     
                     </div>
                    </div>

                   ))}
                 </Slider>
          </div>
  )
}

export default Banner