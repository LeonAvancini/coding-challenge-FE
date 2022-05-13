import React from "react";

import { useQuery } from "@apollo/react-hooks";

import JobList from "../../components/JobList";
import { QUERY_JOBS } from "../../queries/Jobs";
import JobCard from "../../components/JobCard";
import { Row, Col } from "antd";
import SearchForm from "../../components/SearchForm";

const loadingCards = [...Array(10).keys()];

const Home = () => {
  const { loading, error, data } = useQuery(QUERY_JOBS);

  if (loading) return loadingCards.map((i) => <JobCard key={i} isLoading />);

  //FIXME: Show error message with styles (OPTIONAL)
  if (error) return <p>Error! ${error.message}</p>;

  return (
    <Row>
      <Col span={24}>
        <SearchForm initialData={data.jobs} />
      </Col>
      <Col span={24}>
        <JobList jobs={data.jobs} />;
      </Col>
    </Row>
  );
};

export default Home;
