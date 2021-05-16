import React from "react";
import styled from "styled-components";

import { LocationInput } from "../styledelement/StyledComponents";
import { MapPin } from "react-feather";
import theme from "../screenquery/theme";

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

const SearchIcon = styled(MapPin)`
  margin-right: 14px;
  position: relative;
  top: 11px;
`;

export default LocationSearch;
