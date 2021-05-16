import React from "react";
import styled from "styled-components";

import { JobInput } from "../styledelement/StyledComponents";
import { Search, X } from "react-feather";
import theme from "../screenquery/theme";

const JobSearch = ({
  value,
  handleJobInpuChange,
  showCloseBtn,
  jobResetValue,
}) => {
  const onInputChange = (e) => handleJobInpuChange(e.target.value);

  return (
    <Wrapper>
      <JobInput
        value={value}
        onChange={onInputChange}
        placeholder="Find your dream job now"
        type="search"
      />
      {showCloseBtn && (
        <CloseBtn
          size="28"
          color={theme.light}
          onClick={jobResetValue}
          className="close"
        />
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 305px;
  height: 50px;
  display: flex;
  flex-direction: row;
  position: relative;
  margin-top: 1em;
  margin-bottom: 1em;
`;

const CloseBtn = styled(X)`
  position: absolute;
  top: 11px;
  left: 255px;
`;

const SearchIcon = styled(Search)`
  margin-right: 14px;
  position: relative;
  top: 11px;
`;

export default JobSearch;
