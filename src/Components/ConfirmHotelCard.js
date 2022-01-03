import StarIcon from "@material-ui/icons/Star";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import data from "../Data/Data";
import ConfirmHotelAccordion from "./ConfirmHotelAccordion";

function ConfirmHotelCard() {
  const [content, setContent] = useState([]);

  const { id } = useParams();
  useEffect(() => {
    data
      .filter((res) => res.id == "1")
      .map((allData, index) => setContent(allData));
  }, [id]);
  const { title, images, price, rating } = content;
  return (
    <div className="confirmHotel__card">
      <div className="confirmHotel__content">
        <div className="confirmHotel__data">
          <h4>{title}</h4>
          <p>
            <StarIcon />
            {rating}
            <span>(20 reviews)</span>
          </p>
        </div>
        {images && (
          <div className="confirmHotel__image">
            <img src={images.thumb} alt="Card Img" />
          </div>
        )}
      </div>
      <ConfirmHotelAccordion price={price} />
    </div>
  );
}

export default ConfirmHotelCard;
