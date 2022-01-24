import { Button, FormControlLabel, Radio, RadioGroup } from "@material-ui/core";
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import cogoToast from "cogo-toast";
import React, { useEffect, useState } from "react";
import { PayPalButton } from "react-paypal-button-v2";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useAuth } from "../Context/AuthContext";
import data from "../Data/Data";
import paypal from "../Images/Icons/paypal.svg";

const PaymentForm = () => {
  //State
  const [exectData, setExecetData] = useState({});
  const [checkedValue, setCheckedValue] = useState("card");

  //Stripe
  const stripe = useStripe();
  const elements = useElements();

  // Context
  const { userInfo } = useAuth();

  let locationData = JSON.parse(sessionStorage.getItem("locationData"));

  let toDate = new Date(locationData?.checkIn);
  let fromDate = new Date(locationData?.checkOut);
  const diffTime = Math.abs(fromDate - toDate);
  const diffDate = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    data
      .filter((res) => res.id.toString() === id.toString())
      .map((resData) => setExecetData({ ...resData }));
  }, [id]);

  // Radio Button
  const handleRadioChange = (event) => {
    setCheckedValue(event.target.value);
  };

  // form submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardNumberElement),
    });
    if (checkedValue === "card") {
      if (error) {
        cogoToast.error(error.message, {
          position: "bottom-right",
        });
      } else {
        handleUserConfirmData(paymentMethod.id);
        cogoToast.success("Your payment was successfull", {
          position: "bottom-right",
        });
      }
    }
  };

  // Paypal Payment
  const handlePaypalPayment = (details, data) => {
    handleUserConfirmData(data.orderID);
    cogoToast.success(
      "Transaction completed by " + details.payer.name.given_name,
      {
        position: "bottom-right",
      }
    );
  };

  const handleUserConfirmData = (orderId) => {
    const userConfirmData = {
      email: userInfo?.email,
      id: exectData?.id,
      location: locationData?.locationName,
      orderId: orderId,
      checkIn: locationData?.checkIn,
      checkOut: locationData?.checkOut,
      guests: locationData?.guestCount,
      totalPrice:
        exectData?.price * diffDate + (diffDate ? 10 : 0) + (diffDate ? 10 : 0),
    };
    localStorage.setItem("confrimData", JSON.stringify(userConfirmData));
    cogoToast.success("Your payment was successfull", {
      position: "bottom-right",
    });
    history.push("/profile");
  };

  return (
    <div className="paymentForm__section">
      <h4>Payment Selection</h4>
      <form onSubmit={handleSubmit}>
        <RadioGroup
          aria-label="quiz"
          name="quiz"
          value={checkedValue}
          onChange={handleRadioChange}
        >
          <FormControlLabel
            value="card"
            control={<Radio />}
            label={
              <div>
                <div className="craditCard__title_section">
                  <div className="craditCard__title">
                    <p>Cradit Card</p>
                    <p>Lorem ipsum dolor sit elit. Sequi, reprehenderit?</p>
                  </div>
                  <div className="craditCard__image">
                    <img
                      src="https://js.stripe.com/v3/fingerprinted/img/mastercard-4d8844094130711885b5e41b28c9848f.svg"
                      alt="icon"
                    />
                    <img
                      src="https://js.stripe.com/v3/fingerprinted/img/visa-365725566f9578a9589553aa9296d178.svg"
                      alt="icon"
                    />
                    <img
                      src="https://js.stripe.com/v3/fingerprinted/img/amex-a49b82f46c5cd6a96a6e418a6ca1717c.svg"
                      alt="icon"
                    />
                  </div>
                </div>
                <div className="paymentCard__form">
                  <label>
                    Card number
                    <CardNumberElement />
                  </label>

                  <div className="payment__form--align">
                    <label>
                      Name on Card
                      <input
                        type="text"
                        name="cardName"
                        placeholder="Visa or master card"
                      />
                    </label>

                    <div className="payment__form--flex">
                      <label>
                        Expiration date
                        <CardExpiryElement />
                      </label>
                      <label>
                        CVC Code
                        <CardCvcElement />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            }
          />
          <FormControlLabel
            value="paypal"
            control={<Radio />}
            label={
              <div className="paypal__title_section">
                <div className="paypal__title">
                  <p>PayPal</p>
                  <p>Lorem ipsum dolor sit Sequi, reprehenderit?</p>
                </div>
                <div className="paypal__image">
                  <img src={paypal} alt="icon" />
                </div>
              </div>
            }
          />
        </RadioGroup>

        {checkedValue === "paypal" ? (
          <div className="paypal__button">
            <PayPalButton amount="0.01" onSuccess={handlePaypalPayment} />
          </div>
        ) : (
          <div className="payment__button">
            <Button type="submit" disabled={!stripe} variant="contained">
              Continue to pay
            </Button>
          </div>
        )}
      </form>
    </div>
  );
};

export default PaymentForm;
