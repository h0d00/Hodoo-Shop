import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { updateCount } from "../redux/productSlice";
import { Link } from "react-router-dom";

const Wrap = styled.div`
  width: 100%;
  min-height: 700px;
  padding: 100px 8px;

  ${({ theme }) => {
    if (theme === "dark")
      return `background-color:#2a303c;   color: #a6adba;

   `;
    else return `background-color:#fff; color:#000`;
  }}
`;

const CartZone = styled.div`
  width: 80%;
  margin: 0 auto;
  display: flex;

  @media screen and (max-width: 1024px) {
    width: 95%;
    display: flex;
    flex-direction: column;
  }
`;

const ProductWrap = styled.div`
  width: 100%;
`;

const Product = styled.div`
  width: 100%;
  margin-bottom: 50px;
  display: flex;

  @media screen and (max-width: 1024px) {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
`;

const Payment = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
  gap: 10px;

  @media screen and (max-width: 1024px) {
    width: 100%;
    padding: 0 40px;
  }
`;

const Img = styled.div`
  width: 200px;

  padding: 30px;
  background-color: #fff;
  border-radius: 10px;
  img {
    margin: 0 auto;
    width: 100px;
    height: 100px;

    @media screen and (max-width: 1024px) {
      width: 250px;
      height: 288px;
    }
  }

  @media screen and (max-width: 1024px) {
    width: 100%;
  }
`;

const Right = styled.div`
  width: 100%;
  height: 200px;

  display: grid;
  padding: 20px 40px;
  gap: 10px;
  grid-template-rows: 0.5fr 1fr 1fr;
`;

const Title = styled.div`
  font-size: 18px;
  font-weight: bold;
`;
const Price = styled.div`
  font-size: 30px;
`;
const Minus = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 100px;
  background-color: #5716c8;
  color: #fff;

  &:hover {
    background-color: #3e128b;
    transition: 0.2s;
  }
`;
const Plus = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 100px;
  background-color: #5716c8;
  color: #fff;

  &:hover {
    background-color: #3e128b;
    transition: 0.2s;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  width: 120px;
`;

const Count = styled.div`
  width: 40px;
  height: 40px;
  line-height: 40px;
  text-align: center;
`;

const PaymentBtn = styled.button`
  width: 80px;
  font-weight: bold;
  font-size: 13px;
  border-radius: 10px;
  height: 40px;
  background-color: #5716c8;
  color: #fff;
  &:hover {
    background-color: #3e128b;
    transition: 0.2s;
  }
`;

const AllPrice = styled.div`
  font-size: 22px;
  line-height: 40px;
  width: 100%;
`;

export default function Cart() {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")));
  const theme = useSelector((state) => state.products.theme);
  const dispatch = useDispatch();

  if (cart !== null) {
    cart.map((e, idx) => {
      if (e.count === 0) {
        cart.splice(idx, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
      }
    });
  }

  function Allprice(Array) {
    return Array.map((e) => e.count * Math.ceil(e.price)).reduce(
      (prev, curr) => prev + curr
    );
  }
  return (
    <Wrap theme={theme}>
      <CartZone>
        <ProductWrap>
          {cart === null || cart.length === 0 ? (
            <div> 장바구니가 비어 있습니다.</div>
          ) : (
            cart.map((e) => (
              <Product key={e.id}>
                <Link to={`/product/${e.id}`}>
                  <Img>
                    <img src={e.image} />
                  </Img>
                </Link>
                <Right>
                  <Link to={`/product/${e.id}`}>
                    <Title>{e.title}</Title>
                  </Link>
                  <Price>
                    $ {(Math.ceil(e.price) * e.count).toLocaleString("en-US")}
                  </Price>
                  <ButtonGroup>
                    <Minus
                      onClick={() => {
                        if (e.count > 0) {
                          e.count--;
                          localStorage.setItem("cart", JSON.stringify(cart));
                          dispatch(updateCount(cart));
                          setCart(JSON.parse(localStorage.getItem("cart")));
                        }
                      }}
                    >
                      -
                    </Minus>
                    <Count>{e.count}</Count>
                    <Plus
                      onClick={() => {
                        e.count++;
                        localStorage.setItem("cart", JSON.stringify(cart));
                        dispatch(updateCount(cart));
                        setCart(JSON.parse(localStorage.getItem("cart")));
                      }}
                    >
                      +
                    </Plus>
                  </ButtonGroup>
                </Right>
              </Product>
            ))
          )}
        </ProductWrap>

        <Payment>
          {cart.length !== 0 || cart === null ? (
            <AllPrice>총액 : $ {Allprice(cart).toLocaleString()}</AllPrice>
          ) : (
            <AllPrice>총액 : $ 0</AllPrice>
          )}
          <PaymentBtn
            onClick={() => {
              alert("구매하시겠습니까?");
              cart.length = 0;
              localStorage.setItem("cart", JSON.stringify(cart));
              dispatch(updateCount(cart));
              setCart(JSON.parse(localStorage.getItem("cart")));
            }}
          >
            구매하기
          </PaymentBtn>
        </Payment>
      </CartZone>
    </Wrap>
  );
}
