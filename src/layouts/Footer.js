import React from "react";
import { devices } from "../breakpoints";
import styled from "styled-components";

const FooterStyled = styled.header`
  display: flex;
  justify-content: center;
  color: #ffffff;
  padding: 10px;
  background: #020024;

  margin-bottom: 10px;

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
