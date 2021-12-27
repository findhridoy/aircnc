import React from "react";
import "../../node_modules/swiper/swiper.min.css";
import SearchForm from "./SearchForm";

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
          {/* <div className="banner__right">
          <div className="banner__experince">
            <div className="experience__title">
              <h3>Expreiences</h3>
              <NavLink to="/experience">
                See all <ArrowForwardIosIcon />
              </NavLink>
            </div>
            <Swiper spaceBetween={15} slidesPerView={4}>
              {data.map((hotelData, index) => (
                <SwiperSlide key={index}>
                  <SwiperCard hotelData={hotelData} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="banner__home">
            <div className="home__title">
              <h3>Homes</h3>
              <NavLink to="/home">
                See all <ArrowForwardIosIcon />
              </NavLink>
            </div>
            <Swiper spaceBetween={15} slidesPerView={3}>
              {data.map((hotelData, index) => (
                <SwiperSlide key={index}>
                  <SwiperCard hotelData={hotelData} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div> */}
        </div>
      </div>
    </section>
  );
}

export default Banner;
