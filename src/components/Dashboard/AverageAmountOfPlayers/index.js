import React, {useState, useEffect} from "react";

const AverageAmountOfPlayers = (props) => {
  const getAveragePlayers = () => {
    if (props.data) {
      const bookings = props.data.teetimes,
       bookingCount = bookings.length;
      let playersTotal = 0;
      bookings.map((bk) => {
        playersTotal += bk.players > 0 ? bk.players : 0 ;       //edgecase *"Set"
      });
      return Math.round((playersTotal / bookingCount) * 10) / 10;
    }
  };

  return (
    <React.Fragment>
      <div className="graphTitle">Average # of players per Booking</div>
      <div className="numberDisplay ">{getAveragePlayers()} players</div>
      <div className="centerText">Target: 4 or less</div>
    </React.Fragment>
  );
};
export default AverageAmountOfPlayers;
