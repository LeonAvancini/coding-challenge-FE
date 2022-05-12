import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { QUERY_JOBS } from "../queries/Jobs";
import JobCard from "./JobCard";
import { Col, Row, Pagination } from "antd";

const loadingCards = [...Array(10).keys()];
const cardsPerPage = 10;

const JobList = () => {
  const { loading, error, data } = useQuery(QUERY_JOBS);
  const [page, setPage] = useState(1);

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  if (loading) return loadingCards.map((i) => <JobCard key={i} isLoading />);
  //TODO: Show error message (OPTIONAL)
  if (error) return <p>Error! ${error.message}</p>;

  return (
    <Row justify="center">
      <Col xs={24} md={20}>
        <Row justify="space-between">
          {data.jobs
            .slice(
              (page - 1) * cardsPerPage,
              (page - 1) * cardsPerPage + cardsPerPage
            )
            .map((job) => (
              <Col key={job.id} md={9} xs={24}>
                <JobCard
                  id={job.id}
                  title={job.title}
                  city={job.city}
                  CompanyName={job.company.name}
                  investorsName={job.company.company_investors}
                />
              </Col>
            ))}
        </Row>
      </Col>

      <Pagination
        defaultCurrent={1}
        total={data.jobs.length}
        onChange={(value) => {
          console.log("Pagina actual", value);
          handleChangePage(value);
        }}
        showSizeChanger={false}
        style={{ marginBottom: "15px" }}
        hideOnSinglePage
      />
    </Row>
  );
};

export default JobList;
