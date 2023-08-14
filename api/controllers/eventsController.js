const Event = require("../models/Events");
const { uploadImage, deleteImage } = require("./controller");

const createEvent = async (req, res) => {
  process.stdout.write("Create event API gets called");
  console.log(req.body);
  req.body["status"] = "pending";
  req.body["event_date_timezone"] = "UTC";

  const img_res = await uploadImage(req.files.image);

  req.body["image_path"] = img_res.key;
  req.body["image_name"] = req.files.image.name;

  try {
    await Event.create(req.body);
    res.send({ message: "event created successfully" });
  } catch (e) {
    console.log(e);
    res.send({ message: "event creation failed" });
  }
};

const getEvents = async (req, res) => {
  process.stdout.write("get events api called\n");
  try {
    let eventRecords = await Event.find();
    res.send(JSON.stringify(eventRecords));
  } catch (e) {
    console.log(e);
    res.status(500).send(JSON.stringify({ message: "error", error: e }));
  }
};

const updateEvent = async (req, res) => {
  process.stdout.write("update events api called with the following payload\n");
  console.log(req.body);
  try {
    let rec = await Event.findOne({ event_id: req.body.event_id });
    if (!rec) {
      res.status(404).send(JSON.stringify({ message: "event id not found" }));
    }
    const update_dict = req.body;
    let result = await Event.findOneAndUpdate(
      { event_id: req.body.event_id },
      update_dict
    );
    res.send(JSON.stringify({ message: "event updated successfully" }));
  } catch (e) {
    console.log(e);
    res.status(500).send(JSON.stringify({ message: "error", error: e }));
  }
};

const deleteEvent = async (req, res) => {
  console.log("delete event api called", req.body);
  let rec = await Event.findOne({ event_id: req.body.event_id });
  let img_path = rec["image_path"];

  if (!rec) {
    res.status(404).send(JSON.stringify({ message: "event id not found" }));
  }
  try {
    let rec = await Event.deleteOne({ event_id: req.body.event_id });
    await deleteImage(img_path);
    res.send(JSON.stringify({ message: "event deleted successfully" }));
  } catch (e) {
    console.log(e);
    res.status(500).send(JSON.stringify({ message: "error", error: e }));
  }
};
module.exports = {
  createEvent,
  getEvents,
  updateEvent,
  deleteEvent,
};
