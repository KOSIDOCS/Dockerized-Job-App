import React, { useState, useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import Img from "../../images/office.jpg";
import { useLocation } from "react-router-dom";
import JobSearch from "./JobSearch";
import LocationSearch from "./LocationSearch";
import { SearchBtn } from "../styledelement/StyledComponents";
import device from "../screenquery/mediaquery";
import JobsContext from "../../context/jobs";

import Jobs from "../../jobs.json";

const useStyles = makeStyles((theme) => ({
  root: {},
}));

const Header = (props) => {
  const classes = useStyles();
//   const location = useLocation();
//   const [results, setResults] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [jobId, setJobId] = useState(-1);
//   const [selection, setSelection] = useState(null);
//   const [sortOrder, setSortOrder] = useState("New");
  const [jobValid, setJobValid] = useState(false);

  const [jobValue, setJobValue] = useState("");

    const [locaValue, setLocaValue] = useState("");
    const { page, onSearch } = useContext(JobsContext);

//   useEffect(() => {
//       setResults(Jobs);
//       console.log(results);
//       console.log(Jobs);
//   }, []);

  //   const { onSearch } = useContext(JobsContext);

//   const handleJobSearch = (selection) => {
//     // loadJobs(selection);
//     setSelection(selection);
//   };

//   const handleItemClick = (jobId) => {
//     // setPage("details");
//     setJobId(jobId);
//     window.scrollTo(0, 0);
//   };

  const jobInputChange = (input) => {
    setJobValue(input);
    if (input.length >= 2) {
      setJobValid(true);
    } else {
      setJobValid(false);
    }
  };

  const locaInpuChange = (input) => {
    setLocaValue(input);
  };

  const resetValue = () => {
    setJobValue("");
    setJobValid(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch({ jobValue, locaValue, });
  };

//   let jobDetails = {};
//   if (location.pathname === "details") {
//     jobDetails = results.find((job) => job.id === jobId);
//   }

//   const value = {
//     results,
//     details: jobDetails,
//     onSearch: handleSearch,
//     onItemClick: handleItemClick,
//     // totalJob: results.length,
//   };

  return (
      <Wrapper>
        {page !== "details" && <div style={{ textAlign: "center", position: "relative" }}>
          <Heading>Welcome to DevJobs</Heading>
          <InputWrapper>
            <LocationSearch value={locaValue} locationChange={locaInpuChange} />
            <JobSearch
              handleJobInpuChange={jobInputChange}
              value={jobValue}
              showCloseBtn={jobValid}
              jobResetValue={resetValue}
            />
            <SearchBtn onClick={handleSearch} type="submit">Search</SearchBtn>
          </InputWrapper>
        </div> }
      </Wrapper>
  );
};

const Wrapper = styled.div`
  background: url(${Img}) no-repeat fixed center;
  height: 450px;
  display: grid;
  place-items: center;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 800px;
  @media ${device.smallScreen} {
    justify-content: space-between;
    flex-direction: column;
    width: 55%;
  }
`;

const Heading = styled.h1`
  font-weight: 600;
  color: white;
  position: absolute;
  top: -80px;
  left: 240px;
  @media ${device.smallScreen} {
    position: absolute;
    left: 0;
  }
`;

export default Header;
