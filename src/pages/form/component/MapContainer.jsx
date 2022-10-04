import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';

//스크립트로 kakao maps api를 심어서 가져오면 window전역 객체에 들어가게 된다.
// 그리고 그걸 사용하려면 window에서 kakao객체를 뽑아서 사용하면 된다.
const { kakao } = window; 

const MapContainer = ({ searchPlace, setAddress, setPlaceName, setPlaceUrl, setPlaceX, setPlaceY }) => {
    // 처음 렌더링 될 때 지도를 띄움
    useEffect(() => {
    const container = document.getElementById('myMap');
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };

    // 지도를 생성합니다    
    const map = new kakao.maps.Map(container, options);

    // 장소 검색 객체를 생성
    const ps = new kakao.maps.services.Places(); 

    // 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성합니다
    let infowindow = new kakao.maps.InfoWindow({zIndex:1});

    // 키워드로 장소를 검색
    ps.keywordSearch(searchPlace, placesSearchCB); 

    // 키워드 검색 완료 시 호출되는 콜백함수
    function placesSearchCB (data, status, pagination) {
        if (status === kakao.maps.services.Status.OK) {

          // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
          // LatLngBounds 객체에 좌표를 추가    
            let bounds = new kakao.maps.LatLngBounds();

            for (let i=0; i<data.length; i++) {
                displayMarker(data[i]);    
                bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
            }       

            // 검색된 장소 위치를 기준으로 지도 범위를 재설정
            map.setBounds(bounds);
        } 
    };

    // 지도에 입력 값에 대한 마커를 표시하기 위해 displayMarker 함수도 추가
    // 지도에 마커를 표시하는 함수
    function displayMarker(place) {
        // 마커를 생성하고 지도에 표시
        let marker = new kakao.maps.Marker({
            map: map,
            position: new kakao.maps.LatLng(place.y, place.x) 
        });

        // 마커를 클릭 했을 때 장소 이름을 나타내는 코드
        // 마커에 클릭이벤트를 등록
        kakao.maps.event.addListener(marker, 'click', function() {
            // 마커를 클릭하면 장소명이 인포윈도우에 표출
            infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
            infowindow.open(map, marker);
            // console.log(place);
            setAddress(place.address_name);
            setPlaceName(place.place_name);
            setPlaceUrl(place.place_url);
            setPlaceX(place.x);
            setPlaceY(place.y);
        });

        window.kakao.maps.event.addListener(
          marker,
          "mouseover",
          function () {
            infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
            infowindow.open(map, marker);
          }
        );

        window.kakao.maps.event.addListener(
          marker,
          "mouseout",
          function () {
            infowindow.close();
          }
        );
        
      };
  }, [searchPlace]);

  return (
    <div id='myMap' style={{width: '400px', height: '400px'}}></div>
  );
};

export default MapContainer;