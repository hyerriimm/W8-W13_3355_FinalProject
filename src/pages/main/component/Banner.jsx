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
    };

    const items = [
        { id: 1, url: `${process.env.PUBLIC_URL}/img/banner_1.png` },
        { id: 2, url: `${process.env.PUBLIC_URL}/img/banner_1.png` },
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
  width: 100%;
  height: 100%;
  overflow: hidden;
`

const StSlider = styled(Slider)`
    .slick-slide div{
      outline: none;
    }
    /* .slick-list { padding: 0 20px 0 20px !important; } */
`;

const ImageContainer = styled.div`
  width: 100%;
`;

const Image = styled.img`
  max-width: 100%;
  max-height: 80%;
  min-height: 240px;
  object-fit: cover;
`;