import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { __wish } from '../../../redux/modules/wishlist';

const WishList = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const wishlist = useSelector((state) => state.wishlist.wishlist)
    // console.log(wishlist)

  useEffect(() => {
    dispatch(__wish());
  }, []);


    return (
        <>
            <StDiv style={{ justifyContent: 'flex-start' }}>
                <img
                    alt='뒤로가기'
                    src={process.env.PUBLIC_URL + '/img/backspace.png'}
                    style={{ width: '25px', height: '25px', marginRight: '10px' }}
                    onClick={() => navigate(-1)}
                />
                <h3>찜 목록</h3>
            </StDiv>
            <Container>
          <ListContainer>
            {wishlist?.map((wishlist) => {
              return (
                <CardWrapper key={wishlist.postId} onClick={() => { navigate(`/detail/${wishlist.postId}`) }}>
                  <ImageContainer>
                    <img src={wishlist.imgUrl} alt="" />
                  </ImageContainer>
                  <DescContainer>
                    <TitleWrapper>
                      <Title>{wishlist.title}</Title>
                      <RestDay>
                        {wishlist.restDay.split("일")[0] <= 0 ? (
                          <div style={{ color: '#e51e1e' }}>마감 완료</div>
                        ) : (
                          <div>마감 {wishlist.restDay}</div>
                        )}
                      </RestDay>
                    </TitleWrapper>
                    <Address>{wishlist.address}</Address>
                    <Dday>{wishlist.dday}</Dday>
                  </DescContainer>
                </CardWrapper>
              );
            })}
          </ListContainer>
        </Container>

        </>
    )
};

export default WishList;

const StDiv = styled.div`
  display: flex;
  width: 80vw;
  min-width: 320px;
  max-width: 640px;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  margin-top: 15px;
  margin-bottom: 10px;
`

const Container = styled.div`
    display: flex;
    justify-content: center;
    /* border: 1px solid black; */
`

const ListContainer = styled.div`
    flex-direction: column;
    align-items: center;    

`

const CardWrapper = styled.div`
  display: flex;
  border: 0.5px solid #E3F2FD;
  width: 85vw;
  min-width: 320px;
  max-width: 640px;
  border-radius: 4px;
  padding: 5px;
  box-shadow: 0.5px 0.5px 1px 0 #cce0ff;
  margin: 10px;
  cursor: pointer;
  :hover {
            filter: brightness(90%);
            /* box-shadow: 1px 1px 3px 0 #bcd7ff; */
  }

`;

const ImageContainer = styled.div`
  display: flex;
  box-sizing: border-box;
  
    img {
        display: flex;
        width: 100px;
        height: 115px;
        object-fit: cover;
        border-radius: 4px;
    }
`;

const DescContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  margin-left: 10px;
  /* background-color: antiquewhite; */
  
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 13px 0 0 0;
`;

const Title = styled.div`
  font-size: 15px;
  font-weight: 600;
  margin: 0 0 0 10px;
  font-family: 'NotoSansKR';
`;

const RestDay = styled.div`
  font-size: 11px;
  /* background-color: #f0f0f0; */
  /* border-radius: 1px; */
  color: #1E88E5;
  margin: 0 15px 0 0
`;

const Address = styled.div`
  font-size: 13px;
  font-weight: 400;
  margin: 0 0 2px 10px;
`;

const Dday = styled.div`
  font-size: 13px;
  font-weight: 400;
  margin: 0 0 10px 10px;
`;