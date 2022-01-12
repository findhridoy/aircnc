import { Avatar } from "@material-ui/core";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";
import React, { useEffect, useState } from "react";
import Moment from "react-moment";
import { useAuth } from "../Context/AuthContext";
import data from "../Data/Data";
import Layout from "../Layout/Layout";

const UserProfile = () => {
  const { userInfo } = useAuth();

  const [exectData, setExecetData] = useState({});

  let result = JSON.parse(localStorage.getItem("confrimData"));

  useEffect(() => {
    data
      .filter((res) => res.id === result?.id)
      .map((resData) => setExecetData({ ...resData }));
  }, [result?.id]);
  return (
    <Layout>
      <section className="userprofile">
        <div className="container">
          <div className="userprofile__content">
            <div className="userprofile__data">
              <div className="userprofile__profile">
                {userInfo?.photoURL ? (
                  <Avatar
                    alt={userInfo?.displayName}
                    src={userInfo?.photoURL}
                  />
                ) : (
                  <Avatar alt={userInfo?.displayName} src="/" />
                )}
              </div>
              <h3>{userInfo?.displayName}</h3>
              <h4>{userInfo?.email}</h4>
            </div>

            {result && result?.email === userInfo?.email ? (
              <div className="userprofile__card">
                {exectData?.images && (
                  <div className="userprofile__card--image">
                    <img src={exectData.images?.thumb} alt="hotel img" />
                    <img src={exectData.images?.bImg} alt="hotel img" />
                  </div>
                )}
                <h3 className="userprofile__card--title">{exectData?.title}</h3>
                <p className="userprofile__card--desc">
                  {exectData?.description?.slice(0, 170)}.......
                </p>
                <div className="userprofile__card--date">
                  <p>
                    <Moment format="D/MM/YYYY">{result?.checkIn}</Moment>
                  </p>
                  <ArrowForwardIcon />
                  <p>
                    <Moment format="D/MM/YYYY">{result?.checkOut}</Moment>
                  </p>
                </div>

                <div className="userprofile__card--location">
                  <p>Location</p>
                  <p>{result?.location.slice(0, 12)}...</p>
                </div>
                <div className="userprofile__card--guests">
                  <p>Guests</p>
                  <p>{result?.guests}</p>
                </div>
                <div className="userprofile__card--payment">
                  <p>Payment</p>
                  {result?.orderId ? (
                    <CheckCircleIcon style={{ color: "#2bde8e" }} />
                  ) : (
                    <ErrorIcon color="secondary" />
                  )}
                </div>
                <div className="userprofile__card--totalPrice">
                  <p>Total</p>
                  <p>{result?.totalPrice}</p>
                </div>
              </div>
            ) : (
              <div className="noData__found">No booking data found.....</div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default UserProfile;
