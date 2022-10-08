import React, { Component } from "react";
import styled from 'styled-components';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default class SimpleSlider extends Component {
  render() {
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      centerMode: true,
      autoplay: true,
      autoplaySpeed: 4000,
      pauseOnHover: true,
      centerPadding: '0px',
      adaptiveHeight: true,
    };

    const items = [
        { id: 1, url: `${process.env.PUBLIC_URL}/img/banner_.png` },
        { id: 2, url: `${process.env.PUBLIC_URL}/img/banner_.png` },
        // { id: 3, url: "http://placeimg.com/1920/540/any"  },
      ];    

    return (
    <SliderWrapper>
        <StSlider {...settings}>
        {items.map(item => {
            return (
              <div key={item.id}>
                <ImageContainer>
                  <Image src={item.url} />
                </ImageContainer>
              </div>
            );
          })}
        </StSlider>
    </SliderWrapper>
    );
  }
}

const SliderWrapper = styled.div`
  /* background-color: darkblue; */
  width: 1210px;
  margin: 0 auto;
  margin-top: 20px;
  overflow: hidden;
  border-radius: 10px;
  @media only screen and (min-width: 854px) and (max-width: 1255px) {
    width: 800px;
  }

  @media only screen and (max-width: 854px) {
    width: 390px;
  }
`

const StSlider = styled(Slider)`
    .slick-slide > div{
      outline: none;
      width: 100%;
    }
`;

const ImageContainer = styled.div`
  width: 100%;
`;

const Image = styled.img`
  max-width: 100%;
  min-height: 150px;
  object-fit: cover;
`;