import StarIcon from "@material-ui/icons/Star";
import React from "react";
import { useHistory } from "react-router";

function ResultCard({ openModal, hotelData }) {
  const { id, title, images, guests, baths, beds, price, rating } = hotelData;
  const history = useHistory();
  const handleRoute = () => {
    history.push(`/details/${id}`);
  };
  return (
    <div className="result__card" onClick={handleRoute}>
      <div className="result__card--img">
        <img src={images.thumb} alt="Result Card Img" />
      </div>

      <div className="result__card--data">
        <p className="result__card--title">{title}</p>
        <p className="result__card--gusts">
          {guests} guests {beds} bedrooms {beds} beds {baths} baths
        </p>
        <p className="result__card--facilities">
          Wifi Air conditioning Kitchen
        </p>
        <p className="result__card--cancel">
          Cancellation flexibility availiable
        </p>
        <div className="result__rating--price">
          <p className="result__card--rating">
            <StarIcon />
            {rating} (20)
          </p>
          <p className="result__card--price">${price} / night</p>
        </div>
      </div>
    </div>
  );
}

export default ResultCard;
