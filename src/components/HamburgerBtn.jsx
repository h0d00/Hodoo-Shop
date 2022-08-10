import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

const Three = styled.div`
  margin-top: 8px;
  margin-right: 20px;

  @media screen and (min-width: 800px) {
    display: none;
  }

  #hamburger .line {
    width: 30px;
    height: 4px;
    background-color: #ecf0f1;
    display: block;
    margin: 5px auto;
    -webkit-transition: all 0.3s ease-in-out;
    -o-transition: all 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;

    ${({ theme }) => {
      if (theme === "dark") return `background-color: #ecf0f1;`;
      else return `background-color: #000;`;
    }}
  }

  #hamburger:hover {
    cursor: pointer;
  }

  /* ONE */

  #hamburger.is-active .line:nth-child(2) {
    opacity: 0;
  }

  #hamburger.is-active .line:nth-child(1) {
    transform: translateY(8px) rotate(45deg);
  }

  #hamburger.is-active .line:nth-child(3) {
    transform: translateY(-10px) rotate(-45deg);
  }
`;

export default function HamburgerBtn(props) {
  const theme = useSelector((state) => state.products.theme);
  return (
    <>
      <Three theme={theme} className="HAM">
        <div className={props.isActive ? "is-active" : null} id="hamburger">
          <span className="line"></span>
          <span className="line"></span>
          <span className="line"></span>
        </div>
      </Three>
    </>
  );
}
