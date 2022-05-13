import React from "react";

import { Card, Typography, Tooltip, Row, Col, Space } from "antd";
import styled from "styled-components";

import { devices } from "../breakpoints";

const StyledCard = styled(Card)`
  max-width: 400px;
  cursor: pointer;
  margin: 10px auto;

  @media ${devices.tablet} {
    margin: 20px auto;
  }

  @media ${devices.laptop} {
    margin: 30px auto;
  }
`;

const { Title, Text } = Typography;

export const JobCard = ({
  id,
  title,
  city,
  CompanyName,
  investors,
  isLoading,
}) => {
  const investorsFormatted = investors?.reduce(
    (acc, act, i) => acc + (i ? " - " : "") + act.investor.name,
    ""
  );

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
    <StyledCard
      title={
        <Tooltip title={title} placement="top" color="blue">
          <Title underline strong level={5}>
            {title}
          </Title>
        </Tooltip>
      }
      headStyle={{ backgroundColor: "#f9f9f9", border: 0 }}
      bodyStyle={{ backgroundColor: "#ffffff", border: 0 }}
      size="small"
    >
      <Row>
        <Col span={24}>
          <Space>
            <Text strong>City:</Text>
            <Text italic>{city}</Text>
          </Space>
        </Col>

        <Col span={24}>
          <Space>
            <Text strong italic>
              Company name:
            </Text>
            <Text italic>{CompanyName}</Text>
          </Space>
        </Col>

        <Col span={24}>
          {investorsFormatted && (
            <Space align="flex-start" style={{ display: "flex" }}>
              <Text strong>Investors:</Text>
              <Text italic>{investorsFormatted}</Text>
            </Space>
          )}
        </Col>
      </Row>
    </StyledCard>
  );
};

export default JobCard;
