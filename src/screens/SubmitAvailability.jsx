import React from "react";
//import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import GetSetUpLogo from "../resources/getsetuplogo.png";

const SubmitAvailability = () => {
  return (
    <Container className="mt-5">
      <Row>
        <Col xs={2} md={1} sm={1}>
          <Image src={GetSetUpLogo} />
        </Col>
        <Col xs={10} md={11} sm={11} className="MainHeadingContainer">
          <h4>Submit Your Availibility</h4>
        </Col>
      </Row>
    </Container>
  );
};

export default SubmitAvailability;
