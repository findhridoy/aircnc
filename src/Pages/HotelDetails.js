import { Button } from "@material-ui/core";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import FlareIcon from "@material-ui/icons/Flare";
import HomeIcon from "@material-ui/icons/Home";
import PersonIcon from "@material-ui/icons/Person";
import StarIcon from "@material-ui/icons/Star";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import ConfirmHotelAccordion from "../Components/ConfirmHotelAccordion";
import data from "../Data/Data";
import Layout from "../Layout/Layout";

function HotelDetails() {
  const [exectData, setExecetData] = useState({});
  const [readMore, setReadMore] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    data
      .filter((res) => res.id.toString() === id.toString())
      .map((resData) => setExecetData({ ...resData }));
  }, [id]);

  const handleReadMore = () => {
    setReadMore(!readMore);
  };

  const history = useHistory();

  const handleRoute = () => {
    history.push(`/confirm/rules/${id}`);
  };
  return (
    <Layout>
      <div className="hotelDetails">
        {exectData?.images && (
          <div className="hotelDetails__image">
            <img src={exectData.images?.thumb} alt="hotel img" />
            <img src={exectData.images?.bImg} alt="hotel img" />
          </div>
        )}
        <div className="container">
          <section className="hotelDetails__section">
            <div className="hotelDetails__content">
              <div className="hotelDetails__box1">
                <div className="box1__data">
                  <h1>{exectData?.title}</h1>
                  <p>Dhaka, Bangladesh</p>
                  <p>
                    <span>{exectData?.guests} guests</span>
                    <span>{exectData?.beds} bedrooms</span>
                    <span>{exectData?.beds} beds</span>
                    <span>{exectData?.baths} baths</span>
                  </p>
                </div>
              </div>
              <div className="hotelDetails__box2">
                <div className="box2__data">
                  <ul>
                    <li>
                      <HomeIcon />
                      <div>
                        <p>Entire home</p>
                        <p>You'll have the condominium to yourself.</p>
                      </div>
                    </li>
                    <li>
                      <CheckBoxIcon />
                      <div>
                        <p>Self check-in</p>
                        <p>You can check in with the doorman.</p>
                      </div>
                    </li>
                    <li>
                      <FlareIcon />
                      <div>
                        <p>Sparkling clean</p>
                        <p>
                          10 recent guests said this place was sparkling clean.
                        </p>
                      </div>
                    </li>
                    <li>
                      <PersonIcon />
                      <div>
                        <p>Rowdra is Superhost</p>
                        <p>
                          Superhosts are ecperienced, highly rated hosts who are
                          committed to providing great stays for guests.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="hotelDetails__box3">
                <div className="box3__data">
                  <p>{exectData?.description}</p>
                  <br />
                  {readMore ? <p>{exectData?.moreDescription}</p> : ""}
                  <button onClick={handleReadMore}>
                    {readMore ? (
                      <span>
                        Read less about the space
                        <ExpandLessIcon />
                      </span>
                    ) : (
                      <span>
                        Read more about the space
                        <ExpandMoreIcon />
                      </span>
                    )}
                  </button>
                  <div className="hotelDetails__rating">
                    <h4>Reviews</h4>
                    <p>
                      <StarIcon />
                      {exectData?.rating}
                      <span>(20 reviews)</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="hotelDetails__confirm">
              <div className="hotelDetails__confirm--card">
                <div className="hotelDetails__rating">
                  <h4>
                    $ {exectData?.price} <span>night</span>
                  </h4>
                  <p>
                    <StarIcon />
                    {exectData?.rating}
                    <span>(20 reviews)</span>
                  </p>
                </div>
                <ConfirmHotelAccordion price={exectData?.price} />
                <div className="hotelDetails__reserve_button">
                  <Button onClick={handleRoute}>Reserve</Button>
                  <p>You won't be charged yet</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
}

export default HotelDetails;
