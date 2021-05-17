import React, { useEffect, useContext } from "react";
import styled from "styled-components";
import theme from "../screenquery/theme";
import { ChevronLeft, MapPin } from "react-feather";
import { AlertBtn, SearchBtn } from "../styledelement/StyledComponents";
import JobsContext from "../../context/jobs";
import moment from "moment";
import { findLink } from "../../utils/constants";
import _ from "lodash";
import device from "../screenquery/mediaquery";
import { useHistory } from "react-router-dom";

const JobDetails = () => {
  const { details, onResetPage } = useContext(JobsContext);
  const history = useHistory();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const {
    type,
    title,
    description,
    location,
    company,
    company_url,
    how_to_apply,
    created_at,
    redirect_url,
  } = details;

  const jobLocation = (location) => {
    let job;

    if (typeof location === "object") {
      job = location?.display_name;
    } else {
      job = location;
    }
    return job;
  };
    
    const handleResetPage = () => {
        history.push("/");
        onResetPage();
    }

  const content = _.isObject(company) ? company?.display_name : company;

  return (
    <Wrapper>
      <TopHeader>
        <ChevronLeft
          onClick={() => handleResetPage()}
          size="38"
          style={{
            position: "absolute",
            top: "-50px",
            left: "-30px",
            cursor: "pointer",
          }}
        />
        <TopWrap>
          <TopHead>
            <LeftWrap>
              <JobTitle>{title.replace(/(<([^>]+)>)/gi, "")}</JobTitle>
              <CompanyName>{company}</CompanyName>
              <RequireWrap>
                <MapPin
                  style={{
                    marginRight: "2px",
                    position: "relative",
                    top: "6px",
                  }}
                  size="13"
                />
                <JobLocation>{jobLocation(location)}.</JobLocation>
              </RequireWrap>
              <CompanyName>
                {moment(new Date(created_at)).format("DD MMMM YYYY")}
              </CompanyName>
              <AlertBtn>{type}</AlertBtn>
            </LeftWrap>
          </TopHead>
          <ApplyBtn
            as="a"
            href={findLink(how_to_apply ?? redirect_url, company_url)}
            target="_blank"
            rel="noopener noreferrer"
          >
            Apply
          </ApplyBtn>
        </TopWrap>
      </TopHeader>
      <Description>
        <OverviewTitle>Overview</OverviewTitle>
        <OverviewDetail
          dangerouslySetInnerHTML={{ __html: content }}
        ></OverviewDetail>
        <DescriptTitle>Job Description</DescriptTitle>
        <DescriptDetail
          dangerouslySetInnerHTML={{ __html: description }}
        ></DescriptDetail>
        <BtnWrap>
          <ApplyBtn
            as="a"
            href={findLink(how_to_apply ?? redirect_url, company_url)}
            target="_blank"
            rel="noopener noreferrer"
          >
            Apply
          </ApplyBtn>
        </BtnWrap>
      </Description>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 40%;
  display: flex;
  flex-direction: column;
  background: ${theme.light};
  border-radius: 8px;
  position: absolute;
  top: 50px;
  left: 25%;
  box-shadow: 1px 1px 5px ${theme.textDark};
  @media ${device.smallScreen} {
    position: absolute;
    top: 390px;
    width: 90%;
    left: 0;
  }
`;

const TopWrap = styled.div`
  display: flex;
  flex-direction: row;
  @media ${device.smallScreen} {
    justify-content: space-between;
    flex-direction: column;
    width: 55%;
  }
`;

const RequireWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 100%;
  margin-bottom: 5px;
`;

const ApplyBtn = styled(SearchBtn)`
  text-decoration: none;
  text-align: center;
  padding-top: 10px;
`;

const TopHeader = styled.header`
  width: 100%;
  margin-top: 80px;
  position: relative;
  left: 40px;
  right: 4em;
  position: relative;
`;

const TopHead = styled.div`
  display: flex;
  flex-direction: row;
  width: 70%;
`;

const LeftWrap = styled.div`
  display: flex;
  width: 50%;
  flex-direction: column;
`;

const JobTitle = styled.h4`
  color: ${theme.dark};
  font-weight: 700;
  margin-bottom: 10px;
  font-size: 1.5em;
`;

const CompanyName = styled(JobTitle)`
  font-weight: 400;
  color: ${theme.textDark};
  font-size: 0.83em;
  margin-bottom: 5px;
`;

const JobLocation = styled.h5`
  color: ${theme.textDark};
  font-weight: 400;
  line-height: 1.9em;
  margin-bottom: 10px;
  font-size: 0.85em;
`;

const Description = styled.div`
  width: 87%;
  margin-top: 50px;
  position: relative;
  left: 40px;
  right: 4em;
  display: flex;
  flex-direction: column;
`;

const OverviewTitle = styled.span`
  color: ${theme.textDark};
  font-weight: 700;
  margin-bottom: 20px;
  font-size: 1.1em;
`;

const OverviewDetail = styled.p`
  color: ${theme.textDark};
  font-weight: 400;
  line-height: 1.9em;
  margin-bottom: 50px;
  font-size: 0.85em;

  & a {
    display: none;
  }
`;

const DescriptTitle = styled(OverviewTitle)``;

const DescriptDetail = styled(OverviewDetail)`
  margin-bottom: 10px;
  & strong,
  & b,
  & h1,
  & h2 {
    text-decoration: none;
    color: ${theme.light};
    line-height: 2;
    font-size: 0.8rem;
    margin-bottom: 20px;
  }

  & p {
    margin-bottom: 20px;
  }

  & ul {
    list-style: none;
    padding: 0;

    & li {
      padding-left: 1.3em;
      margin-bottom: 0.8em;
    }

    & a {
      display: none;
    }

    & li:before {
      content: " ";
      width: 8px;
      height: 8px;
      border-radius: 50%;
      border: 3px solid ${theme.listCircle};
      background: none;
      display: inline-block;
      margin-left: -1.3em;
      margin-right: 0.7em;
      position: relative;
      top: 2px;
    }
  }
`;

const BtnWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 87%;
  margin-bottom: 30px;
`;

export default JobDetails;
