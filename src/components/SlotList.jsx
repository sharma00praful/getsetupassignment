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
  return (
    <ListGroup>
      {availability.map(function (itemDate) {
        if (itemDate.date === makeDate(selectedDate)) {
          return itemDate.slots
            .slice(0)
            .reverse()
            .map(function (itemSlot) {
              return (
                <ListGroup.Item
                  bsPrefix="slot-list-group-item"
                  key={itemSlot.from + itemSlot.to}
                >
                  <div className="slot-list-text">
                    {itemDate.date} {itemSlot.from} - {itemSlot.to}
                  </div>
                  <div className="slot-list-button-container">
                    <Button
                      variant="danger"
                      className="slot-list-button"
                      onClick={() => {
                        removeSlot(itemDate.date, itemSlot.from, itemSlot.to);
                      }}
                    >
                      <FaTimes />
                    </Button>
                    <Button
                      variant="success"
                      className="slot-list-button"
                      onClick={() => {
                        editSlot(itemDate.date, itemSlot.from, itemSlot.to);
                      }}
                    >
                      <FaPen />
                    </Button>
                  </div>
                </ListGroup.Item>
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
                <ListGroup.Item
                  bsPrefix="slot-list-group-item"
                  key={itemSlot.from + itemSlot.to}
                >
                  <div className="slot-list-text">
                    {itemDate.date} {itemSlot.from} - {itemSlot.to}
                  </div>
                  <div className="slot-list-button-container">
                    <Button variant="danger" className="slot-list-button">
                      <FaTimes />
                    </Button>
                    <Button variant="success" className="slot-list-button">
                      <FaPen />
                    </Button>
                  </div>
                </ListGroup.Item>
              );
            });
        } else return null;
      })}
    </ListGroup>
  );
};

export default SlotList;
