const path = require("path");
const axios = require("axios");
const cors = require("cors");
const express = require("express");
const _ = require("lodash");
const app = express();
const PORT = process.env.PORT || 5000;
const buildPath = path.join(__dirname, "client/build");

app.use(express.static(buildPath)); // serving react production build
app.use(cors());

const BASE_API_URL_1 = "https://jobs.github.com"; // Github job api

/* route endpoint for jobs.
react app forwards a request to the endpoint
which makes an async http call to github api
to return all the available jobs for the request params.*/
app.get("/jobs", async (req, res) => {
  try {
    let { description = "", location = "", page = 1 } = req.query; // request params
    description = description ? encodeURIComponent(description) : ""; // encoded uri param
    location = location ? encodeURIComponent(location) : ""; // encoded uri param

    if (page) {
      page = parseInt(page);
      page = isNaN(page) ? "" : `&page=${page}`;
    }

    const query_1 = `${BASE_API_URL_1}/positions.json?description=${description}&location=${location}${page}`;
    const result_1 = await axios.get(query_1); // axios https call to github jobs
    res.send(result_1.data); // sends back the returned jobs array of objects to react app. 
  } catch (error) {
    res.status(400).send("Error while getting list of jobs.Try again later."); // error handling.
  }
});

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
