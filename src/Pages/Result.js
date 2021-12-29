import { Button } from "@material-ui/core";
import React from "react";
import Moment from "react-moment";
import ResultCard from "../Components/ResultCard";
import ResultMap from "../Components/ResultMap";
import data from "../Data/Data";
import Layout from "../Layout/Layout";

function Result() {
  // const {
  //   locationName,
  //   locationLat,
  //   locationLng,
  //   guestCount,
  //   checkIn,
  //   checkOut,
  // } = results;
  return (
    <Layout>
      <section className="result__section">
        <div className="container">
          <div className="result__content">
            <div className="result__data">
              <div className="result__address">
                <p>
                  252 stays, <Moment format="MMM DD">{"checkIn"}</Moment>-
                  <Moment format="DD">{"checkOut"}</Moment>, {"guestCount"}{" "}
                  guests
                </p>
                <h3>Stay in {"locationName"}</h3>
                <ul>
                  <li>
                    <Button>Cancellation flexibility</Button>
                  </li>
                  <li>
                    <Button>Type of place</Button>
                  </li>
                  <li>
                    <Button>Price</Button>
                  </li>
                  <li>
                    <Button>More Filters</Button>
                  </li>
                </ul>
              </div>
              <div className="result__hotel">
                {data.map((hData, index) => (
                  <ResultCard hotelData={hData} />
                ))}
              </div>
            </div>
            <div className="result__map">
              <ResultMap
              // lat={"locationLat"}
              // lng={"locationLng"}
              // name={"locationName"}
              />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Result;
