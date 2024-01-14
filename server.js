const express = require("express");
const path = require("path");
const axios = require("axios");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());

const moment = require("moment-timezone");
const { MongoClient } = require("mongodb");

app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});


// get timezones populated into the db
app.get("/timezones", async (req, res) => {
  try {
    const timezones = await importTimezones();
    res.json(timezones);
  } catch (error) {
    console.error(error);
    res
      .status(error.response ? error.response.status : 500)
      .json({ error: error.message });
  }
});

async function importTimezones() {
  // MongoDB connection string
  const mongoURI =
    "mongodb+srv://obeekaymanana:go5Ycku76dK47CJZ@basalt.dgzug8v.mongodb.net/"; // mongodb connection string
  const databaseName = "Basalt"; //database name

  // Connect to MongoDB
  const client = new MongoClient(mongoURI, { useUnifiedTopology: true });

  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db(databaseName);
    const collection = db.collection("timezones");

    // Get a list of all timezones
    const timezones = moment.tz.names();

    // Create a document for each timezone and insert into MongoDB
    const timezoneDocuments = timezones.map((timezone) => ({ timezone }));

    await collection.insertMany(timezoneDocuments);

    console.log("Timezones imported successfully.");
  } finally {
    // Close MongoDB connection
    await client.close();
  }
}

// API endpoint to get timezones from MongoDB and send to Vue.js
app.get("/api/timezones", async (req, res) => {
  try {
    const timezones = await getTimezonesFromDB();
    res.json(timezones);
  } catch (error) {
    console.error(error);
    res
      .status(error.response ? error.response.status : 500)
      .json({ error: error.message });
  }
});

// Function to get timezones from MongoDB
async function getTimezonesFromDB() {
  // MongoDB connection string and database name
  const mongoURI =
    "mongodb+srv://obeekaymanana:go5Ycku76dK47CJZ@basalt.dgzug8v.mongodb.net/";
  const databaseName = "Basalt";

  // Connect to MongoDB
  const client = new MongoClient(mongoURI, { useUnifiedTopology: true });

  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db(databaseName);
    const collection = db.collection("timezones");

    // Retrieve timezones from MongoDB
    const timezones = await collection.find({}).toArray();

    return timezones;
  } finally {
    // Close MongoDB connection
    await client.close();
  }
}

app.post("/google-api", async (req, res) => {
  const timezone = req.query.timezone;

  // Validate or sanitize the timezone parameter
  if (!timezone) {
    return res
      .status(400)
      .json({ error: "Invalid or missing timezone parameter" });
  }

  const options = {
    method: "POST",
    url: "https://google-api31.p.rapidapi.com/",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": "d7d1ce6247mshb733d87dc1d39f3p19707bjsnb192c896fa56",
      "X-RapidAPI-Host": "google-api31.p.rapidapi.com",
    },
    data: {
      text: timezone, // Use the selected timezone in the API call
      region: "wt-wt",
      max_results: 25,
    },
  };

  try {
    const response = await axios.post(options.url, options.data, {
      headers: options.headers,
    });

    res.json(response.data);
  } catch (error) {
    console.error("Error:", error.message);
    console.error(
      "Status:",
      error.response ? error.response.status : "Unknown"
    );
    res
      .status(error.response ? error.response.status : 500)
      .json({ error: error.message });
  }
});

// new route for fetching current weather data
app.get("/current-weather", async (req, res) => {
  let timezone = req.query.timezone;
  let place = "";

  // Validate or sanitize the timezone parameter
  if (!timezone) {
    return res
      .status(400)
      .json({ error: "Invalid or missing timezone parameter" });
  }

  if (timezone.includes("/")) {
    place = timezone.substring(timezone.indexOf("/") + 1);
  }

  try {
    const weatherData = await fetchCurrentWeather(timezone, place);
    res.json(weatherData);
  } catch (error) {
    console.error(error);
    res
      .status(error.response ? error.response.status : 500)
      .json({ error: error.message });
  }
});

// function to fetch current weather data via API
async function fetchCurrentWeather(timezone, place) {
  const options = {
    method: "GET",
    url: "https://ai-weather-by-meteosource.p.rapidapi.com/current",
    params: {
      place_id: place,
      timezone: timezone,
      language: "en",
      units: "metric",
    },
    headers: {
      "X-RapidAPI-Key": "d7d1ce6247mshb733d87dc1d39f3p19707bjsnb192c896fa56",
      "X-RapidAPI-Host": "ai-weather-by-meteosource.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
