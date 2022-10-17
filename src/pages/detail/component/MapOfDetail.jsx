import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';

//스크립트로 kakao maps api를 심어서 가져오면 window전역 객체에 들어가게 된다.
// 그리고 그걸 사용하려면 window에서 kakao객체를 뽑아서 사용하면 된다.
const { kakao } = window; 

const MapOfDetail = ({ placeX, placeY, placeName, fullAddress, placeUrl }) => {
    // 처음 렌더링 될 때 지도를 띄움
    useEffect(() => {
    const container = document.getElementById('myMap');
    const options = {
      center: new kakao.maps.LatLng(parseFloat(placeY), parseFloat(placeX)),
      level: 3,
    };

    // 지도를 생성합니다    
    const map = new kakao.maps.Map(container, options);

    // 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성합니다
    let infowindow = new kakao.maps.InfoWindow({zIndex:1});
    
    // 마커를 생성하고 지도에 표시
    let marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(parseFloat(placeY), parseFloat(placeX)) 
    });

// // 커스텀 오버레이에 표시할 컨텐츠 입니다
// // 커스텀 오버레이는 아래와 같이 사용자가 자유롭게 컨텐츠를 구성하고 이벤트를 제어할 수 있기 때문에
// // 별도의 이벤트 메소드를 제공하지 않습니다 
//     const content = `<div style='absolute;left: 0;bottom: 40px;width: 288px;height: 132px;margin-left: -144px;text-align: left;overflow: hidden;font-size: 12px;font-family: 'Malgun Gothic', dotum, '돋움', sans-serif;line-height: 1.5;'>
//     <div style='width: 286px;height: 120px;border-radius: 5px;border-bottom: 2px solid #ccc;border-right: 1px solid #ccc;overflow: hidden;background: #fff;'>
//         <div style='padding: 5px 0 0 10px;height: 30px;background: #eee;border-bottom: 1px solid #ddd;font-size: 18px;font-weight: bold;'>
//             ${placeName}
//             <div
//             style='cursor: pointer; position: absolute;top: 10px;right: 10px;color: #888;width: 17px;height: 17px;background: url('https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/overlay_close.png');'
//             onclick=${closeOverlay} title="닫기"></div>
//         </div>
//             <div style='position: relative; margin: 13px 0 0 13px';height: 75px;'>
//                 <div style='overflow: hidden;text-overflow: ellipsis;white-space: nowrap;'>${fullAddress}</div>
//                 <div><a href=${placeUrl} target="_blank" style='color: #5085BB;'>상세보기</a></div>
//             </div>
//         </div>
//     </div>  
// </div>`;


//     // 마커 위에 커스텀오버레이를 표시합니다
//     // 마커를 중심으로 커스텀 오버레이를 표시하기위해 CSS를 이용해 위치를 설정했습니다
//     const overlay = new kakao.maps.CustomOverlay({
//         content: content,
//         map: map,
//         position: marker.getPosition()       
//     });

//     // 마커를 클릭했을 때 커스텀 오버레이를 표시합니다
//     kakao.maps.event.addListener(marker, 'click', function() {
//         overlay.setMap(map);
//     });

//     // 커스텀 오버레이를 닫기 위해 호출되는 함수입니다 
//     function closeOverlay() {
//         overlay.setMap(null);     
//     };

    // 마커를 클릭 했을 때 장소 이름을 나타내는 코드
    // 마커에 클릭이벤트를 등록
    kakao.maps.event.addListener(marker, 'click', function() {
        // 마커를 클릭하면 장소명이 인포윈도우에 표출
        infowindow.setContent(`
        <div style="padding:5px;font-size:15px;">${placeName}</div>
        <div style="padding:5px;font-size:15px;">
            <div style='overflow: hidden;text-overflow: ellipsis;white-space: nowrap;'>${fullAddress}</div>
            <div><a href=${placeUrl} target="_blank" style='color: #5085BB;'>상세보기</a></div>
        </div>        
        `);
        infowindow.open(map, marker);
    });

      window.addEventListener('resize', function() {
          map.relayout();
          let markerPosition = marker.getPosition(); 
          // console.log(markerPosition);
          map.setCenter(markerPosition);
      });
      
      return () => {
        window.removeEventListener("resize", function() {
          map.relayout();
          let markerPosition = marker.getPosition(); 
          // console.log(markerPosition);
          map.setCenter(markerPosition);
      });
    };

  }, []);

  return (
    <div id='myMap' style={{width: '100%', height: '100%'}}></div>
  );
};

export default MapOfDetail;