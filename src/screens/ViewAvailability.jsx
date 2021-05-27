import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import "../App.scss";
const localizer = momentLocalizer(moment);

const ViewAvailability = () => {
  const [events, setEvents] = useState([
    {
      start: moment().toDate(),
      end: moment().toDate(),
      title: "12:15PM - 12:45PM",
    },
  ]);
  const handleAPISuccess = (availability) => {
    console.log(availability);
    const helperAvailability = {};

    const helperSlot = {};
  };

  useEffect(() => {
    fetch("http://localhost/getavailability", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: 12345,
      }),
    })
      .then((response) => {
        if (response.status === 200) {
          handleAPISuccess(response.body);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  });
  return (
    <Container>
      <Row>
        <Col className="view-availability-container">
          <div className="view-calander-container">
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 750 }}
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ViewAvailability;
