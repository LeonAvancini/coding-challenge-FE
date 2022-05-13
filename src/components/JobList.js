import React, { useState } from "react";

import { useQuery } from "@apollo/react-hooks";
import { Col, Row, Pagination } from "antd";

import { QUERY_JOBS } from "../queries/Jobs";
import JobCard from "./JobCard";

const loadingCards = [...Array(10).keys()];
const cardsPerPage = 10;

export const JobList = () => {
  const { loading, error, data } = useQuery(QUERY_JOBS);
  const [page, setPage] = useState(1);

  const handleChangePage = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) return loadingCards.map((i) => <JobCard key={i} isLoading />);

  //FIXME: Show error message with styles (OPTIONAL)
  if (error) return <p>Error! ${error.message}</p>;

  return (
    <Row justify="center">
      <Col xs={20} md={20}>
        <Row justify="space-evenly" align="middle">
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
                  investors={job.company.company_investors}
                />
              </Col>
            ))}
        </Row>
      </Col>

      <Col xs={24}>
        <Row justify="center">
          <Pagination
            size="small"
            defaultCurrent={1}
            total={data.jobs.length}
            onChange={(value) => handleChangePage(value)}
            showSizeChanger={false}
            style={{ marginBottom: "15px" }}
            hideOnSinglePage
          />
        </Row>
      </Col>
    </Row>
  );
};

export default JobList;
