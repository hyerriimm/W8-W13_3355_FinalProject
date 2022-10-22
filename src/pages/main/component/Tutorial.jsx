import React from 'react'
import styled from 'styled-components';

import tutorial1 from "../../../assets/img/tutorial1.png";
import tutorial2 from "../../../assets/img/tutorial2.png";
import tutorial3 from "../../../assets/img/tutorial3.png";


const Tutorial = () => {
  return (
    <div>
      <Image src={tutorial1} alt="" />
      <Image src={tutorial2} alt="" />
      <Image src={tutorial3} alt="" />
    </div>
  );
}

export default Tutorial

const Image = styled.img`
  max-width: 100%;
  object-fit: cover;
  display: flex;
  margin: 0 auto;
`;