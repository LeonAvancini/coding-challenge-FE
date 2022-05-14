import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { Row, Col } from "antd";

import SearchForm from "../../components/SearchForm";
import { QUERY_JOBS } from "../../queries/Jobs";
import JobList from "../../components/JobList";
import JobCard from "../../components/JobCard";

const loadingCards = [...Array(10).keys()];

const Home = () => {
  const [jobsFiltered, setJobsFiltered] = useState([]);
  const { loading, error, data } = useQuery(QUERY_JOBS);

  if (loading) return loadingCards.map((i) => <JobCard key={i} isLoading />);

  //FIXME: Show error message with styles (OPTIONAL)
  if (error) return <p>Error! ${error.message}</p>;

  const handleFilteredData = (values) => {
    setJobsFiltered(values);
  };

  return (
    <Row>
      <Col span={24}>
        <SearchForm
          initialData={data.jobs}
          dataFiltered={(data) => handleFilteredData(data)}
        />
      </Col>
      <Col span={24}>
        <JobList jobs={jobsFiltered.length ? jobsFiltered : data.jobs} />;
      </Col>
    </Row>
  );
};

export default Home;
