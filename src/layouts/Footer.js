import React from "react";
import styled from "styled-components";

import { devices } from "../breakpoints";

const FooterStyled = styled.header`
  display: flex;
  justify-content: center;
  color: #ffffff;
  padding: 10px;
  background: #020024;
  margin: 10px 0px;
  @media ${devices.tablet} {
    padding: 20px;
  }

  @media ${devices.laptop} {
    padding: 30px;
  }
`;

export const Footer = () => {
  return (
    <FooterStyled>
      <span>TalentSpace FE Challenge - Avancini Leon</span>
    </FooterStyled>
  );
};
