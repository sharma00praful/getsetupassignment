import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";

import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";

import "../App.scss";
import GetSetUpLogo from "../resources/getsetuplogo.png";

const localizer = momentLocalizer(moment);

const ViewAvailability = () => {
  const history = useHistory();

  const [events, setEvents] = useState([
    {
      start: moment().toDate(),
      end: moment().toDate(),
      title: "12:15PM - 12:45PM",
    },
  ]);

  const handleAPISuccess = (availability) => {
    if (availability.length > 0) {
      const helperAvailability = [];

      availability.forEach((item, index) => {
        item.dateId.forEach((itemSlot, indexSlot) => {
          helperAvailability.push(helperSlot(itemSlot, item));
        });
      });
      setEvents(helperAvailability);
    }
  };

  const helperSlot = (itemSlot, item) => {
    const slot = {};
    slot.start = moment(new Date(`${item.date} ${itemSlot.from}`)).toDate();
    slot.end = moment(new Date(`${item.date} ${itemSlot.to}`)).toDate();
    slot.title = `${itemSlot.from} - ${itemSlot.to}`;
    return slot;
  };

  const handleChangeSlots = () => {
    history.push({ pathname: "/submit-availability" });
  };

  useEffect(() => {
    fetch("http://localhost/getavailability", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: 12345,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        handleAPISuccess(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Container className="mt-5 main-container">
      <Row>
        <Col sm={3}>
          <Image src={GetSetUpLogo} />
        </Col>
        <Col className="view-heading-container">
          <h4>Your Availability</h4>
        </Col>
        <Col sm={3}>
          <Button
            variant="default"
            className="add-slot-button"
            onClick={handleChangeSlots}
          >
            <span className="button-text">Add Slots</span>
          </Button>
        </Col>
      </Row>
      <Row>
        <Col className="view-availability-container">
          <div className="view-calander-container">
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 550 }}
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ViewAvailability;
