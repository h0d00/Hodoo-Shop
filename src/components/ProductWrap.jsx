import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Center = styled.div`
  width: 100%;
  ${({ theme }) => {
    if (theme === "dark") return `background-color:#2a303c`;
    else return `background-color:#fff;`;
  }}
`;
const Wrap = styled.div`
  padding: 100px 0px;
  ${({ theme }) => {
    if (theme === "dark") return `background-color:#2a303c`;
    else return `background-color:#fff;`;
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
  color: #a6adba;
  font-size: 36px;
  margin: 0 0px 30px 0px;
  font-weight: bold;
  text-align: center;

  ${({ theme }) => {
    if (theme === "dark") return `color:#a6adba`;
    else return `color:#000;`;
  }}
`;

const ProductZone = styled.div`
  margin: 0 auto;
  display: flex;
  width: 100%;
  gap: 27px;

  @media screen and (max-width: 1024px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  @media screen and (max-width: 450px) {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
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
    width: 218px;
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
  padding: 20px;

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
  @media screen and (max-width: 600px) {
    padding: 15px;
    height: 170px;
  }
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

export default function ProductWrap() {
  const theme = useSelector((state) => state.products.theme);
  const products = useSelector((state) => state.products.items);

  const filter = [
    {
      category: "패션",
      items: products.filter((e) => e.category.includes("clothing")),
    },
    {
      category: "액세서리",
      items: products.filter((e) => e.category === "jewelery"),
    },
    {
      category: "디지털",
      items: products.filter((e) => e.category === "electronics"),
    },
  ];

  const view = filter.map((e) => (
    <Wrap theme={theme} key={e.category}>
      <CategoryName theme={theme}>{e.category}</CategoryName>
      <Category>
        <ProductZone theme={theme}>
          {e.items.map((item, idx) => {
            if (idx < 4)
              return (
                <Link to={`/product/${item.id}`} key={item.title}>
                  <Product theme={theme}>
                    <Img>
                      <img src={item.image} />
                    </Img>
                    <Text theme={theme}>
                      <Title>{item.title}</Title>
                      <Price>${Math.floor(item.price)}</Price>
                    </Text>
                  </Product>
                </Link>
              );
          })}
        </ProductZone>
      </Category>
    </Wrap>
  ));
  return <Center theme={theme}>{view}</Center>;
}
