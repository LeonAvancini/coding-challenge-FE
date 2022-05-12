import React from "react";
import { Card, Typography, Tooltip } from "antd";

const { Title } = Typography;

export const JobCard = ({
  id,
  title,
  city,
  CompanyName,
  investorsName,
  isLoading,
}) => {
  if (isLoading) {
    return (
      <Card
        size="small"
        style={{ width: 300, margin: "30px auto" }}
        loading={true}
      />
    );
  }

  return (
    <Card
      size="small"
      title={
        <Tooltip title={title} placement="top" color="blue">
          <Title underline strong level={5}>
            {title}
          </Title>
        </Tooltip>
      }
      style={{ maxWidth: 300, margin: "30px auto" }}
      headStyle={{ backgroundColor: "#f9f9f9", border: 0 }}
      bodyStyle={{ backgroundColor: "#ffffff", border: 0 }}
      //   extra={
      //     <a
      //       target="_blank"
      //       rel="noopener noreferrer"
      //       href={`job-information?id=${id}`}
      //     >
      //       More
      //     </a>
      //   }
    >
      <strong>City:</strong>
      <p>{city}</p>
      <strong>Company name:</strong>
      <p>{CompanyName}</p>
      {investorsName.length && (
        <>
          <strong>Investors:</strong>
          {investorsName.map(({ investor }) => (
            <p key={investor.name}>{investor.name}</p>
          ))}
        </>
      )}
    </Card>
  );
};

export default JobCard;
