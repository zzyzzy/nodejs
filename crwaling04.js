// 미세먼지 공공데이터를 이용해서 특정 지역의 미세먼지 정보 출력
// http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty
// ?serviceKey=???&returnType=json&numOfRows=100&pageNo=1&sidoName=%EC%A0%84%EA%B5%AD&ver=1.0

// 사용할 패키지 가져오기 : require(패키지명)
const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');       // 파일시스템 관련 라이브러리
const path = require('path');   // 파일경로 관련 라이브러리
// const emoji = require('node-emoji');   // 파일경로 관련 라이브러리

async function main() {   // 비동기 I/O 지원 함수 정의

    // 접속할 url, 쿼리스트링, user-agent 헤더 지정
    const URL = 'http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty';
    const params = {'serviceKey': 'O1nHnnvHdTlHJn9IB55OEVZsW8tvqkALFXNRBo9nGXjODXETiIA9SjoOZAyLAE3OyADFq+mhF36yldlCJppS2A==',
        'returnType': 'json', 'sidoName': '서울', 'numOfRows':1000, 'ver':1.3
    };
    const headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36 Edg/109.0.1518.78'};
    
    // axios로 접속해서 대기오염 정보를 받아옴
    const json = await axios.get(URL,{
        params : params, headers : headers
    });   // 서버 요청시 User-Agent 헤더 사용

    // 받아온 데이터 잠시 확인
    console.log(json.data);

    // JSON 으로 불러오기
    let items = json.data['response']['body']['items'];
    //console.log(items);

    // 미세먼지 정보 출력
    // pm25Value는 출력 안됨!!
    for (let item of items) {
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
    // let emoji = '😱';
    // if (val == '1') emoji = '😍';
    // else if (val == '2') emoji = '😐';
    // else if (val == '3') emoji = '😰';

    let emojis = ['😍','😐','😰','😱'];

    return emojis[parseInt(val) - 1];
};

main();
