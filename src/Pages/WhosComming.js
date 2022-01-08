import { Button } from "@material-ui/core";
import React from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import MultiStepNav from "../Components/MultiStepNav";
import ConfirmLayout from "../Layout/ConfirmLayout";

function WhosComming() {
  const { id } = useParams();
  const history = useHistory();
  return (
    <ConfirmLayout>
      <MultiStepNav step1 step2 />
      <div className="whosComing">
        <h4>Travelling for work?</h4>
        <div className="whosComing__content">
          <div className="content__text">
            <p>Say hello to your host</p>
            <p>
              Let Rowdra know a little about yourself and why you're coming.
            </p>
          </div>
        </div>
        <textarea
          name="message"
          rows="8"
          placeholder="Hello Rowdra! Can't wait to spend 4 night is your home"
        ></textarea>
        <br />
        <Button
          onClick={() => history.push(`/confirm/confirm&pay/${id}`)}
          variant="contained"
        >
          Continue
        </Button>
      </div>
    </ConfirmLayout>
  );
}

export default WhosComming;
