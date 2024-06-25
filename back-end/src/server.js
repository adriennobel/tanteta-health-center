import { fileURLToPath } from "url";
import path from "path";
import express from "express";
import { ObjectId } from 'mongodb';
import { db, connectToDB } from "./db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "../dist")));

app.get(/^(?!\/api).+/, (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});

app.get("/api/v1/appointments/fetch", async (req, res) => {
  const { date, interval, _id } = req.query;

  const startDate = new Date(date + "T00:00");
  const endDate = new Date(date + "T23:59");
  const patientID = new ObjectId(_id);

  try {

    if (interval == "DAY") {
      // do something
    } else if (interval == "WEEK") {
      // startDate = start of the current week (Sunday)
      startDate.setDate(startDate.getDate() - startDate.getDay());
      endDate.setDate(endDate.getDate() + 6 - endDate.getDay());
    } else if (interval == "MONTH") {
      // startDate = first day of the current month
      startDate.setDate(1);
      endDate.setMonth(startDate.getMonth() + 1);
      endDate.setDate(0);
    }

    const result = await db.collection("appointments").find({
      start: { $gte: startDate },
      end: { $lte: endDate },
      patientID: patientID
    }).sort({
      start: 1
    }).toArray();
    res.json(result);
  } catch (e) {
    console.error("Error fetching appointments:", e);
    res.status(500).send("Error fetching appointments");
  }
});

app.get("/api/v1/appointments/fetchall", async (req, res) => {
  const { _id } = req.query;
  const patientID = new ObjectId(_id);

  try {
    const result = await db.collection("appointments").find({
      patientID: patientID
    }).sort({
      start: 1
    }).toArray();
    res.json(result);
  } catch (e) {
    console.error("Error fetching appointments:", e);
    res.status(500).send("Error fetching appointments");
  }
});

app.get("/api/v1/appointments/fetch/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.collection("appointments").findOne({
      _id: new ObjectId(id)
    });

    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).send("Appointment not found");
    }
  } catch (e) {
    console.error("Error retrieving  appointments:", e);
    res.status(500).send("Error retrieving  appointments");
  }
});

app.get("/api/v1/doctors/fetch/:specialty", async (req, res) => {
  const { specialty } = req.params;

  try {
    if (specialty != "undefined") {
      const result = await db.collection("doctors").find({
        specialty: specialty
      }).toArray();
      res.json(result)
    } else {
      res.json([]);
    }
  } catch (e) {
    console.error("Error fetching doctors:", e);
    res.status(500).send("Error fetching doctors");
  }
});

app.post("/api/v1/doctors/availability", async (req, res) => {
  const { doctorId, date } = req.body;

  const startDate = new Date(date + "T00:00");
  const endDate = new Date(date + "T23:59");

  try {
    // Retrieve the doctor's existing appointments for the specified date
    const result = await db.collection("appointments").find({
      doctorID: new ObjectId(doctorId),
      start: { $gte: startDate },
      end: { $lte: endDate }
    }).toArray();

    const businessStart = new Date(date + "T13:00Z");
    const businessEnd = new Date(date + "T21:00Z");

    // Generate an array of time slots from working hours with 1-hour intervals
    let timeslots = [];
    let loopTime = new Date(businessStart);
    while (loopTime < businessEnd) {
      timeslots.push(new Date(loopTime));
      loopTime.setHours(loopTime.getHours() + 1);
    }

    result.forEach(appt => {
      timeslots = timeslots.filter(slot => new Date(slot).getTime() != new Date(appt.start).getTime())
    });

    res.json(timeslots);
  } catch (e) {
    console.error("Error fetching appointments:", e);
    res.status(500).send("Error fetching appointments");
  }
});

app.post("/api/v1/appointments/create", async (req, res) => {
  const { appointment } = req.body;

  // Convert start and end times to Date objects
  if (appointment.start) {
    const start = new Date(appointment.start);
    appointment.start = new Date(appointment.start);
    appointment.end = new Date(start.setHours(start.getHours() + 1));;
  }

  try {
    // Convert doctorID to ObjectId
    appointment.doctorID = new ObjectId(appointment.doctorID);
    appointment.patientID = new ObjectId(appointment.patientID);

    const result = await db.collection("appointments").insertOne(appointment);

    if (result.acknowledged) {
      res.status(200).send("Appointment created successfully");
    } else {
      res.status(500).send("Failed to create appointment");
    }
  } catch (e) {
    console.error("Error creating appointment:", e);
    res.status(500).send("Error creating appointment");
  }
});

app.put("/api/v1/appointments/update/:id", async (req, res) => {
  const { id } = req.params;
  const { updatedAppointment } = req.body;

  try {
    // Convert doctorID to ObjectId
    updatedAppointment.doctorID = new ObjectId(updatedAppointment.doctorID);
    updatedAppointment.patientID = new ObjectId(updatedAppointment.patientID);

    // Convert start and end times to Date objects
    const start = new Date(updatedAppointment.start);
    updatedAppointment.start = new Date(updatedAppointment.start);
    updatedAppointment.end = new Date(start.setHours(start.getHours() + 1));

    const result = await db.collection("appointments").updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedAppointment }
    );

    if (result.modifiedCount > 0) {
      res.status(200).send("Appointment updated successfully");
    } else {
      res.status(404).send("Appointment not found or not modified");
    }
  } catch (e) {
    console.error("Error updating appointment:", e);
    res.status(500).send("Error updating appointment");
  }
});

app.delete("/api/v1/appointments/delete/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.collection("appointments").deleteOne({
      _id: new ObjectId(id)
    });

    if (result.acknowledged) {
      res.status(200).send({ message: "Appointment deleted successfully" });
    } else {
      res.status(404).send({ message: "Appointment not found" });
    }
  } catch (e) {
    console.error("Error deleting appointment:", e);
    res.status(500).send("Error deleting appointment");
  }
});

app.post("/api/v1/patients/create", async (req, res) => {
  try {
    const { patient } = req.body;
    patient.enrolmentDate = new Date();

    const result = await db.collection("users").insertOne(patient);

    if (result.acknowledged) {
      res.status(200).send("User created successfully");
    } else {
      res.status(500).send("Failed to create user");
    }
  } catch (e) {
    console.error("Error creating user:", e);
    res.status(500).send("Error creating user");
  }
});

app.get("/api/v1/patients/fetch/:uid", async (req, res) => {
  try {
    const { uid } = req.params;

    if (!uid) res.status(404);

    const result = await db.collection("users").findOne({
      uid: uid
    });

    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).send("User not found");
    }
  } catch (e) {
    console.error("Error creating user:", e);
    res.status(500).send("Error creating user");
  }
});

const PORT = process.env.PORT || 8000;

connectToDB(() => {
  console.log("DB connection successful.")
  app.listen(PORT, () => {
    console.log("Server is listening on port " + PORT);
  });
})

// npx nodemon scr/server.js