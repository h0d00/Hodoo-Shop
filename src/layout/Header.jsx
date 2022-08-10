import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "animate.css";
import { faShoppingBag, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import HamburgerBtn from "../components/HamburgerBtn";
import ThemeBtn from "../components/ThemeBtn";

const HeaderWrap = styled.div`
  position: fixed;
  top: 0;
  z-index: 100;
  width: 100%;
  height: 64px;
  padding: 8px;
  background-color: #191d24;
  color: #fff;

  ${({ theme }) => {
    if (theme === "dark")
      return `  background-color: #191d24;
  color: #fff;`;
    else
      return `
  background-color: #fff;
  color: #000;
  box-shadow:0 0 5px 0 #afaaaaa0;  `;
  }}
`;

const Nav = styled.div`
  width: 80%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  line-height: 48px;

  @media screen and (max-width: 1024px) {
    width: 95%;
  }
`;

const Logo = styled.div`
  font-size: 18px;
  font-weight: bold;
  @media screen and (max-width: 330px) {
    display: none;
  }
`;

const Navigator = styled.div`
  display: flex;
  margin-left: 20px;
  font-size: 13px;
  font-weight: bold;
  margin-right: 30px;
  @media screen and (max-width: 800px) {
    display: none;
  }
`;

const List = styled.div`
  width: 0 auto;
  text-align: center;
  padding: 0px 10px;

  &:hover {
    border-radius: 5px;
    transition: 0.3s ease-out;
    ${({ theme }) => {
      if (theme === "dark")
        return `    background-color: #494848;
;

   `;
      else return ` background-color: #d1d4db;`;
    }}
  }
`;

const Right = styled.div`
  margin-left: auto;
  display: flex;
`;

const TemeButton = styled.button`
  padding: 0 20px;
  font-size: 22px;
  @media screen and (max-width: 800px) {
    padding: 0 5px;
  }
`;

const CartButton = styled.div`
  padding: 0 20px;
  font-size: 22px;
  margin-left: 5px;
  position: relative;
  &:hover {
    background-color: #494848;
    border-radius: 20%;
    transition: 0.3s ease-out;
  }
  @media screen and (max-width: 800px) {
    padding: 0 5px;
  }
`;

const CartCount = styled.span`
  width: 23px;
  height: 20px;
  font-size: 12px;
  text-align: center;
  line-height: 20px;
  position: absolute;
  top: 2px;
  right: 8px;
  border-radius: 40%;
  background-color: #ed4544;
  color: #fff;
  @media screen and (max-width: 800px) {
    right: -8px;
  }
`;

const SearchWrap = styled.div`
  width: 183px;
  @media screen and (max-width: 800px) {
    display: none;
  }
`;
const SearchBtn = styled.div`
  padding: 0 20px;
  display: none;
  font-size: 22px;
  &:hover {
    background-color: #494848;
    border-radius: 20%;
    transition: 0.3s ease-out;
  }
  @media screen and (max-width: 800px) {
    display: block;
  }
`;

const PhoneInput = styled.input`
  position: fixed;
  width: 100%;
  z-index: 10000;
  height: 48px;
  padding: 20px;
  border: none;
  outline: none;
  @media screen and (min-width: 800px) {
    display: none;
  }

  ${({ theme }) => {
    if (theme === "dark") return `background-color: #4c5564; color:#fff`;
    else return `background-color : #d1d4db; color:#000;`;
  }}
`;

const MiniFilter = styled.div`
  width: 100%;
  position: fixed;
  color: #fff;
  max-height: 300px;
  z-index: 100;
  background-color: #4c5564;
  overflow: scroll;
  top: 110px;
  div {
    padding-left: 10px;
    line-height: 50px;
    width: 100%;
    height: 50px;
    font-size: 12px;
    overflow: hidden;
    text-overflow: ellipsis;
    @media screen and (min-width: 800px) {
      display: none;
    }
    &:hover {
      background-color: #b5b7ba;
    }
  }

  ${({ theme }) => {
    if (theme === "dark") return `background-color: #4c5564; color:#fff`;
    else return `background-color : #d1d4db; color:#000;`;
  }}
`;

const SearchBar = styled.input`
  width: 183px;
  height: 48px;
  border-radius: 0.25rem;
  padding: 0 15px;
  outline: none;
  ${({ theme }) => {
    if (theme === "dark") return `background-color: #4c5564; color:#fff`;
    else return `background-color : #d1d4db; color:#000;`;
  }}
`;

const Filter = styled.div`
  width: 120%;
  max-height: 300px;
  overflow: scroll;
  background-color: #4c5564;

  div {
    padding-left: 10px;
    width: 100%;
    height: 50px;
    font-size: 12px;
    overflow: hidden;
    text-overflow: ellipsis;

    &:hover {
      background-color: #b5b7ba;
    }
  }

  ${({ theme }) => {
    if (theme === "dark") return `background-color: #4c5564; color:#fff`;
    else return `background-color : #fff; color:#000;`;
  }}
`;

const Ang = styled.div`
  width: 100%;
  position: fixed;
  height: 100vh;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.5);

  ${({ isActive }) => {
    if (isActive === false || isActive === undefined) return `display:none`;
  }};

  @media screen and (min-width: 800px) {
    display: none;
  }
`;

const ToggleMenu = styled.div`
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  position: fixed;
  left: -300px;
  width: 300px;
  height: 100vh;
  z-index: 100;

  ${({ theme }) => {
    if (theme === "dark") return `background-color: #2b303c; color:#fff`;
    else return `background-color : #fff; color:#000;`;
  }};

  ${({ isActive }) => {
    if (isActive === undefined) return `display:none`;
  }};

  ${({ isActive }) => {
    return isActive
      ? `animation: moveToRight 1s ease-in-out;
      left:0;
      `
      : `
      animation: moveToLeft 1s ease-in-out;
      `;
  }};

  @keyframes moveToRight {
    0% {
      transform: translateX(-300px);
    }
    100% {
      transform: translateX(0px);
    }
  }
  @keyframes moveToLeft {
    0% {
      transform: translateX(300px);
    }
    100% {
      transform: translateX(0px);
    }
  }
`;

const ToggleList = styled.div`
  width: 180px;
  padding: 0 20px;
  line-height: 40px;
  height: 40px;
  font-size: 20px;

  &:hover {
    background-color: #494848;
    transition: 0.3s ease-out;
    border-radius: 10px;

    ${({ theme }) => {
      if (theme === "dark")
        return `    background-color: #494848;
`;
      else return ` background-color: #d1d4db;`;
    }};
  }
`;

export default function Header() {
  const theme = useSelector((state) => state.products.theme);
  const cartCount = useSelector((state) => state.products.cartCount);
  const items = useSelector((state) => state.products.items);
  const [searchText, setSearchText] = useState("");
  const [searchTrue, setSearchTrue] = useState(false);
  const [isActive, setActive] = useState();
  const Toggle = useRef();

  useEffect(() => {
    function handleClickOutside(e) {
      if (isActive === undefined) {
        if (
          e.target.parentElement.id === "hamburger" ||
          e.target.parentElement.id === "hamburger" ||
          e.target.className === "line"
        ) {
          setActive(!isActive);
        }
      } else if (Toggle.current && !Toggle.current.contains(e.target)) {
        setActive(false);
        if (
          e.target.id === "hamburger" ||
          e.target.parentElement.id === "hamburger" ||
          e.target.className === "line"
        ) {
          setActive(!isActive);
        }
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  const filtered = items
    .filter((item) => {
      if (searchText === "") {
        return "";
      } else if (item.title.toLowerCase().includes(searchText.toLowerCase())) {
        return item.title;
      }
    })
    .map((e) => (
      <Link to={`/product/${e.id}`} key={e.title}>
        <div onClick={() => setSearchText("")}>{e.title}</div>
      </Link>
    ));

  return (
    <>
      {searchTrue === true && (
        <>
          <PhoneInput
            theme={theme}
            type="text"
            placeholder="검색"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          ></PhoneInput>
          <MiniFilter theme={theme}>{filtered}</MiniFilter>
        </>
      )}
      <Ang isActive={isActive}>
        <ToggleMenu theme={theme} ref={Toggle} isActive={isActive}>
          <Link to="/fashion">
            <ToggleList theme={theme}>패션</ToggleList>
          </Link>

          <Link to="/accessory">
            <ToggleList theme={theme}>액세서리</ToggleList>
          </Link>

          <Link to="/digital">
            <ToggleList theme={theme}>디지털</ToggleList>
          </Link>
        </ToggleMenu>
      </Ang>
      <HeaderWrap theme={theme}>
        <Nav>
          <HamburgerBtn />
          <Logo as="h1">
            <Link to="/">React Shop</Link>
          </Logo>
          <Navigator>
            <Link to="/fashion">
              <List theme={theme}>패션</List>
            </Link>

            <Link to="/accessory">
              <List theme={theme}>액세서리</List>
            </Link>

            <Link to="/digital">
              <List theme={theme}>디지털</List>
            </Link>
          </Navigator>
          <Right>
            <TemeButton>
              <ThemeBtn />
            </TemeButton>
            <SearchBtn
              onClick={() => {
                setSearchTrue(!searchTrue);
              }}
            >
              <FontAwesomeIcon icon={faSearch} />
            </SearchBtn>
            <SearchWrap>
              <SearchBar
                theme={theme}
                type="text"
                placeholder="검색"
                value={searchText}
                onChange={(e) => {
                  setSearchText(e.target.value);
                }}
              ></SearchBar>
              <Filter theme={theme}>{filtered}</Filter>
            </SearchWrap>
            <Link to="cart">
              <CartButton>
                <FontAwesomeIcon icon={faShoppingBag} />
                <CartCount>{cartCount}</CartCount>
              </CartButton>
            </Link>
          </Right>
        </Nav>
      </HeaderWrap>
    </>
  );
}
