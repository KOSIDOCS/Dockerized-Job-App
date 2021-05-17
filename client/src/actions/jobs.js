import axios from "axios";
import moment from "moment";
import { BASE_API_URL } from "../utils/constants";
import { setErrors } from "./errors";

// async redux actions to get search jobs from api.
export const initiateGetJobs = (data) => {
  return async (dispatch) => {
    try {
      let { jobValue, locaValue, page } = data;

      jobValue = jobValue ? encodeURIComponent(jobValue) : "";
      locaValue = locaValue ? encodeURIComponent(locaValue) : "";

      if (page) {
        page = parseInt(page);
        page = isNaN(page) ? "" : `&page=${page}`;
      }

      const jobs = await axios.get(
        `${BASE_API_URL}/jobs?description=${jobValue}&location=${locaValue}${page}`
      );

      // const jobs = await axios.get('./jobs.json');
      const sortedJobs = jobs.data.sort(
        (a, b) =>
          moment(new Date(b.created_at)) - moment(new Date(a.created_at))
      );

      return dispatch(setJobs(sortedJobs));
    } catch (error) {
      error.response && dispatch(setErrors(error.response.data));
    }
  };
};

export const setJobs = (jobs) => ({
  type: "SET_JOBS",
  jobs,
});