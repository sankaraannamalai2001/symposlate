const Event = require("../model/eventModel");
const User = require("../model/userModel");
exports.allEvents = async (req, res, next) => {
  await Event.findAll({})
    .then((data) => {
      const events = data;
      res
        .status(200)
        .json({ statusCode: 200, message: "success", events: events });
    })
    .catch((err) => {
      res.status(500).send(err || "Error loading events");
    });
};
exports.addEvent = async (req, res) => {
  const events = {
    eventName: req.body.eventName,
    eventDesc: req.body.eventDesc,
    eventUrl: req.body.eventUrl,
    eventDate: req.body.eventDate,
    start: req.body.start,
    end: req.body.end,
    user_id: req.body.user_id,
  };
  await Event.create(events)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send(err || "Error adding event");
    });
};
exports.updateEvent = async (req, res) => {
  const id = req.params.id;
  const events = {
    eventName: req.body.eventName,
    eventDesc: req.body.eventDesc,
    eventUrl: req.body.eventUrl,
    eventDate: req.body.eventDate,
    start: req.body.start,
    end: req.body.end,
    user_id: req.body.user_id,
  };
  condition = { event_id: id };
  await Event.update(events, { where: condition })
    .then((data) => {
      res.status(200).send("Sucessfully updated" + data + "field");
    })
    .catch((err) => {
      res.status(400).json({ error: err });
    });
};
exports.deleteEvent = async (req, res) => {
  const id = req.params.id;
  let events = [];
  await Event.destroy({
    where: { event_id: id },
  })
    .then((data) => {
      (async function () {
        await User.findAll()
          .then((users) => {
            for (let data of users) {
              events = data.dataValues.mycalendar.split(",");
              console.log(events);
              const index = events.indexOf(id);
              if (index > -1) {
                events.splice(index, 1);
                if (events.length === 0) events.push("[]");
                mycalendar = events.toString();

                (async function () {
                  await data
                    .update(
                      { mycalendar: mycalendar },
                      { where: { user_id: id } }
                    )
                    .then((data) => {})
                    .catch((err) => {
                      console.log("Error removing event from mycalendar");
                    });
                })();
              }
            }
          })
          .catch((err) => {
            res.status(500).send(err);
          });
      })();

      res.status(200).send("Successfully deleted event");
    })
    .catch((err) => {
      res.status(400).send("Error deleting event");
    });
};
exports.mycalendar = async (req, res) => {
  const user_id = req.params.id;
  condition = { user_id: user_id };
  const events = [];
  await User.findOne({ where: condition })
    .then((data) => {
      console.log(data.dataValues.mycalendar);
      const mycalendar = data.dataValues.mycalendar;
      res
        .status(200)
        .json({ statusCode: 200, message: "success", events: mycalendar });
    })
    .catch((err) => {
      res.status(400).send("Error fetching events");
    });
};
exports.addCalendar = async (req, res) => {
  const id = req.params.id;
  const event_id = req.body;
  var addToEvent;
  await Event.findOne({ where: { event_id: event_id.event_id } })
    .then((data) => {
      addToEvent = data;
    })
    .catch((err) => {
      console.log("No such event");
    });

  let events = [];
  var f = 0;
  await User.findOne({ where: { user_id: id } })
    .then((data) => {
      if (data.mycalendar == "[]") events = [];
      else events = data.mycalendar.split(",");

      for (let i = 0; i < events.length; i++) {
        const eve = events[i];
        (async function () {
          await Event.findOne({ where: { event_id: eve } })
            .then((eventOne) => {
              astarttime = "01/01/2011 " + addToEvent.start;
              aendtime = "01/01/2011 " + addToEvent.end;
              estarttime = "01/01/2011 " + eventOne.start;
              eendtime = "01/01/2011 " + eventOne.end;
              if (
                eventOne.eventDate.getTime() === addToEvent.eventDate.getTime()
              ) {
                if (
                  Date.parse(astarttime) >= Date.parse(estarttime) &&
                  Date.parse(astarttime) <= Date.parse(eendtime)
                ) {
                  f = 1;

                  return res
                    .status(500)
                    .send("Already another event scheduled in this time");
                } else if (
                  Date.parse(aendtime) >= Date.parse(estarttime) &&
                  Date.parse(estarttime) >= Date.parse(astarttime)
                ) {
                  f = 1;
                  return res
                    .status(500)
                    .send("Already another event scheduled in this time");
                }
              }
            })
            .catch((err) => {
              console.log(err);
              return;
            });
        })();
        if (f == 1) break;
      }
      const myTimeout = setTimeout(pushing, 200);
      function pushing() {
        if (f == 0) {
          events.push(event_id.event_id);
          mycalendar = events.toString();
          console.log(mycalendar);
          (async function () {
            await data
              .update({ mycalendar: mycalendar }, { where: { user_id: id } })
              .then((data) => {
                res.status(200).json({
                  message: "Successfully added to mycalendar",
                  event_id: event_id.event_id,
                });
              })
              .catch((err) => {
                res.status(500).send("Error adding event to mycalendar");
              });
          })();
        }
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

exports.deleteCalendar = async (req, res) => {
  const id = req.params.id;
  const event_id = req.body;
  let events = [];
  await User.findOne({ where: { user_id: id } })
    .then((data) => {
      events = data.mycalendar.split(",");
      console.log(events);
      const index = events.indexOf(event_id.event_id.toString());
      if (index > -1) {
        events.splice(index, 1);
      }
      if (events.length === 0) events.push("[]");
      mycalendar = events.toString();
      console.log(mycalendar);
      (async function () {
        await data
          .update({ mycalendar: mycalendar }, { where: { user_id: id } })
          .then((data) => {
            res.status(200).send("Successfully removed from mycalendar");
          })
          .catch((err) => {
            res.status(500).send("Error removing event from mycalendar");
          });
      })();
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};
