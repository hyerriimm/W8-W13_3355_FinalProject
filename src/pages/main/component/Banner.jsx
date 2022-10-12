import React, { Component, useState, useEffect } from "react";
import styled from 'styled-components';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


import banner from '../../../assets/img/nw_banner_pc01.png';
import banner_gift from '../../../assets/img/nw_banner_pc03.png';
import bannerMobile from '../../../assets/img/nw_banner01.png';
import bannerMobileGift from '../../../assets/img/nw_banner03.png';

const Banner = () => {
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

      // const items = [
      //     { id: 1, url: `${process.env.PUBLIC_URL}/img/nw_banner01.png` },
      //     { id: 2, url: `${process.env.PUBLIC_URL}/img/nw_banner03.png` },
      //     // { id: 3, url: "http://placeimg.com/1920/540/any"  },
      //   ];

    const [windowSize, setWindowSize] = useState({
      width: undefined,
      height: undefined,
    });
    const [isMobile, setIsMobile] = useState();
  
    useEffect(() => {
      function handleResize() {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
      window.addEventListener('resize', handleResize);
      handleResize();
      if (windowSize.width < 1255) {
        setIsMobile(true);
      } else if (windowSize.width >= 1255) {
        setIsMobile(false);
      }
      return () => window.removeEventListener('resize', handleResize);
    }, [windowSize.width]);

    return (
    // <SliderWrapper>
    //     <StSlider {...settings}>
    //     {items.map(item => {
    //         return (
    //           <div key={item.id}>
    //             <ImageContainer>
    //               <Image src={item.url} />
    //             </ImageContainer>
    //           </div>
    //         );
    //       })}
    //     </StSlider>
    // </SliderWrapper>
     <SliderWrapper>
     <StSlider {...settings}>
           <div >
               <Image src={isMobile ? bannerMobile : banner} alt=""/>
           </div>
           <div >
               <Image src={isMobile ? bannerMobileGift : banner_gift} alt=""/>
           </div>
     </StSlider>
 </SliderWrapper>
    );
  };

  export default Banner;

const SliderWrapper = styled.div`

  width: 1200px;
  margin: 0 auto;
  margin-top: 20px;
  overflow: hidden;
  border-radius: 10px;
  @media only screen and (min-width: 854px) and (max-width: 1255px) {
    width: 790px;
  }

  @media only screen and (max-width: 854px) {
    width: 390px;
  }
`

const StSlider = styled(Slider)`
  .slick-slide {
    width: 30px;
    /* a {
      text-decoration: none;
    } */
  }
  .slick-slide div {
    outline: none;
  }
  .slick-list {
    border-radius: 15px;
  }
`;

const Image = styled.img`
  max-width: 100%;
  object-fit: cover;
`;