import React, {useState, useEffect} from "react";
import BarGraph from "../Tools/BarGraph";
import TriangleBar from "../Tools/BarGraph/TriangleBar";

const BusiestDaysOfTheWeek = (props) => {
  const [bookingsPerDay, setBookingsPerDay] = useState([]);
  const [busiestDayMessage, setBusiestDayMessage] = useState("");
  const [daysOfWeekArray, setDaysOfWeekArray] = useState([
    {day: "Sun", key: 0},
    {day: "Mon", key: 1},
    {day: "Tue", key: 2},
    {day: "Wed", key: 3},
    {day: "Thu", key: 4},
    {day: "Fri", key: 5},
    {day: "Sat", key: 6}
  ]);

  useEffect(function () {
    populateBookingsPerDay();
  });

  const populateBookingsPerDay = () => {
    const teetimeCollection = props.data;
    if (!bookingsPerDay.length && teetimeCollection) {
      let bpd = [];
      daysOfWeekArray.map((dayObj) => {
        bpd.push({name: dayObj.day, bookings: filterBookingsByDay(dayObj.key, teetimeCollection.teetimes).length})
      });

      let busiestDayIndex = getBusiestDay(bpd);
      bpd[busiestDayIndex]["cellHighlight"] = true;
       setBookingsPerDay(bpd);

      let busiestMessage = [];
      busiestMessage.push(`${bpd[busiestDayIndex].name}:`);
      busiestMessage.push(" Usually the busiest day of the week");
      setBusiestDayMessage(busiestMessage);
    }
  };

  const filterBookingsByDay = (activeDay, teetimes) =>
    teetimes.filter(
      (tt) => new Date(tt.dateString).getDay() === parseInt(activeDay)
    );

  const getBusiestDay = (data) => {
    let max = data[0].bookings,
      maxIndex = 0;
    for (let i = 1; i < data.length; i++) {
      if (data[i].bookings > max) {
        max = data[i].bookings;
        maxIndex = i;
      }
    }
    return maxIndex;
  };

  return (
    <React.Fragment>
      <div className="graphTitle">Popular Days</div>
      <div className="busiestTimeMessage">
        <div className="message_hour">{busiestDayMessage[0]}</div>
        {busiestDayMessage[1]}
      </div>
      <BarGraph data={bookingsPerDay} shape={<TriangleBar />} height="85%" />
    </React.Fragment>
  );
};

export default BusiestDaysOfTheWeek;
