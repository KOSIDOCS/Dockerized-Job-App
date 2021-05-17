import styled from "styled-components";
import { darken } from "polished";
import theme from "../screenquery/theme";

/**Begining of Jobsearch input */
export const JobInput = styled.input`
  width: 100%;
  border: 2px solid ${theme.light};
  line-height: 0.2em;
  font-size: 1.2em;
  padding: 9px 20px 9px 20px;
  font-family: inherit;
  color: ${theme.textDark};
  caret-color: ${theme.btnMain};
  transition: all 1s ease;
  border-radius: 0.2em;
  &::placeholder {
    color: ${theme.textDark};
  }
  &::-webkit-search-cancel-button {
    display: none;
  }
`;
/**End of Jobsearch input */

/**Begin Location input */
export const LocationInput = styled(JobInput)`
  border: none;
`;
/**End of Location input */

/**Begin Search Button */
export const SearchBtn = styled.button`
  appearance: none;
  outline: none;
  background: ${darken(0.1, theme.btnMain)};
  color: #fff;
  font-weight: 700;
  font-size: 1em;
  padding: 0.0em 2.9em;
  height: 50px;
  border: 2px solid ${darken(0.1, theme.btnMain)};
  transition: border background 2s ease-in-out;
  border-radius: 0.2em;
  position: relative;
  top: 15px;
  &:hover {
    background: ${darken(0.2, theme.btnMain)};
    border: 2px solid ${darken(0.2, theme.btnMain)};
    cursor: pointer;
  }
`;
/**End of Search Button */

/**Begin Alert Button */
export const AlertBtn = styled(SearchBtn)`
  height: 40px;
  width: 150px;
  font-size: 0.8em;
  border-radius: 5px 5px 5px 5px;
  appearance: none;
  text-decoration: none;
  text-align: center;
  background: none;
  color: ${theme.btnMain};
  border-radius: 50px;
  position: relative;
  top: 2px;
  &:hover {
    background: none;
    border: 2px solid ${darken(0.2, theme.btnMain)};
    cursor: default;
  }
`;
/**End of Alert Button */
