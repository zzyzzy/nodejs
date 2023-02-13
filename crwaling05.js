// 코로나19 시도별 확진자 데이터를 이용해서 특정 지역의 확진자 현황 출력
// https://apis.data.go.kr/1352000/ODMS_COVID_04/callCovid04Api
// ?serviceKey=???&pageNo=1&numOfRows=500&apiType=json&std_day=2023-02-12&gubun=%EC%84%9C%EC%9A%B8

// 사용할 패키지 가져오기 : require(패키지명)
const axios = require('axios');
const { XMLParser } = require('fast-xml-parser');  // xml 처리기 라이브러리

async function main() {   // 비동기 I/O 지원 함수 정의

    // 접속할 url 지정
    // apiType : xml 또는 JSON
    const URL = 'http://apis.data.go.kr/1352000/ODMS_COVID_04/callCovid04Api';
    const params = {'serviceKey': 'O1nHnnvHdTlHJn9IB55OEVZsW8tvqkALFXNRBo9nGXjODXETiIA9SjoOZAyLAE3OyADFq+mhF36yldlCJppS2A==',
        'apiType': 'xml', 'std_day': '2023-02-13', 'gubun':''
    };
    const headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36 Edg/109.0.1518.78'};


    // axios로 접속해서 xml를 불러옴
    const xml = await axios.get(URL,{
        params: params, headers: headers
    });   // 서버 요청시 User-Agent 헤더 사용
    // console.log(xml.data);

    // XML을 JSON으로 변환하기
    const parser = new XMLParser();
    let json = parser.parse(xml.data);
    // console.log(json);

    // JSON으로 불러오기
    let items = json['response']['body']['items']['item'];
    // console.log(items);

    // 지역별 코로나 확진 정보 출력
    for (let item of items) {
        console.log(`지역 : ${item.gubun}, 
            전일 확진자수: ${item.incDec}, 
            누적 확진자수: ${item.defCnt}, 
            누적 사망자수: ${item.deathCnt}, 
            측정일: ${item.stdDay}`);
    }

};

main();
