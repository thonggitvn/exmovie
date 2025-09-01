import React from 'react'
import { Carousel } from 'antd';

const classNameCarousel = "w-full aspect-[3/1]";

const CarouselMovie = () => {
    
    return (
    <Carousel arrows >
      <div>
            <img
            className={classNameCarousel}
            src="https://cdn.mos.cms.futurecdn.net/BHfB3wkLrDfwTU55qkrfzP.jpg"
            alt=""
            />
      </div>
      <div>
            <img
            className={classNameCarousel}
            src="https://c8.alamy.com/comp/2K5WJ4K/avengers-assemble-2012-movie-poster-2K5WJ4K.jpg"
            alt=""
            />
      </div>
      <div>
            <img
            className={classNameCarousel}
            src="https://cdn.mos.cms.futurecdn.net/BHfB3wkLrDfwTU55qkrfzP.jpg"
            alt=""
            />
      </div>
      <div>
            <img
            className={classNameCarousel}
            src="https://c8.alamy.com/comp/2K5WJ4K/avengers-assemble-2012-movie-poster-2K5WJ4K.jpg"
            alt=""
            />
      </div>
      
    </Carousel>
  );
}

export default CarouselMovie