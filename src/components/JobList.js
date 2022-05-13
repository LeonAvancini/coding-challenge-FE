import React, { useState } from "react";
import { Col, Row, Pagination } from "antd";

import JobCard from "./JobCard";

const cardsPerPage = 10;

export const JobList = ({ jobs }) => {
  const [page, setPage] = useState(1);

  const handleChangePage = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Row justify="center" style={{ height: "100vh" }}>
      <Col xs={20} md={20}>
        <Row justify="space-evenly" align="middle">
          {jobs
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
            total={jobs.length}
            onChange={(value) => handleChangePage(value)}
            showSizeChanger={false}
            hideOnSinglePage
          />
        </Row>
      </Col>
    </Row>
  );
};

export default JobList;
