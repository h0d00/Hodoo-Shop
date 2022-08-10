import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Link } from "react-router-dom";
import StarRatings from "react-star-ratings";
import { updateCount } from "../redux/productSlice";

const Wrap = styled.div`
  width: 100%;
  padding: 30px 8px;
  ${({ theme }) => {
    if (theme === "dark")
      return `background-color:#2a303c;   color: #a6adba;

   `;
    else return `background-color:#fff; color:#000`;
  }}
`;

const DetailZone = styled.div`
  width: 80%;
  margin: 0 auto;

  @media screen and (max-width: 1024px) {
    width: 95%;
  }
`;

const Top = styled.div`
  width: 100%;
  padding: 8px 0;
  height: 36px;
`;

const Topul = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
`;

const List = styled.li`
  font-size: 14px;

  &::after {
    margin-left: 10px;
    content: ">";
  }

  &:last-child::after {
    content: "";
  }
`;

const Content = styled.div`
  width: 100%;
  margin-top: 50px;
  display: grid;
  grid-template-columns: 0.4fr 1fr;
  @media screen and (max-width: 1024px) {
    display: flex;
    flex-direction: column;
  }
`;

const Img = styled.figure`
  width: 100%;
  border-radius: 10px;
  height: 320px;
  padding: 60px;
  background-color: #fff;

  img {
    width: 70%;
    height: 100%;
    margin: auto;
    overflow: hidden;
    transition: all 0.2s linear;

    @media screen and (max-width: 1024px) {
      width: 30%;
    }
  }
`;
const TextZone = styled.div`
  display: grid;
  padding: 40px;
  grid-template-rows: 0.7fr 1.5fr 0.8fr 1fr 1.2fr;

  @media screen and (max-width: 1024px) {
    margin-top: 30px;
    padding: 0;
    grid-template-rows: 0.5fr 0.7fr 0.7fr 0.3fr 0.7fr;
  }
`;
const Title = styled.div`
  width: 100%;
  font-size: 20px;
  font-weight: bold;
`;

const Description = styled.div`
  width: 80%;
  font-size: 16px;
`;

const Rating = styled.div`
  width: 100%;
  margin-top: 15px;
  font-size: 16px;
  display: flex;
  gap: 10px;
`;

const TextRatings = styled.a`
  line-height: 30px;
`;

const Price = styled.div`
  width: 100%;
  font-size: 32px;
`;

const Btn = styled.div`
  margin-top: 15px;
  width: 100%;
  display: flex;
  gap: 20px;
`;

const CartIn = styled.button`
  width: 130px;
  height: 48px;
  background-color: #5716c8;

  color: #fff;
  font-weight: bold;
  border-radius: 10px;

  &:hover {
    background-color: #3e128b;
    transition: 0.2s;
  }
`;

const CartBtn = styled.button`
  width: 130px;
  height: 48px;
  border: 1.2px solid #a6adba;
  border-radius: 10px;
  font-weight: bold;

  &:hover {
    background-color: #a6adba;
    color: black;
    transition: 0.2s;
  }
`;
export default function Product() {
  const koreacategory = ["패션", "액세서리", "디지털"];
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const theme = useSelector((state) => state.products.theme);

  const { id } = useParams();
  const item = products[id - 1];
  let cartlist = JSON.parse(localStorage.getItem("cart"));

  function translation(category) {
    switch (category) {
      case "men's clothing":
        return koreacategory[0];
      case "women's clothing":
        return koreacategory[0];
      case "jewelery":
        return koreacategory[1];
      case "electronics":
        return koreacategory[0];
    }
  }

  function cartInput() {
    if (cartlist.length === 0) {
      cartlist.push({
        id: item.id,
        count: 1,
        title: item.title,
        image: item.image,
        price: item.price,
      });
    } else {
      if (cartlist.some((e) => e.id === item.id) === true)
        cartlist.map((e) => {
          if (e.id === item.id) {
            e.count += 1;
          }
        });
      else
        cartlist.push({
          id: item.id,
          count: 1,
          title: item.title,
          image: item.image,
          price: item.price,
        });
    }
    localStorage.setItem("cart", JSON.stringify(cartlist));
  }

  return (
    <Wrap theme={theme}>
      {products.length > 0 && (
        <DetailZone>
          <Top>
            <Topul>
              <List>{translation(item.category)}</List>
              <List>{item.title}</List>
            </Topul>
          </Top>
          <Content>
            <Img>
              <img src={item.image}></img>
            </Img>
            <TextZone>
              <Title>{item.title}</Title>
              <Description>{item.description}</Description>
              <Rating>
                <StarRatings
                  rating={item.rating.rate}
                  starRatedColor="yellow"
                  starDimension="24px"
                  starSpacing="1px"
                />
                <TextRatings>
                  {item.rating.rate} / {item.rating.count} {"참여"}
                </TextRatings>
              </Rating>
              <Price>${Math.ceil(item.price)}</Price>
              <Btn>
                <CartIn
                  onClick={() => {
                    cartInput();
                    dispatch(updateCount(cartlist));
                  }}
                >
                  장바구니에 담기
                </CartIn>
                <Link to="/cart">
                  <CartBtn>장바구니 이동</CartBtn>
                </Link>
              </Btn>
            </TextZone>
          </Content>
        </DetailZone>
      )}
    </Wrap>
  );
}
