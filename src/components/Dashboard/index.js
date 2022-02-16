import React from "react";
import {Container, Row, Col} from "react-bootstrap";

import BarGraph from "./BarGraph";
import LineGraph from "./LineGraph";
const Landing = () => {
  return (
    <Container fluid>
      <Row>
        <Col>
          <div style={{height: "300px"}}>
            <LineGraph />
          </div>
        </Col>
        <Col>
          <div style={{height: "300px"}}>
            <BarGraph />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Landing;
