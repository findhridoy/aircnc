import DateFnsUtils from "@date-io/date-fns";
import { Accordion, AccordionSummary, Button } from "@material-ui/core";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import SearchIcon from "@material-ui/icons/Search";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import cogoToast from "cogo-toast";
import "date-fns";
import React, { useState } from "react";
import MapboxAutocomplete from "react-mapbox-autocomplete";
import { useHistory } from "react-router-dom";
import AccordionCount from "./AccordionCount";

const SearchForm = () => {
  // All Local State
  const [locationName, setLocationName] = useState("");
  const [locationLat, setLocaitonLat] = useState("");
  const [locationLng, setLocaitonLng] = useState("");
  const [checkIn, setCheckIn] = useState(new Date());
  const [checkOut, setCheckOut] = useState(new Date());
  const [adultCount, setAdultCount] = useState(0);
  const [childCount, setChildCount] = useState(0);
  const [babieCount, setBabieCount] = useState(0);
  const [guestCount, setGuestCount] = useState(0);

  // Location Suggetion Function
  const suggestionSelect = (result, lat, lng) => {
    setLocationName(result);
    setLocaitonLat(lat);
    setLocaitonLng(lng);
  };

  //Material Date Function
  const handleCheckInDate = (date) => {
    setCheckIn(date);
  };
  const handleCheckOutDate = (date) => {
    setCheckOut(date);
  };

  // Count Function
  const handleAdultCount = (count) => {
    if (count && adultCount < 5) {
      setAdultCount(adultCount + 1);
    }
    if (!count && adultCount > 0) {
      setAdultCount(adultCount - 1);
    }
  };
  const handleChildCount = (count) => {
    if (count && childCount < 5) {
      setChildCount(childCount + 1);
    }
    if (!count && childCount > 0) {
      setChildCount(childCount - 1);
    }
  };
  const handleBabieCount = (count) => {
    if (count && babieCount < 5) {
      setBabieCount(babieCount + 1);
    }
    if (!count && babieCount > 0) {
      setBabieCount(babieCount - 1);
    }
  };
  const handleGuestCount = () => {
    setGuestCount(adultCount + childCount + babieCount);
    setAdultCount(0);
    setChildCount(0);
    setBabieCount(0);
  };

  // Custom hooks
  // const { setLocationData } = useLocationData();
  // const { setLocationData } = useAuth();

  const history = useHistory();
  // Search Function`
  const handleSearch = () => {
    if (locationName === "") {
      cogoToast.warn("Please fill the location field.", {
        position: "bottom-right",
      });
    }
    if (locationName !== "") {
      const locatData = {
        locationName,
        locationLat,
        locationLng,
        guestCount,
        checkIn,
        checkOut,
      };
      // setLocationData({ ...locatData });
      sessionStorage.setItem("locationData", JSON.stringify(locatData));
      history.push("/result");
    }
  };
  return (
    <>
      <form action="" className="search__form">
        <div className="search__location">
          <h4>LOCATION</h4>
          <MapboxAutocomplete
            publicKey="pk.eyJ1IjoiaHJpZG95LW1hcGJveCIsImEiOiJja21mM294ajMzMjVxMnFvOWUzamFjancwIn0.dghqrHAgIVbKOJAJApVtpw"
            inputClass="search"
            onSuggestionSelect={suggestionSelect}
            resetSearch={false}
            placeholder="Add city, Landmark, or address"
          />
        </div>

        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <div className="search__date">
            <div className="search__toDate">
              <p>Arrival</p>
              <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                format="dd/MM/yyyy"
                value={checkIn}
                onChange={handleCheckInDate}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </div>
            <div className="search__fromDate">
              <p>Departure</p>
              <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                format="dd/MM/yyyy"
                value={checkOut}
                onChange={handleCheckOutDate}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </div>
          </div>
        </MuiPickersUtilsProvider>
        <div className="searchForm__accordion">
          <Accordion defaultExpanded>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel2a-header"
            >
              <p>Guests</p>
              {guestCount > 0 ? (
                <h4>{guestCount} GUESTS</h4>
              ) : (
                <h4>
                  {adultCount} ADULTS, {childCount} CHILD, {babieCount} BABIES
                </h4>
              )}
            </AccordionSummary>
            <AccordionDetails>
              <AccordionCount
                title="ADULTS"
                countValue={adultCount}
                handleCount={handleAdultCount}
              />
              <AccordionCount
                title="CHILD"
                age="Age 2-12"
                countValue={childCount}
                handleCount={handleChildCount}
              />
              <AccordionCount
                title="BABIES"
                age="Younger than 2"
                countValue={babieCount}
                handleCount={handleBabieCount}
              />
              <div className="accordion__button">
                <div></div>
                <Button onClick={handleGuestCount} size="small">
                  Apply
                </Button>
              </div>
            </AccordionDetails>
          </Accordion>
        </div>
        <div className="search__button">
          <Button onClick={handleSearch} variant="contained">
            <SearchIcon /> Search
          </Button>
        </div>
      </form>
    </>
  );
};

export default SearchForm;
