import React from "react";
import { SearchOutlined } from "@ant-design/icons";
import { devices } from "../breakpoints";
import { Typography, Row } from "antd";
import styled from "styled-components";

const { Title } = Typography;

const HeaderStyled = styled.header`
  position: sticky;
  z-index: 1;
  top: 0;
  padding: 10px;
  background: rgb(2, 0, 36);
  background: linear-gradient(
    90deg,
    rgba(2, 0, 36, 1) 0%,
    rgba(9, 9, 121, 1) 35%,
    rgba(0, 212, 255, 1) 100%
  );

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

export const Header = () => {
  return (
    <HeaderStyled>
      <Row align="middle">
        <SearchOutlined
          style={{ fontSize: "40px", color: "#00d4ff", marginRight: "10px" }}
        />
        <TitleStyled>JoobGlee! </TitleStyled>
      </Row>
    </HeaderStyled>
  );
};
