import express from "express";

const app = express();

app.get("/api/v1/appointments/fetch", (req, res) => {
  const { date, interval } = req.query;
  console.log(date);

  const startDate = new Date(date);
  const endDate = new Date(date);

  if (interval == "DAY") {
    // do something
  } else if (interval == "WEEK") {
    // manipulate start and end date to be for the current week
  } else if (interval == "MONTH") {
    // manipulate start and end date to be for the current month
  }

  // call mongoDB find method
  const mongoResult = [
    {
      id: '5486415774187',
      title: 'Root Canal',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Euismod in pellentesque massa placerat duis ultricies lacus sed. Tellus integer feugiat scelerisque varius morbi.\n\nQuis ipsum suspendisse ultrices gravida dictum fusce ut placerat orci. Mattis aliquam faucibus purus in massa tempor nec feugiat nisl. Morbi enim nunc faucibus a pellentesque. Pretium lectus quam id leo.',
      start: new Date(),
      end: new Date(),
      patientID: '546578475746',
      doctorID: '45417165461',
      doctorName: 'Dr. Schwartzoski',
      doctorSpecialty: 'DENTAL',
      doctorProfileImageUrl: ''
    }
  ];

  res.json(mongoResult);
});

app.listen(8000, () => {
  console.log("Server is listening on port 8000");
});
