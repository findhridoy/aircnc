import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import React from "react";
import { NavLink } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import data from "../Data/Data";
import SearchForm from "./SearchForm";
import SwiperCard from "./SwiperCard";

function Banner() {
  return (
    <section className="banner__section">
      <div className="container">
        <div className="banner__title">
          <h3>Where do you want to go</h3>
        </div>
        <div className="banner__content">
          <div className="banner__left">
            <SearchForm />
          </div>
          <div className="banner__right">
            <div className="banner__experince">
              <div className="banner__subtitle">
                <h3 className="banner__subtitle--text">Expreiences</h3>
                <NavLink className="banner__subtitle--link" to="/experience">
                  See all <ArrowForwardIosIcon />
                </NavLink>
              </div>
              <Swiper
                spaceBetween={15}
                breakpoints={{
                  // when window width is >= 640px
                  340: {
                    slidesPerView: 1,
                  },
                  // when window width is >= 576px
                  576: {
                    slidesPerView: 2,
                  },
                  // when window width is >= 768px
                  768: {
                    slidesPerView: 3,
                  },
                  // when window width is >= 1200px
                  1200: {
                    slidesPerView: 4,
                  },
                }}
              >
                {data.map((hotelData) => (
                  <SwiperSlide key={hotelData.id}>
                    <SwiperCard hotelData={hotelData} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className="banner__home">
              <div className="banner__subtitle">
                <h3 className="banner__subtitle--text">Homes</h3>
                <NavLink className="banner__subtitle--link" to="/home">
                  See all <ArrowForwardIosIcon />
                </NavLink>
              </div>
              <Swiper
                spaceBetween={15}
                breakpoints={{
                  // when window width is >= 640px
                  340: {
                    slidesPerView: 1,
                  },
                  // when window width is >= 576px
                  576: {
                    slidesPerView: 2,
                  },
                  // when window width is >= 768px
                  768: {
                    slidesPerView: 3,
                  },
                }}
              >
                {data.map((hotelData) => (
                  <SwiperSlide key={hotelData.id}>
                    <SwiperCard hotelData={hotelData} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Banner;
