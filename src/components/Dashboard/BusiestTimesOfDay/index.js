import React, {useState, useEffect} from "react";
import BarGraph from "../Tools/BarGraph";
import TriangleBar from "../Tools/BarGraph/TriangleBar";
import TabsForDaysOfWeek from "./tabs_index";

const BusiestTimesOfTheDay = (props) => {
  //ex. Based off 8am-6pm hours of operation
  const [bookingsPerHour, setBookingsPerHour] = useState([]);
  const [busiestTimeMessage, setBusiestTimeMessage] = useState("");
  const [activeTabKey, setActiveKey] = useState(
    JSON.stringify(new Date().getDay())
  );

  useEffect(function () {
    populateBookingsPerHour();
  });

  const populateBookingsPerHour = (newKey) => {
    const updateDayData = newKey !== undefined ? true : false;
    const dayOfInterest = updateDayData ? newKey : activeTabKey;
    if ((!bookingsPerHour.length && props.data) || (updateDayData && props.data)) {
      let busiestTimesData = createBusiestTimeTemplate([]);

      // if (props.activeLocData && (updateDayData || !bookingsPerHour.length)) {
        let bookingsByDay = filterBookingsByDay(dayOfInterest);
        if (bookingsByDay.length) {
          bookingsByDay.forEach((tt) => {
            let timeOfBooking = tt.startTime;
            let duration = tt.duration;
            let amountOfHours = duration / 60;
            let colonIndex = timeOfBooking.search(":");
            let hour_timeOfBooking = timeOfBooking.slice(0, colonIndex),
              minutes_timeOfBooking = timeOfBooking.slice(
                colonIndex + 1,
                colonIndex + 3
              ),
              suffix = timeOfBooking.slice(-2);

            //include hour booking originated on
            busiestTimesData = incrementBusiestTimeData(
              hour_timeOfBooking + suffix,
              busiestTimesData
            );
            let hour = parseInt(hour_timeOfBooking),
              minOnTheHour = parseInt(minutes_timeOfBooking);

            // and any hour passed through; Excluding if lands on top of hour
            if (
              duration >= 60 ||
              (!(minOnTheHour == 0) &&
                !(minOnTheHour <= 45 && duration <= 15) &&
                !(minOnTheHour <= 30 && duration <= 30) &&
                !(minOnTheHour <= 15 && duration <= 45))
            ) {
              const nextHour = hour == 12 ? 1 : hour + 1;
              if (nextHour == 12) {
                suffix = "PM";
              }
              if (duration <= 60) {
                busiestTimesData = incrementBusiestTimeData(
                  nextHour.toString() + suffix,
                  busiestTimesData
                );
              } else {
                for (let i = 1; i < amountOfHours; i++) {
                  busiestTimesData = incrementBusiestTimeData(
                    nextHour.toString() + suffix,
                    busiestTimesData
                  );
                  nextHour++;
                }
              }
            }
          });
          const busiestTimeIndex = getBusiestTime(busiestTimesData);
          const bph = addHighlightsForBusiestTOD(
            busiestTimeIndex,
            busiestTimesData
          );
          populateDisplayMessage(busiestTimeIndex, busiestTimesData)
          setBookingsPerHour(bph);
        }
        else populateDisplayMessage(null, busiestTimesData);
    }
  };

  const populateDisplayMessage = (busiestTimeIndex, busiestTimesData) => {
    let busiestMessage = [];
    if (busiestTimeIndex === null) {
      busiestMessage.push("No bookings have been recorded for this day.");
    } else {
      busiestMessage.push(`${busiestTimesData[busiestTimeIndex].name}:`);
      busiestMessage.push(" Usually the busiest time of day");
    }
    setBusiestTimeMessage(busiestMessage);
  };

  const addHighlightsForBusiestTOD = (busiestTimeIndex, busiestTimesData) => {
    if (busiestTimeIndex !== null)
      busiestTimesData[busiestTimeIndex]["cellHighlight"] = true;
    return busiestTimesData;
  };

  const filterBookingsByDay = (activeDay) =>
    props.data.teetimes.filter(
      (tt) => new Date(tt.dateString).getDay() === parseInt(activeDay)
    );

  const incrementBusiestTimeData = (val, busiestTimesData) => {
    const hourBeingIncremented = busiestTimesData.findIndex(
      (booking) => val == booking.name
    );
    if (hourBeingIncremented >= 0)
      busiestTimesData[hourBeingIncremented].bookings++;
    return busiestTimesData;
  };

  const getBusiestTime = (array) => {
    let max = array[0].bookings,
      maxIndex = 0;
    for (let i = 1; i < array.length; i++) {
      if (array[i].bookings > max) {
        max = array[i].bookings;
        maxIndex = i;
      }
    }
    return max !== 0 ? maxIndex : null;
  };

  const createBusiestTimeTemplate = (array) => {
    let postMeridiem = false,
      suffix = "AM",
      stop = true;
    for (let i = 8; stop; i++) {
      ///8am to 8pm
      if (i === 12) suffix = "PM";

      array.push({name: i + suffix, bookings: 0});

      if (i === 12 && !postMeridiem) {
        postMeridiem = true;
        i = 0;
      }
      if (postMeridiem && i === 8) stop = false;
    }
    setBookingsPerHour(array);
    return array;
  };

  const setActiveDay = (key) => {
    setActiveKey(key);
    populateBookingsPerHour(key);
  };

  return (
    <React.Fragment>
      <div className="displayFlex spaceBetween">
        <div className="graphTitle">Popular Times</div>
        <TabsForDaysOfWeek
          setActiveDay={setActiveDay}
          activeTabKey={activeTabKey}
        />
      </div>
      <div className="busiestTimeMessage">
        <div className="message_hour">{busiestTimeMessage[0]}</div>
        {busiestTimeMessage[1]}
      </div>
      <BarGraph data={bookingsPerHour} shape={<TriangleBar />} height="75%" />
    </React.Fragment>
  );
};
export default BusiestTimesOfTheDay;
