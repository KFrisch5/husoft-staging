import React, {useState, useEffect} from "react";
import HalfPieChart from "../Tools/HalfPieChart/index";

const PercentCapacity = (props) => {
  const [capacityPercentage, setCapacityPercentage] = useState([]);
  const [totalBookings, setTotalBookings] = useState(0);
  useEffect(function () {
    calculatePercentCapacity();
  });

  const calculatePercentCapacity = () => {
    if (!capacityPercentage.length && props.data) {
      let data = [];
       const totalHoursOfOp = 12,
            totalNumberOfBays = 6; // would preferably get this from db or lookup
        const totalBookedTime = Math.round(Math.random() * (totalHoursOfOp * totalNumberOfBays)),  // getBookedtime()
        bookedPercentage = Math.round(
          (totalBookedTime / (totalHoursOfOp * totalNumberOfBays)) * 100
        );
      data.push({name: "booked", value: bookedPercentage});
      data.push({name: "available", value: 100 - bookedPercentage});
      setCapacityPercentage(data);
      setTotalBookings(totalBookedTime);
    }
  };

  // const getBookedtime = () => {
      // capacity at the current point in time
      // capacity going forward (the current day/week/month/year)
  // }

  return (
    <React.Fragment>
      <div className="displayFlex spaceBetween">
        <div >
          <div className="graphTitle largeFont">Booking Capacity</div>
          <div className="graphSubTitle">Bookings / Available slots</div>
        </div>

        <div className="extraPaddingTop">
          <div className="numberDisplay">{totalBookings}</div>
          <div className="graphSubTitle">{`slots booked`}</div>
        </div>
      </div>

      <HalfPieChart data={capacityPercentage} />
    </React.Fragment>
  );
};
export default PercentCapacity;
