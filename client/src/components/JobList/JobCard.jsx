import React, { useContext, useRef } from "react";
import styled from "styled-components";
import theme from "../screenquery/theme";
import { AlertBtn } from "../styledelement/StyledComponents";
import { MapPin } from "react-feather";
import moment from "moment";
import JobsContext from "../../context/jobs";
import { useHistory } from "react-router-dom"

const Job = ({
  title,
  descript,
  type,
  location,
  created,
  index,
  id,
  how_to_apply,
  company_url,
  company,
}) => {
  const { onItemClick } = useContext(JobsContext);
  const history = useHistory();

  const back = useRef();

  const shorten = (word) => {
    return descript.slice(0, 120) + "....";
  };

  const handleItem = (id) => {
    onItemClick(id)
    history.push("/details");
  } 

  return (
    <Wrapper id="me" index={index + 1} ref={back} onClick={() => handleItem(id)}>
      <DescrptWrap>
        <TopWrap>
          <div>
            <Heading>{title.replace(/(<([^>]+)>)/gi, "")}</Heading>
            <CompanyName>{company.replace(/(<([^>]+)>)/gi, "")}</CompanyName>
          </div>
          <AlertBtn>{type}</AlertBtn>
        </TopWrap>
        <SubHeading
          dangerouslySetInnerHTML={{ __html: shorten(descript) }}
        ></SubHeading>
      </DescrptWrap>
      <RequireWrap>
        <MapPin style={{ marginRight: "2px" }} size="13" />
        <CompanyName>{location}</CompanyName>
      </RequireWrap>
      <RequireWrap>
        <CompanyName>
          {moment(new Date(created)).format("DD MMMM YYYY")}
        </CompanyName>
      </RequireWrap>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  background: ${theme.light};
  display: flex;
  flex-direction: column;
  padding: 1.5em;
  justify-content: start;
  border-radius: 10px;
  margin-bottom: 20px; /**remeove later */
  margin-left: 30px;
  box-shadow: 1px 1px 5px ${theme.textDark};
  &:hover {
    cursor: pointer;
  }
`;

const TopWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 8px;
  flex-wrap: wrap;
`;

const DescrptWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const Heading = styled.h4`
  color: ${theme.dark};
  font-weight: 500;
  margin-bottom: 10px;
`;

const CompanyName = styled(Heading)`
  font-weight: 400;
  color: ${theme.textDark};
  font-size: 0.83em;
`;

const SubHeading = styled.h5`
  color: ${theme.textDark};
  font-weight: 400;
  line-height: 1.9em;
  margin-bottom: 10px;

  & p,
  & strong,
  & a,
  & li,
  & ul,
  & h1,
  & h2,
  & b {
    list-style-type: none;
    list-style: none;
    appearance: none;
    outline: none;
    text-decoration: none;
    color: ${theme.textDark};
    line-height: 2;
    font-size: 0.8rem;
  }
`;

const BtnWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 100%;
`;

const RequireWrap = styled(BtnWrap)`
  margin-bottom: 5px;
`;

export default Job;
