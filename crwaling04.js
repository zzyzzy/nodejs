// 미세먼지 공공데이터를 이용해서 특정 지역의 미세먼지 정보 출력
// http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty
// ?serviceKey=???&returnType=json&numOfRows=100&pageNo=1&sidoName=%EC%A0%84%EA%B5%AD&ver=1.0

// 사용할 패키지 가져오기 : require(패키지명)
const axios = require('axios');
const { XMLParser } = require('fast-xml-parser');  // xml 처리기 라이브러리

async function main() {   // 비동기 I/O 지원 함수 정의

    // 접속할 url, 쿼리스트링, user-agent 헤더 지정
    // 인증 vs 인가
    const URL = 'http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty';
    const params = {'serviceKey': 'O1nHnnvHdTlHJn9IB55OEVZsW8tvqkALFXNRBo9nGXjODXETiIA9SjoOZAyLAE3OyADFq+mhF36yldlCJppS2A==',
        'returnType': 'xml', 'sidoName': '서울', 'numOfRows':1000, 'ver':1.3
    };
    const headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36 Edg/109.0.1518.78'};
    
    // axios로 접속해서 대기오염 정보를 받아옴
    const xml = await axios.get(URL,{
        params : params, headers : headers
    });   // 서버 요청시 User-Agent 헤더 사용

    // 받아온 데이터 잠시 확인
    // console.log(xml.data);

    // XML을 JSON으로 변환하기
    const parser = new XMLParser();
    let json = parser.parse(xml.data);

    // JSON 으로 불러오기
    let items = json['response']['body']['items'];
    // console.log(items);

    // 미세먼지 정보 출력
    for (let item of items['item']) {
        console.log(item.sidoName, item.stationName,
            item.pm10Value, item.pm25Value,
            item.pm10Grade, item.pm25Grade,
            pmGrade(item.pm10Grade), pmGrade(item.pm25Grade),
            item.dataTime);
    }

};

// 등급별 이모지
// 😍 😐 😰 😱

let pmGrade = (val) => {
    let emojis = ['😍','😐','😰','😱'];

    return emojis[parseInt(val) - 1];
};

main();
