const express = require("express");
const eventCon = require("../controller/eventController");
const router = express.Router();
router.get("/", (req, res) => {
  //console.log(req);
  res.send("This is events route");
});
router.get("/allevents", eventCon.allEvents);
router.post("/addevent", eventCon.addEvent);
router.post("/updateevent/:id", eventCon.updateEvent);
router.get("/deleteevent/:id", eventCon.deleteEvent);
router.get("/mycalendar/:id", eventCon.mycalendar);
router.post("/addcalendar/:id", eventCon.addCalendar);
router.post("/deletecalendar/:id", eventCon.deleteCalendar);
module.exports = router;
