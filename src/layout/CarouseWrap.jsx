import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CarouselWrap = styled.div`
  width: 100%;
  @media screen and (max-width: 1024px) {
    height: 400px;
  }
  @media screen and (max-width: 450px) {
    height: 300px;
  }

  @media screen and (max-width: 400px) {
    height: 200px;
  }

  .slick-dots {
    bottom: 30px;
  }

  .slick-dots li button:before {
    color: #fff;
  }

  .slick-arrow {
    z-index: 10;
    width: 50px;
    height: 100%;

    &:hover {
      background: #1b1b1bab;
      transition: 0.7s;
      &::before {
        color: rgba($bk, 0.5);
      }
    }
    &::before {
      font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS",
        sans-serif;
      font-weight: 900;
      font-size: 30px;
      transition: all 0.5s;
    }
  }

  .slick-prev {
    left: 0px;

    &::before {
      content: "<";
    }
  }

  .slick-next {
    right: 0px;

    &::before {
      content: ">";
    }
  }
`;

const ImgZone = styled.div`
  width: 100%;
  height: 700px;
  position: relative;

  @media screen and (max-width: 1024px) {
    height: 400px;
  }
  @media screen and (max-width: 450px) {
    height: 300px;
  }

  @media screen and (max-width: 400px) {
    height: 200px;
  }
`;

const Img = styled.img`
  width: 100%;
  object-fit: cover;
`;

const ImgLinkZone = styled.div`
  width: 70%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const Title = styled.h2`
  color: #fff;
  font-size: 40px;
  font-weight: bold;
`;
const Content = styled.p`
  color: #fff;
  font-size: 17px;
`;

const LinkBtn = styled.div`
  width: 110px;
  margin-top: 12px;
  color: #a6adb8;
  font-size: 15px;
  font-weight: 600;
  text-align: center;
  border-radius: 10%;
  line-height: 50px;
  background-color: #191e24;

  &:hover {
    background-color: #0e1114;
    transition: 0.5s;
  }
  .arrow {
    margin-left: 3px;
  }
`;

export default function Main() {
  const images = [
    {
      id: 0,
      url: "https://react-shop-oinochoe.vercel.app/img_shop_fashion.jpeg",
      title: "물빠진 청바지!",
      Content: "이제 막 도착한 패션 창바지를 구경해보세요!",
      link: "/fashion",
    },
    {
      id: 1,
      url: "https://react-shop-oinochoe.vercel.app/img_shop_digital.jpeg",
      title: "신속한 업무처리!",
      Content: "다양한 디지털 상품을 둘러보세요.",
      link: "/digital",
    },
    {
      id: 2,
      url: "https://react-shop-oinochoe.vercel.app/img_shop_grocery.jpeg",
      title: "신선한 식품!",
      Content: "농장 직배송으로 더욱 신선한 식료품을 만나보세요.",
      link: "/",
    },
  ];

  const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 1000,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: false,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const slideshow = images.map((image) => (
    <ImgZone key={image.id}>
      <Img src={image.url} />
      <ImgLinkZone>
        <Title>{image.title} </Title>
        <Content>{image.Content}</Content>
        <LinkBtn>
          <Link to={image.link}>
            바로가기 <span className="arrow">➜</span>
          </Link>{" "}
        </LinkBtn>
      </ImgLinkZone>
    </ImgZone>
  ));

  return (
    <>
      <CarouselWrap>
        <Slider {...settings}>{slideshow}</Slider>
      </CarouselWrap>
    </>
  );
}
