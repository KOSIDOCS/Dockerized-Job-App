import React, { useState, useContext } from "react";
import styled from "styled-components";
import Img from "../../images/office.jpg";
import JobSearch from "./JobSearch";
import LocationSearch from "./LocationSearch";
import { SearchBtn } from "../styledelement/StyledComponents";
import device from "../screenquery/mediaquery";
import JobsContext from "../../context/jobs";

const Header = (props) => {
  const [jobValid, setJobValid] = useState(false);

  const [jobValue, setJobValue] = useState("");

    const [locaValue, setLocaValue] = useState("");
    const { page, onSearch } = useContext(JobsContext);

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
