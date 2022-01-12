import { Button } from "@material-ui/core";
import React, { useEffect } from "react";
import Moment from "react-moment";
import ResultCard from "../Components/ResultCard";
import ResultMap from "../Components/ResultMap";
import data from "../Data/Data";
import Layout from "../Layout/Layout";

const Result = ({ history }) => {
  // const { locationData: location } = useAuth();
  let location = JSON.parse(sessionStorage.getItem("locationData"));

  useEffect(() => {
    if (!location) {
      history.push("/");
    }
  }, [location, history]);

  return (
    <Layout>
      <section className="result__section">
        <div className="container">
          <div className="result__content">
            <div className="result__data">
              <div className="result__address">
                <p>
                  {data?.length} stays,{" "}
                  <Moment format="MMM DD">{location?.checkIn}</Moment>-
                  <Moment format="DD">{location?.checkOut}</Moment>,{" "}
                  {location?.guestCount} guests
                </p>
                <h3>Stay in {location?.locationName.slice(0, 25)}...</h3>
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
                {data.map((hData) => (
                  <ResultCard hotelData={hData} key={hData.id} />
                ))}
              </div>
            </div>
            <div className="result__map">
              <ResultMap />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Result;
