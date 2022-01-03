import { Button, FormControlLabel, Radio, RadioGroup } from "@material-ui/core";
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import { PayPalButton } from "react-paypal-button-v2";
import { useParams } from "react-router-dom";
import data from "../Data/Data";
import paypal from "../Images/Icons/paypal.svg";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  // get data from redux
  // const results = useSelector((res) => res.data);
  // const { locationName, guestCount, checkIn, checkOut } = data;
  // let diffDate = new Date(checkOut - checkIn);
  const [content, setContent] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    data
      .filter((res) => res.id == id)
      .map((allData, index) => setContent(allData));
  }, [id]);
  const { title, price } = content;
  // State
  const [checkedValue, setCheckedValue] = useState("card");

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
        alert(error.message);
      } else {
        handleUserConfirmData(paymentMethod.id);
        alert("Your payment was successfull");
      }
    }
  };

  // Paypal Payment
  const handlePaypalPayment = (details, data) => {
    handleUserConfirmData(data.orderID);
    alert.success("Transaction completed by " + details.payer.name.given_name, {
      position: "bottom-right",
    });
  };

  const handleUserConfirmData = (orderId) => {
    // const userConfirmData = {
    //   name: loggedInUser.displayName,
    //   email: loggedInUser.email,
    //   title: title,
    //   location: locationName,
    //   orderId: orderId,
    //   checkIn: checkIn,
    //   checkOut: checkOut,
    //   guests: guestCount,
    //   totalPrice: price * (diffDate.getUTCDate() - 1) + 10 + 21,
    // };
    // fetch("http://localhost:5000/api/confirmData", {
    //   method: "POST",
    //   body: JSON.stringify(userConfirmData),
    //   headers: {
    //     "Content-type": "application/json; charset=UTF-8",
    //   },
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     toast.success("Your payment was successfull", {
    //       position: "bottom-right",
    //     });
    //   })
    //   .catch((err) => {
    //     toast.error("Somthing was wrong!", {
    //       position: "bottom-right",
    //     });
    //   });
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
            <Button type="submit" disabled={!stripe}>
              Continue to pay
            </Button>
          </div>
        )}
      </form>
    </div>
  );
};

export default PaymentForm;
