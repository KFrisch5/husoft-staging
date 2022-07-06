import React, {useState, useEffect} from "react";
import {Container, Row, Col, Dropdown} from "react-bootstrap";
import {withFirebase} from "../Firebase";
import {useStore} from "../../store";

import "./index.css";

import BusiestTimesOfTheDay from "./BusiestTimesOfDay/index";
import BusiestDaysOfTheWeek from "./BusiestDaysofTheWeek";
import PercentCapacity from "./PercentCapacity";
import AverageAmountOfPlayers from "./AverageAmountOfPlayers";
import AverageLengthOfBooking from "./AverageLengthOfBooking";
// import LineGraph from "./Tools/LineGraph";
const Landing = (props) => {
  const {state, dispatch} = useStore();
  const [locations, setLocations] = useState([]);
  const [locData, setLocData] = useState([]);
  const [activeLocation, setActiveLocation] = useState("");
  const [activeLocData, setActiveLocData] = useState();

  

  useEffect(function () {
    let locationsArray = [];
    let locDataArray = [];

    props.firebase.teeTimes().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        locationsArray.push(doc.id);
        locDataArray.push(doc.data());
      });
      if (locationsArray.length && locations.length !== locationsArray.length) {
        setLocations(locationsArray);
        setLocData(locDataArray);
        setActiveLocation(locationsArray[0]);
        setActiveLocData(locDataArray[0]);
      }
    });
  });

  const changeActiveLocation = (locIndex) => {
    let newLoc = locations[locIndex];
    setActiveLocation(newLoc);
    setActiveLocData(locData[locIndex]);
    // dispatch({
    //   type: 'set-active-location',
    //   loc: locIndex,
    // })
  };

  const Location_CustomToggle = React.forwardRef(({children, onClick}, ref) => (
    <a
      href=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
      &#x25bc;
    </a>
  ));

  return (
    <Container fluid style={{background: "lightgrey"}}>
      <Row>
        <Col className="displayFlex extraPaddingTop">
          <Dropdown
            className="extraPaddingRight"
            onSelect={(eventKey) => changeActiveLocation(eventKey)}
          >
            <Dropdown.Toggle as={Location_CustomToggle}>
              Location
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {locations.map((loc, index) => (
                <Dropdown.Item eventKey={index} key={index}>
                  {loc}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <div>{`(${activeLocation})`}</div>
        </Col>
      </Row>
      <Row className="overflow_nowrap">
        <Col className="noColPadding flexGrow2" style={{flexGrow: 2}}>
          <div className="customCard" style={{height: "300px"}}>
            <BusiestTimesOfTheDay data={activeLocData}/>
          </div>
        </Col>
        <Col className="noColPadding">
          <div className="customCard" style={{height: "300px"}}>
            <BusiestDaysOfTheWeek data={activeLocData}/>
          </div>
        </Col>
      </Row>
      <Row>
        <Col className="noColPadding">
          <div
            className="customCard extraPaddingRight"
            style={{height: "250px"}}
          >
            <PercentCapacity data={activeLocData} loc={activeLocation}/>
          </div>
        </Col>
        <Col className="noColPadding">
          <div className="customCard" style={{height: "130px"}}>
            <AverageAmountOfPlayers data={activeLocData}/>
          </div>
          <div className="customCard" style={{height: "100px"}}>
            <AverageLengthOfBooking data={activeLocData}/>
          </div>
        </Col>
        <Col className="noColPadding">
          <div className="customCard" style={{height: "250px"}}></div>
        </Col>
      </Row>
    </Container>
  );
};

export default withFirebase(Landing);
