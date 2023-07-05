import React from "react";
import anh from "../../../images/New Project.png";
import { Link } from "react-router-dom";

function CreateTour(props) {
  return (
    <div>
      <div className="mb-5 tour">
        <div className="heading text-center pt-5">
          <span>Tour của riêng mình</span>
          <div className="hr"></div>
          <p className="mb-4">
            Tự tạo cho mình một lộ trình thú vị để có một kỳ nghỉ đáng nhớ hơn.
          </p>
        </div>
        <div className="container">
          <Link to="/create-tour">
            <img src={anh} className="w-100" alt="" />
          </Link>
        </div>
      </div>
    </div>
  );
}

CreateTour.propTypes = {};

export default CreateTour;
