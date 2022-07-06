import React, {useState, useEffect} from "react";

const AverageLengthOfBooking = (props) => {

  const getAveragePlayers = () => {
    if (props.data) {
      const bookings = props.data.teetimes
      let lengthTotal = 0;
      bookings.map((bk) => {
          lengthTotal += bk.duration;
      });
      return Math.round((lengthTotal / bookings.length) * 10) / 10;
    }
  };

  return (
    <React.Fragment>
      <div className="graphTitle">Average length of bookings</div>
      <div className="numberDisplay ">{getAveragePlayers()} Minutes</div>
    </React.Fragment>
  );
};
export default AverageLengthOfBooking;
