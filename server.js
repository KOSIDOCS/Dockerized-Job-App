const path = require("path");
const axios = require("axios");
const cors = require("cors");
const express = require("express");
const _ = require("lodash");
const app = express();
const PORT = process.env.PORT || 5000;
const buildPath = path.join(__dirname, "client/build");

app.use(express.static(buildPath));
app.use(cors());

const BASE_API_URL_1 = "https://jobs.github.com";

app.get("/jobs", async (req, res) => {
  try {
    let { description = "", location = "", page = 1 } = req.query;
    description = description ? encodeURIComponent(description) : "";
    location = location ? encodeURIComponent(location) : "";

    if (page) {
      page = parseInt(page);
      page = isNaN(page) ? "" : `&page=${page}`;
    }

    const query_1 = `${BASE_API_URL_1}/positions.json?description=${description}&location=${location}${page}`;
    const result_1 = await axios.get(query_1);
    console.log(result_1.data);
    res.send(result_1.data);
  } catch (error) {
    res.status(400).send("Error while getting list of jobs.Try again later.");
  }
});

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
