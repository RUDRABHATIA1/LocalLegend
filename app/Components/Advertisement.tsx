'use client'

import React from 'react'
import Image from 'next/image'

import ad1 from '../assets/ad5.jpg'
import ad2 from '../assets/ad6.jpg'
import ad3 from '../assets/ad7.jpg'
import ad4 from '../assets/ad8.jpg'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, EffectCoverflow, Autoplay } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/effect-coverflow'

const Advertisement = () => {
  return (
    <div className='p-3'>
    <section className="ad-section">
      <Swiper
        modules={[Pagination, EffectCoverflow, Autoplay]}
        effect="coverflow"
        centeredSlides={true}
        slidesPerView="auto"
        spaceBetween={60}
        grabCursor={true}
        loop={false}
        autoplay={{
          delay: 8000,             
          disableOnInteraction: false,
          pauseOnMouseEnter: true,  
        }}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 120,
          modifier: 2,
          slideShadows: false,
        }}
        pagination={{ clickable: true }}
      >
        <SwiperSlide className="ad-slide">
          <Image src={ad1} alt="Ad 1" height={335} width={2020} className="ad-img" />
        </SwiperSlide>

        <SwiperSlide className="ad-slide">
          <Image src={ad2}   alt="Ad 2" height={335} width={2020} className="ad-img" />
        </SwiperSlide>

        <SwiperSlide className="ad-slide">
          <Image src={ad3} alt="Ad 3" height={335} width={2020} className="ad-img" />
        </SwiperSlide>

        <SwiperSlide className="ad-slide">
          <Image src={ad4} alt="Ad 4" height={335} width={2020} className="ad-img" />
        </SwiperSlide>
      </Swiper>
    </section>
    </div>
  )
}

export default Advertisement

