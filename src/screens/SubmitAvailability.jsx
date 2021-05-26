import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import GetSetUpLogo from "../resources/getsetuplogo.png";
import ProfilePic from "../resources/profile.jpg";
import Button from "react-bootstrap/Button";
import ClockInput from "../components/ClockInput";
import ErrorModal from "../components/ErrorModal";
import WarningModal from "../components/WarningModal";
import { FaCheck, FaPlusSquare } from "react-icons/fa";
import SlotList from "../components/SlotList";
import {
  calculateWeekStartDate,
  calculateWeekEndDate,
  getWeekNumber,
  makeDate,
  parseDate,
  removeByAttr,
} from "../helper/helperFunctions";

const SubmitAvailability = () => {
  const year = new Date().getFullYear();

  const [availability, setAvailability] = useState([]); //array state to store availability {{week1:{{from:value,to:value},{from:value,to:value},...},week2:{from:value,to:value}}
  const [week, setWeek] = useState(getWeekNumber(new Date())); //set to current week number initially
  const [weekStartDate, setWeekStartDate] = useState(
    calculateWeekStartDate(year, week)
  );
  const [weekEndDate, setWeekEndDate] = useState(
    calculateWeekEndDate(year, week)
  );
  const [selectedDate, setSelectedDate] = useState(weekStartDate);

  const [isError, setIsError] = useState({
    status: false,
    message: "No Errors.",
  });
  const [isWarning, setIsWarning] = useState({
    status: false,
    message: "No Warnings.",
    title: "Warning",
  });
  const [clockInputInitialTime, setClockInputInitialTime] =
    useState("00:00 AM");
  const [slotStartTime, setSlotStartTime] = useState(clockInputInitialTime);
  const [slotEndTime, setSlotEndTime] = useState(clockInputInitialTime);
  const [clockInputType, setClockInputType] = useState("");
  const [clockInputShow, setClockInputShow] = useState(false);
  const dateStringArray = selectedDate.toString().split(" "); //to store timestamp in string array for showing date

  const errorModalHandleClose = () => {
    setIsError({ status: false, message: "No Error" });
  };

  const warningModalHandleClose = () => {
    setIsWarning({ status: false, message: "No Warnings.", title: "Warning" });
  };

  const warningModalHandleProceed = () => {
    setIsWarning({ status: false, message: "No Warnings.", title: "Warning" });
    addSlot();
  };

  const warningModdalHandleLetMeChange = () => {
    setIsWarning({ status: false, message: "No Warnings.", title: "Warning" });
    setClockInputType("End");
    setClockInputInitialTime(slotEndTime);
    handleClockInputShow();
  };

  const resetSlotTime = () => {
    setSlotStartTime("00:00 AM");
    setSlotEndTime("00:00 AM");
  };

  const addSlot = () => {
    const availabilityArray = [...availability];
    const slot = { from: slotStartTime, to: slotEndTime };
    const date = makeDate(selectedDate);
    const weekDate = {
      date: date,
      slots: [slot],
    };

    let isAddedFlag = false;
    if (availabilityArray.length > 0) {
      availabilityArray.map(function (item, index) {
        if (item.date === date) {
          item.slots.push(slot); //if date is present, push slot
          isAddedFlag = true;
        }
        return null;
      });
      if (!isAddedFlag) availabilityArray.push(weekDate); //if date is not present previously add here
    } else availabilityArray.push(weekDate); //if availablity array is blank add here
    setAvailability(availabilityArray);
    resetSlotTime();
  };

  const handleClockInputClose = () => {
    setClockInputShow(false);
  };

  const handleClockInputShow = () => {
    setClockInputShow(true);
  };

  const handleClockInputChange = (time) => {
    clockInputType === "Start"
      ? setSlotStartTime(time.formatted12)
      : setSlotEndTime(time.formatted12);
  };

  const handleAddSlot = () => {
    if (validateSlot()) {
      addSlot();
    }
  };

  const checkLongPeriod = () => {
    const startTime = new Date(`${makeDate(selectedDate)} ${slotStartTime}`);
    const endTime = new Date(`${makeDate(selectedDate)} ${slotEndTime}`);
    const hourStart = startTime.getHours();
    const hourEnd = endTime.getHours();

    const hourDiff = hourEnd - hourStart;
    if (hourDiff > 3) {
      setIsWarning({
        status: true,
        message: `Looks like you are attempting to have a ${hourDiff} hours slot,
         we suggest you to break it into smaller slots and take some break 
         in between to stretch your legs, walk a bit and enjoy the beautiful 
         day out there. Theories suggests that performing smaller work sprints 
         can make you more productive.`,
        title: "A Gentle Reminder",
      });
      return true;
    } else return false;
  };

  const validateSlot = () => {
    let noError = true;
    const slotStartTimeMS = parseDate(selectedDate, slotStartTime);
    const slotEndTimeMS = parseDate(selectedDate, slotEndTime);

    //const selected
    //checking for slot end time is lesser then slot start time
    if (slotEndTimeMS <= slotStartTimeMS) {
      noError = false;
      setIsError({
        status: true,
        message: "Slot End Time must be greater than slot start time.",
      });
    }

    //checking for overriding slots
    availability.map(function (itemDate, index) {
      if (itemDate.date === makeDate(selectedDate)) {
        return itemDate.slots.slice(0).map(function (itemSlot, index) {
          const slotToMS = parseDate(selectedDate, itemSlot.to);
          const slotFromMS = parseDate(selectedDate, itemSlot.from);

          if (slotStartTimeMS <= slotToMS && slotStartTimeMS >= slotFromMS) {
            noError = false;
            setIsError({
              status: true,
              message:
                "You Already Have a slot in these times, Please Re-Enter.",
            });
          } else if (slotEndTimeMS <= slotToMS && slotEndTimeMS >= slotFromMS) {
            noError = false;
            setIsError({
              status: true,
              message:
                "You Already Have a slot in these times, Please Re-Enter.",
            });
          }
        });
      }
    });

    if (noError && checkLongPeriod()) {
      noError = false;
    }
    return noError;
  };
  const removeSlot = (date, from, to) => {
    const availabilityArray = [...availability];
    availabilityArray.map(function (item, index) {
      if (item.date === date) {
        removeByAttr(item.slots, from, to);
      }
      return null;
    });
    setAvailability(availabilityArray);
  };
  const editSlot = (date, from, to) => {
    removeSlot(date, from, to);
    setSlotStartTime(from);
    setSlotEndTime(to);
    setClockInputType("Start");
    setClockInputInitialTime(from);
    handleClockInputShow();
  };
  return (
    <Container className="mt-5 main-container">
      <Row>
        <Col xs={2} md={1} sm={1}>
          <Image src={GetSetUpLogo} />
        </Col>
        <Col xs={10} md={11} sm={11} className="main-heading-container">
          <h4>Submit Your Availability</h4>
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={6} className="calendar-container">
          <div className="profile-pic-container">
            <Image src={ProfilePic} className="profile-pic" />
          </div>
          <div className="calendar-heading">Choose From Available Dates</div>
          <div className="calendar-container-inner">
            <Calendar
              value={selectedDate}
              minDate={weekStartDate}
              maxDate={weekEndDate}
              showWeekNumbers={true}
              className="react-calendar-override"
              onChange={(value, event) => {
                setSelectedDate(value);
              }}
              onClickWeekNumber={(weekNumber) => {
                setWeek(weekNumber);
                setWeekStartDate(calculateWeekStartDate(year, weekNumber));
                setWeekEndDate(calculateWeekEndDate(year, weekNumber));
                setSelectedDate(calculateWeekStartDate(year, weekNumber));
              }}
            />
          </div>
        </Col>
        <Col xs={12} md={6} className="clock-container">
          <Row>
            <Col xs={12} md={12}>
              <div className="clock-heading-1">Choose your available time</div>
              <div className="clock-heading-2">
                (You can choose as many slots as you want)
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={12}>
              <div className="date-selected">
                {
                  //Week weeknumber: Day, Date Month, Year
                  `Week ${week}: ${dateStringArray[0]}, ${dateStringArray[2]} ${dateStringArray[1]}, ${dateStringArray[3]}`
                }
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={6} md={6}>
              <div className="select-time-heading">From</div>
              <div>
                <Button
                  variant="default"
                  onClick={() => {
                    setClockInputType("Start");
                    setClockInputInitialTime(slotStartTime);
                    handleClockInputShow();
                  }}
                  className="select-time-button"
                >
                  {slotStartTime.toUpperCase()}
                </Button>
              </div>
            </Col>
            <Col xs={6} md={6}>
              <div className="select-time-heading">To</div>
              <div>
                <Button
                  variant="default"
                  onClick={() => {
                    setClockInputType("End");
                    setClockInputInitialTime(slotEndTime);
                    handleClockInputShow();
                  }}
                  className="select-time-button"
                >
                  {slotEndTime.toUpperCase()}
                </Button>
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={12}>
              <Button
                variant="default"
                className="add-slot-button"
                onClick={handleAddSlot}
              >
                <FaPlusSquare className="button-icon" />
                <span className="button-text">ADD SLOT</span>
              </Button>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={12} className="slot-list-container">
              <SlotList
                availability={availability}
                removeSlot={removeSlot}
                editSlot={editSlot}
                selectedDate={selectedDate}
                makeDate={makeDate}
              />
            </Col>
          </Row>
          <Row>
            <Col xs="12" md="12">
              <Button
                variant="default"
                onClick={handleClockInputShow}
                className="submit-availability-button"
              >
                <FaCheck className="button-icon" />
                <span className="button-text"> Submit Availability</span>
              </Button>
            </Col>
          </Row>
          <ClockInput
            time={clockInputInitialTime}
            type={clockInputType}
            visibility={clockInputShow}
            handleClose={handleClockInputClose}
            handleTimeChange={handleClockInputChange}
          />
        </Col>
      </Row>

      <ErrorModal
        isError={isError.status}
        message={isError.message}
        handleClose={errorModalHandleClose}
      />
      <WarningModal
        isWarning={isWarning.status}
        message={isWarning.message}
        title={isWarning.title}
        handleClose={warningModalHandleClose}
        handleProceed={warningModalHandleProceed}
        handleLetMeChange={warningModdalHandleLetMeChange}
      />
    </Container>
  );
};
export default SubmitAvailability;
