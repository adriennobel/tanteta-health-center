import express from "express";
import { MongoClient, ServerApiVersion } from 'mongodb';

const app = express();

const uri = `mongodb+srv://adriennobel:December2020!@cluster0.l5ppxia.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

app.get("/api/v1/appointments/fetch", async (req, res) => {
  const { date, interval } = req.query;

  const startDate = new Date(date + "T00:00");
  const endDate = new Date(date + "T23:59");
  let result = [];

  if (interval == "DAY") {
    // do something
  } else if (interval == "WEEK") {
    // startDate = start of the current week (Sunday)
    startDate.setDate(startDate.getDate() - startDate.getDay());
    endDate.setDate(startDate.getDate() + 6);
  } else if (interval == "MONTH") {
    // startDate = first day of the current month
    startDate.setDate(1);
    endDate.setMonth(startDate.getMonth() + 1);
    endDate.setDate(0);
  }

  try {
    await client.connect();
    result = await client.db("mainDB").collection("appointments").find({
      start: { $gte: startDate },
      end: { $lte: endDate }
    }).toArray();
    res.json(result);
  } catch (e) {
    console.error("Error fetching appointments:", e);
    res.status(500).send("Error fetching appointments");
  } finally {
    await client.close();
  }
  //console.log(result);
});

app.listen(8000, () => {
  console.log("Server is listening on port 8000");
});

// npx nodemon scr/server.js