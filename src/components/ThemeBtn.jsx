import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { themeToggle } from "../redux/productSlice";

export default function ThemeBtn() {
  const [state, setState] = useState();
  const theme = useSelector((state) => state.products.theme);
  const dispatch = useDispatch();

  return (
    <>
      {theme === "dark" ? (
        <FontAwesomeIcon
          onClick={() => {
            setState(!state);
            dispatch(themeToggle(state));
          }}
          icon={faSun}
        />
      ) : (
        <FontAwesomeIcon
          onClick={() => {
            setState(!state);
            dispatch(themeToggle(state));
          }}
          icon={faMoon}
        />
      )}
    </>
  );
}
