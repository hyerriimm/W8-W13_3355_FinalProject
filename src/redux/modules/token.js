import axios from "axios";


const reToken = async() => {
  await axios
    .get(`${process.env.REACT_APP_HOST_PORT}/member/reissue`, {
      headers: {
        Authorization: localStorage.getItem("ACCESSTOKEN"),
        // RefreshToken: localStorage.getItem("REFRESHTOKEN"),
      },
    })
    .then((response) => {
      if (response.data.data === "토큰 재발급 성공") {
        localStorage.setItem("ACCESSTOKEN", response.headers.authorization);
        localStorage.setItem("REFRESHTOKEN", response.headers.refreshtoken);
        //로그인 연장 후 30분 뒤
        setInterval(reToken, 1800000);
      }
      if (response.data.data === null) {
         setTimeout(reToken, 1800000);
        // 만약 아직 유효한 토큰일 때 토큰이 유효할 수 있는 남은 시간을 함께 보내주면
        // setTimeout으로 그 시간 후 이 함수를 다시 실행시켜 get요청으로 새로운 토큰을 발급받아오도록 함
      }
    })
    .catch((error) => {
      // ... 로그인 실패 처리
      reToken();
    });
  };
  reToken();

  
// if (performance.navigate.type === 1) {
//   //새로고침하면 바로 로그인 연장(토큰 갱신)
//   reToken();
// }
