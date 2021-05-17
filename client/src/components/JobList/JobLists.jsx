import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import Loader from "react-loader-spinner";
import Job from "./JobCard";
import theme from "../screenquery/theme";
import JobsContext from "../../context/jobs";
import device from "../screenquery/mediaquery";
import _ from "lodash";

const JobLayout = () => {
  const { results, onResetPage, isLoading } = useContext(JobsContext);

  useEffect(() => {
    onResetPage();
  }, []);

  const location = (jobs) => {
    let job;

    if (typeof jobs.location === "object") {
      job = jobs?.location?.display_name;
    } else {
      job = jobs?.location;
    }
    return job;
  };

  const jobType = (jobs) => {
    let type = "Not available";
    if (!_.isEmpty(jobs?.type)) {
      type = jobs?.type;
    }

    if (!_.isEmpty(jobs?.contract_type)) {
      type = jobs?.contract_type;
    }
    return type;
  };

  const CustomLoader = function () {
    return (
      <LoaderWrapper>
        <LoaderHead>Your results will appear here...</LoaderHead>
        <Loader
          type="Puff"
          color="#00BFFF"
          height={100}
          width={100}
          timeout={60000} //1 mins
        />
      </LoaderWrapper>
    );
  };

  return (
    <Wrapper>
      {_.isEmpty(results) && isLoading === true ? (
        <CustomLoader />
      ) : (
        results.map((job, index) => (
          <Job
            title={job.title}
            descript={job.description}
            type={jobType(job)}
            location={location(job)}
            created={job?.created_at ?? job.created}
            key={job.id}
            index={index}
            id={job.id}
            how_to_apply={job.how_to_apply ?? job.redirect_url}
            company_url={job.company_url ?? job.redirect_url}
            company={job.company ?? job?.company?.display_name}
          />
        ))
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 40%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  position: absolute;
  top: 350px;
  left: 27%;
  @media ${device.smallScreen} {
    position: absolute;
    top: 390px;
    width: 90%;
    left: 0;
  }
`;

const LoaderWrapper = styled.div`
  display: grid;
  place-items: center;
  text-align: center;
  position: relative;
  top: 130px;
  left: 1%;
  width: 100%;
`;

const LoaderHead = styled.h1`
  font-weight: 400;
  color: ${theme.dark};
  position: absolute;
  top: -80px;
  @media ${device.smallScreen} {
    position: absolute;
    left: 0;
  }
`;

export default JobLayout;
