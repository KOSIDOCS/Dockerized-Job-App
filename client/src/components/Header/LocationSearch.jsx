import React from "react";
import styled from "styled-components";

import { LocationInput } from "../styledelement/StyledComponents";

const LocationSearch = ({ value, locationChange }) => {
  const onInputChange = (e) => locationChange(e.target.value);

  return (
    <Wrapper>
      <LocationInput
        value={value}
        onChange={onInputChange}
        type="text"
        autoComplete="country-name"
        placeholder="Location"
      />
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

export default LocationSearch;
