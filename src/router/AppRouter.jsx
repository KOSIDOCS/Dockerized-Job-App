import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import Header from "../components/Header/Header";
import JobLists from "../components/JobList/JobLists";
import JobDetails from "../components/JobList/JobDetails";
import { connect } from "react-redux";
import { initiateGetJobs } from "../actions/jobs";
import { resetErrors } from "../actions/errors";

import JobsContext from "../context/jobs";
import Jobs from "../jobs.json";

const AppRouter = () => {
  const [results, setResults] = useState([]);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [jobId, setJobId] = useState(-1);
  const [selection, setSelection] = useState(null);
  const [sortOrder, setSortOrder] = useState("New");
  const [page, setPage] = useState("");

  useEffect(() => {
    setResults(Jobs);
  }, []);

  const loadJobs = (selection) => {
    const { jobValue, locaValue, page = 1 } = selection;

    dispatch(resetErrors());
    setIsLoading(true);
    dispatch(initiateGetJobs({ jobValue, locaValue, page }))
      .then((response) => {
        if (response && response.jobs.length === 0) {
          setIsLoading(false);
        }
      })
      .catch(() => setIsLoading(false));
  };

  const handleResetPage = () => {
    setPage("");
  };

  const handleSearch = (selection) => {
    loadJobs(selection);
    setSelection(selection);
  };

  const handleItemClick = (jobId) => {
    setPage("details");
    setJobId(jobId);
    window.scrollTo(0, 0);
  };

  let jobDetails = {};
  if (page === "details") {
    jobDetails = results.find((job) => job.id === jobId);
  }

  const value = {
    results,
    page,
    details: jobDetails,
    onSearch: handleSearch,
    onItemClick: handleItemClick,
    onResetPage: handleResetPage,
  };

  return (
    <BrowserRouter>
      <JobsContext.Provider value={value}>
        <Wrapper>
          <Header />
          <Switch>
            <Route component={JobLists} path="/" exact={true} />
            <Route component={JobDetails} path="/details" />
          </Switch>
        </Wrapper>
      </JobsContext.Provider>
    </BrowserRouter>
  );
};

const Wrapper = styled.div`
  position: relative;
`;

export default AppRouter;
