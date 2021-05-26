import React from "react";
import Button from "react-bootstrap/Button";
import { FaTimes, FaPen } from "react-icons/fa";
import ListGroup from "react-bootstrap/ListGroup";

const SlotList = ({
  availability,
  removeSlot,
  editSlot,
  selectedDate,
  makeDate,
}) => {
  const ListItem = ({ date, from, to }) => {
    return (
      <ListGroup.Item bsPrefix="slot-list-group-item" key={from + to}>
        <div className="slot-list-text">
          {date} {from} - {to}
        </div>
        <div className="slot-list-button-container">
          <Button
            variant="danger"
            className="slot-list-button"
            onClick={() => {
              removeSlot(date, from, to);
            }}
          >
            <FaTimes />
          </Button>
          <Button
            variant="success"
            className="slot-list-button"
            onClick={() => {
              editSlot(date, from, to);
            }}
          >
            {" "}
            <FaPen />
          </Button>
        </div>
      </ListGroup.Item>
    );
  };
  return (
    <ListGroup>
      {availability.map(function (itemDate) {
        if (itemDate.date === makeDate(selectedDate)) {
          return itemDate.slots
            .slice(0)
            .reverse()
            .map(function (itemSlot) {
              return (
                <ListItem
                  from={itemSlot.from}
                  to={itemSlot.to}
                  date={itemDate.date}
                />
              );
            });
        } else return null;
      })}
      {availability.map(function (itemDate) {
        if (itemDate.date !== makeDate(selectedDate)) {
          return itemDate.slots
            .slice(0)
            .reverse()
            .map(function (itemSlot) {
              return (
                <ListItem
                  from={itemSlot.from}
                  to={itemSlot.to}
                  date={itemDate.date}
                />
              );
            });
        } else return null;
      })}
    </ListGroup>
  );
};

export default SlotList;
