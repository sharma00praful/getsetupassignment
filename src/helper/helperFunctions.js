export const calculateWeekStartDate = (year, week) => {
  //1st of January + 7 days for each week
  const simpleDate = new Date(2021, 0, 1 + week * 7);
  const dayOfWeek = simpleDate.getDay();
  const ISOweekStart = simpleDate;
  ISOweekStart.setDate(simpleDate.getDate() - dayOfWeek + 1);
  //if first day of week is of previous year return 1st of January
  if (ISOweekStart.getFullYear() !== 2021) return new Date(year, 0, 1);
  else return ISOweekStart;
};

export const calculateWeekEndDate = (year, week) => {
  //1st of January + 7 days for each week
  const simpleDate = new Date(2021, 0, 1 + week * 7);
  const dayOfWeek = simpleDate.getDay();
  const ISOweekEnd = simpleDate;
  ISOweekEnd.setDate(simpleDate.getDate() + (7 - dayOfWeek));

  //to make it this week's sunday
  return ISOweekEnd;
};

export const getWeekNumber = (date) => {
  const oneJan = new Date(date.getFullYear(), 0, 1);
  // calculating number of days in given year before a given date
  const numberOfDays = Math.floor((date - oneJan) / (24 * 60 * 60 * 1000));
  // adding 1 since to current date and returns value starting from 0
  const weekNumber = Math.floor((date.getDay() + 1 + numberOfDays) / 7);
  return weekNumber;
};

export const makeDate = (date) => {
  //making the date in string format
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
};

export const parseDate = (date, time) => {
  return Date.parse(`${makeDate(date)} ${time}`);
};
export const removeByAttr = function (arr, from, to) {
  var i = arr.length;
  while (i--) {
    if (
      arr[i] &&
      arr[i].hasOwnProperty("from") &&
      arguments.length > 2 &&
      arr[i]["from"] === from &&
      arr[i]["to"] === to
    ) {
      arr.splice(i, 1);
    }
  }
  return arr;
};
export const haveSlots = (availability) => {
  let isSlotAvailable = false;
  if (availability.length > 0) {
    availability.map(function (item, index) {
      if (item.slots.length > 0) isSlotAvailable = true;
      return null;
    });
  }
  return isSlotAvailable;
};
export const handleSubmitAvailability = (
  availability,
  week,
  userId,
  handleAPISuccess
) => {
  console.log(
    JSON.stringify({
      userId: userId,
      weekNumber: week,
      availability: availability,
    })
  );

  fetch("https://gtstupbckend.nbb.world/availability", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId: userId,
      weekNumber: week,
      availability: availability,
    }),
  })
    .then((response) => {
      if (response.status === 200) {
        handleAPISuccess();
      }
    })
    .catch((error) => {
      console.log(error);
    });

  return null;
};
