import StarIcon from "@material-ui/icons/Star";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import data from "../Data/Data";
import ConfirmHotelAccordion from "./ConfirmHotelAccordion";

function ConfirmHotelCard() {
  const [exectData, setExecetData] = useState({});

  const { id } = useParams();

  useEffect(() => {
    data
      .filter((res) => res.id == id)
      .map((resData) => setExecetData({ ...resData }));
  }, [id]);

  return (
    <div className="confirmHotel__card">
      <div className="confirmHotel__content">
        <div className="confirmHotel__data">
          <h4>{exectData?.title}</h4>
          <p>
            <StarIcon />
            {exectData?.rating}
            <span>(20 reviews)</span>
          </p>
        </div>
        {exectData?.images && (
          <div className="confirmHotel__image">
            <img src={exectData?.images.thumb} alt="Card Img" />
          </div>
        )}
      </div>
      <ConfirmHotelAccordion price={exectData?.price} />
    </div>
  );
}

export default ConfirmHotelCard;
