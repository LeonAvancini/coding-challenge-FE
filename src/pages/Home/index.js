import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { Row, Col, Typography } from "antd";
import styled from "styled-components";

import SearchForm from "../../components/SearchForm";
import { QUERY_JOBS } from "../../queries/Jobs";
import JobList from "../../components/JobList";
import JobCard from "../../components/JobCard";

const { Title } = Typography;

const RowStyled = styled(Row)`
  min-height: 100vh;
  align-content: flex-start;
`;
const loadingCards = [...Array(10).keys()];

const Home = () => {
  const { loading, error, data } = useQuery(QUERY_JOBS);
  const [dataWasFiltered, setDataWasFiltered] = useState(false);
  const [jobsFiltered, setJobsFiltered] = useState([]);

  const handleFilteredData = (values) => {
    setJobsFiltered(values);
    setDataWasFiltered(true);
  };

  if (loading) return loadingCards.map((i) => <JobCard key={i} isLoading />);

  if (error) {
    return (
      <RowStyled justify="center" align="center">
        <Col span={24}>
          <SearchForm
            initialData={data.jobs}
            dataFiltered={(data) => handleFilteredData(data)}
          />
        </Col>
        <Title style={{ marginTop: "20px" }}>An error occurred</Title>
      </RowStyled>
    );
  }
  if (
    (dataWasFiltered && !jobsFiltered.length) ||
    (!dataWasFiltered && !data.jobs)
  ) {
    return (
      <RowStyled justify="center" align="center">
        <Col span={24}>
          <SearchForm
            initialData={data.jobs}
            dataFiltered={(data) => handleFilteredData(data)}
          />
        </Col>
        <Title style={{ marginTop: "20px" }}>No data available</Title>
      </RowStyled>
    );
  }
  return (
    <RowStyled>
      <Col span={24}>
        <SearchForm
          initialData={data.jobs}
          dataFiltered={(data) => handleFilteredData(data)}
        />
      </Col>
      <Col span={24}>
        <JobList jobs={dataWasFiltered ? jobsFiltered : data.jobs} />
      </Col>
    </RowStyled>
  );
};

export default Home;
