import React from "react";
import styled from "styled-components";
import { iconlist } from "../icon/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { useSelector } from "react-redux";

library.add(fab);

const FooterWrap = styled.footer`
  width: 100%;
  height: 330px;
  display: grid;
  padding: 40px;
  grid-template-rows: repeat(4, 24px);
  align-content: space-between;
  background-color: #242a34;

  ${({ theme }) => {
    if (theme === "dark")
      return `  background-color: #242a34;
      color: #a6adba;

`;
    else
      return `
  background-color: #f9fafc;
  color:#000`;
  }}
`;

const Text = styled.div`
  margin: 0 auto;
`;

const PayImg = styled.ul`
  display: flex;
  margin: 0 auto;
  gap: 10px;
`;

const Icon = styled.li`
  width: 40px;
  height: 24px;
  display: flex;
  padding: 1px;
  border-radius: 10%;
  background-color: #fff;

  svg {
    display: block;
    margin: auto;
  }
`;

const SnsIcon = styled.div`
  margin: 0 auto;
  display: flex;
  gap: 15px;
  font-size: 24px;
`;

export default function Footer() {
  const theme = useSelector((state) => state.products.theme);

  const icons = iconlist.map(({ name, icon }) => (
    <Icon key={name}>{icon()}</Icon>
  ));
  return (
    <FooterWrap theme={theme}>
      <Text>hodoo</Text>
      <PayImg>{icons}</PayImg>
      <SnsIcon>
        <FontAwesomeIcon icon={["fab", "facebook"]}></FontAwesomeIcon>
        <FontAwesomeIcon icon={["fab", "instagram"]}></FontAwesomeIcon>
        <FontAwesomeIcon icon={["fab", "github"]}></FontAwesomeIcon>
      </SnsIcon>
      <Text>Copyright © 2022 Zero Base</Text>
    </FooterWrap>
  );
}
