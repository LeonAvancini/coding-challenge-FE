import React from "react";

import { SearchOutlined } from "@ant-design/icons";
import { Typography, Row } from "antd";
import styled from "styled-components";

import { devices } from "../breakpoints";

const { Title } = Typography;

const HeaderStyled = styled.header`
  background: rgb(2, 0, 36);
  background: linear-gradient(
    90deg,
    rgba(2, 0, 36, 1) 0%,
    rgba(9, 9, 121, 1) 35%,
    rgba(0, 212, 255, 1) 100%
  );
  position: sticky;
  padding: 10px;
  z-index: 1;
  top: 0;

  @media ${devices.tablet} {
    padding: 20px;
  }

  @media ${devices.laptop} {
    padding: 30px;
  }
`;

const TitleStyled = styled(Title)`
  margin-bottom: 0px !important;
  &.ant-typography {
    color: white;
  }
`;

const IconStyled = styled(SearchOutlined)`
  font-size: 40px;
  color: #00d4ff;
  margin-right: 10px;
`;

export const Header = () => {
  return (
    <HeaderStyled>
      <Row align="middle">
        <IconStyled />
        <TitleStyled>JoobGlee!</TitleStyled>
      </Row>
    </HeaderStyled>
  );
};
