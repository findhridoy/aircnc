import StarIcon from "@material-ui/icons/Star";
import React from "react";

function SwiperCard({ hotelData }) {
  return (
    <>
      {hotelData && (
        <div className="swiper__card">
          <div className="swiper__cart--img">
            <img src={hotelData.images.thumb} alt="Slider Img" />
          </div>
          <div className="swiper__card--data">
            <span className="card__location">Photo Class - Los Angeles</span>
            <span className="card__title">{hotelData.title}</span>
            <span className="card__price">$ {hotelData.price} per persion</span>
            <span className="card__rating">
              <StarIcon />
              {hotelData.rating}
            </span>
          </div>
        </div>
      )}
    </>
  );
}

export default SwiperCard;
