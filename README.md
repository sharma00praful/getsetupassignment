This app is deployed on heroku with url https://priyawork1.herokuapp.com/ with backend apis on an aws instance,
Important Note: If HEROKU didn't repond at the first place, try to reload it as HEROKU free tier make the app sleep if no activity is made for 30 minutes. Although I have create a cron in my aws server to ping it every 25 minutes. :D But not sure if this hack will work.

For this project i have used:

React.js
Bootstrap
React-router-dom
react-calendar
react-big-calendar
font-awesome icons
Heroku (for deployment)

There are two screen in this front end APP.

# 1. Submit Availability Screen:

this screen has a calendar like UI which let the user choose a week with one or many dates in it. and for a date, user can choose time slots for availability.

#features:

1. Calendar UI for week and date selection on the left.
2. Clock Input for time selection on the right.
3. user can choose as many time slots as he can.
4. script trigger a warning to encourage a guide to take some break in between if he/she chooses a time slot which has more then 3 hours. (user can choose to re-enter or can proceed with the current selection)
5. App will not allow user to input same time slot twice for a single day.
6. App will not allow user to input a time slot which are Interfering with current selected time slots for a single day. (suppose if we already have 2PM - 4PM slot for 27/05/2021 and user is trying to put a 3PM-5PM slot, App will pop an error stating that "You Already Have a slot in these times".)
7. When user switch between dates, App will smartly show the time slots selected for that day on the top of the list.
8. Whenever a time slot is selected it will put on the top of the list.
9. User can reduce or expand time slots in this screen.
10. User can view the time slots which are selected in the list below the input area, and also can anytime switch between submit screen and view screen.
11. After all listing, user can finally submit the slots for the week. this will trigger post request to backend and on successful response, this will take user to the next screen.

Screenshot:
<img src="https://www.nearbybazar.com/image/assignment/gtstup1.png"/>

# 2. View Availability Screen:

this screen have calendar like UI which will let user View a all selected slots.

#features:

1. Calendar like UI for viewing selected slots. (when loaded a request will hit the backend to fetch the data)
2. user can switch between views like month,week,day.

Screenshot:
<img src="https://www.nearbybazar.com/image/assignment/gtstup2.png"/>

after cloning,
run:
npm install
npm start
(the project will start at http://localhost:3000)
