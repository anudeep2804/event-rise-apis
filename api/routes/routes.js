const passport = require("passport");
const express = require("express");
const router = express.Router();
const { 
    userExists, 
    getUserByEmail, 
    createUser, 
    updateUser, 
    canRenderEvent, 
    uploadProfileImage, 
    deleteProfileImage,
    paymentConfig, 
    createPaymentIntent, 
    saveTickets, 
    getTickets,
    getUpcomingEvents,
    getEventDetailsByEventId,
    sendEmailToUser,
    getDetailsByEventCategory,
    getAttendedEvents,
    getUpcomingEventsByUserId,
    sendEmailToEventCreator,
    getHostedEvents,
    pendingEvents,
    mostEventCategoryAttendedByUser,
    getProfileImage,
    mostEventsHostedByUser
} = require("../controllers/controller");

const {getUserDetails} = require("../controllers/sessionManagement")
const { createEvent, getEvents, updateEvent, deleteEvent } = require("../controllers/eventsController.js");
const { checkProfilePic, getEventImage } = require("../controllers/ImageController");

router.get("/health", (req, res) => {
  res.send("Hello world");
});

router.get("/userProfile", getUserByEmail);

router.post("/createUser", createUser);

router.post("/login", userExists);

router.put("/update", updateUser);

router.get("/events", canRenderEvent);

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get("/config", paymentConfig);

router.post("/create-payment-intent", createPaymentIntent);

router.post('/api/tickets', saveTickets);

router.get('/api/tickets', getTickets);

router.get('/api/upcomingEvents', getUpcomingEvents);

router.get('/api/events/:eventId', getEventDetailsByEventId);

router.post('/api/sendEmail', sendEmailToUser);

router.get('/api/eventCategory/:category', getDetailsByEventCategory);

router.get('/api/attendedEvents/:userId',getAttendedEvents );

router.get('/api/eventCategory/:category', getDetailsByEventCategory);

router.get('/api/attendedEvents/:userId',getAttendedEvents );

router.get('/api/upcomingEventsByUserId/:userId',getUpcomingEventsByUserId );

router.post('/api/sendEventStatus',sendEmailToEventCreator);

router.get('/api/hostedEvents/:userId', getHostedEvents);

router.get('/api/pendingEvents/:userId', pendingEvents);

router.get('/api/analytics/:userId', mostEventCategoryAttendedByUser);

router.get("/userDetails", getUserDetails); //for session management

router.get('/api/analytics/hostedEvents/:userId',mostEventsHostedByUser);

router.get(
  "/auth/google/events",
  passport.authenticate("google", {
    failureRedirect: "/events",
  }),
  function (req, res) {
    // Successful authentication, redirect to the page.
    console.log(req.isAuthenticated());
    if (req.isAuthenticated()) {
        res.status(200);
        res.send({ "Status": 200, "Message": "Authenticated" });
      } else {
        res.status(401);
        res.send({ "Status": 401, "Message": "UnAuthenticated" });
    }
  }
);

router.get("/logout", function (req, res) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    console.log(req.isAuthenticated());
    res.redirect("/health");
  });
});

router.post("/uploadProfileImage", uploadProfileImage);

// Event APIs
router.post("/createEvent", createEvent);

router.get("/getEvents", getEvents);

router.put("/updateEvent", updateEvent);

router.delete("/deleteEvent", deleteEvent);

router.delete("/deleteProfileImage", deleteProfileImage);

router.post("/getProfileImage", getProfileImage);

router.get("/checkProfilePic", checkProfilePic)

router.post("/getEventImage", getEventImage);

module.exports = router;
