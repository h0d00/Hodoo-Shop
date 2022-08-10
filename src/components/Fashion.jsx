import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Center = styled.div`
  width: 100%;
  padding-top: 50px;
  padding-bottom: 100px;

  ${({ theme }) => {
    if (theme === "dark")
      return `background-color:#2a303c;   color: #a6adba;

   `;
    else return `background-color:#fff; color:#000`;
  }}
`;
const Category = styled.div`
  width: 80%;
  overflow-y: hidden;
  overflow-x: scroll;
  margin: 0 auto;
  @media screen and (max-width: 1024px) {
    width: 95%;
  }
`;

const CategoryName = styled.div`
  position: relative;
  height: 40px;
  font-size: 36px;
  margin: 60px 0px 30px 0px;
  font-weight: bold;
  text-align: center;
`;

const ProductZone = styled.div`
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  width: 100%;
  gap: 27px;

  @media screen and (max-width: 1500px) {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }

  @media screen and (max-width: 1024px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  @media screen and (max-width: 450px) {
    display: grid;
    grid-template-columns: 1fr;
  }
`;

const Product = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  width: 320px;
  overflow: hidden;

  ${({ theme }) => {
    if (theme === "light") return ` border: 1px solid #f3f4f6 ;`;
  }}

  @media screen and (max-width: 1024px) {
    margin: 0 auto;
    width: 100%;
  }

  @media screen and (max-width: 800px) {
    margin: 0 auto;
    width: 100%;
  }

  @media screen and (max-width: 600px) {
    margin: 0 auto;
    width: 100%;
  }

  @media screen and (max-width: 450px) {
    margin: 0 auto;
    width: 80%;
  }
`;

const Img = styled.figure`
  display: flex;
  width: 100%;
  height: 320px;
  padding: 80px;
  background-color: #fff;

  @media screen and (max-width: 1024px) {
    height: 400px;
  }

  @media screen and (max-width: 600px) {
    height: 320px;
    padding: 60px;
  }
  img {
    width: 100%;
    transition: all 0.2s linear;
  }

  img:hover {
    transform: scale(1.2);
  }
`;
const Text = styled.div`
  height: 150px;
  background-color: #364152;
  padding: 20px;

  @media screen and (max-width: 600px) {
    padding: 15px;
    height: 170px;
  }

  ${({ theme }) => {
    if (theme === "dark")
      return `  background-color: #384152;
      color: #a6adba;
`;
    else
      return `
  background-color: #f9fafc;
  color:#000`;
  }}
`;

const Title = styled.div`
  display: flex;
  width: 100%;
  font-weight: bold;
  margin-bottom: 20px;

  @media screen and (max-width: 600px) {
    margin-bottom: 20px;
  }
`;

const Price = styled.div`
  display: flex;
  width: 100%;
`;

const Top = styled.div`
  width: 100%;
  padding: 8px 0;
  height: 36px;
`;

const Topul = styled.div`
  width: 80%;
  margin: 0 auto;
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

export default function ProductWrap() {
  const products = useSelector((state) => state.products.items);
  const theme = useSelector((state) => state.products.theme);

  const filter = [
    {
      category: "패션",
      items: products.filter((e) => e.category.includes("clothing")),
    },
  ];

  const view = filter.map((e) => (
    <figure key={e.category}>
      <Top>
        <Topul>
          <List>홈</List>
          <List>패션</List>
        </Topul>
      </Top>
      <CategoryName>{e.category}</CategoryName>
      <Category>
        <ProductZone>
          {e.items.map((item, idx) => {
            return (
              <Link to={`/product/${item.id}`} key={item.title}>
                <Product theme={theme}>
                  <Img>
                    <img src={item.image} />
                  </Img>
                  <Text theme={theme}>
                    <Title>{item.title}</Title>
                    <Price>${Math.ceil(item.price)}</Price>
                  </Text>
                </Product>
              </Link>
            );
          })}
        </ProductZone>
      </Category>
    </figure>
  ));
  return <Center theme={theme}>{view}</Center>;
}
