// zipcode2013 테이블에서
// 서울에 있는 모든 구를 조회해서 출력하세요

const oracledb = require('oracledb');

async function main() {

    //const sql = " select distinct gugun from " +
    //            " zipcode2013 where sido = '서울' order by gugun ";

    // placeholder를 이용해서 동적으로 sql질의문을 작성할 수 있음
    // :인덱스 => 배열로 정의
    // :키 => 객체로 정의
    // const sql = ' select distinct gugun from ' +
    //             ' zipcode2013 where sido = :1 order by gugun ';
    const sql = ' select distinct gugun from ' +
                ' zipcode2013 where sido = :sido order by gugun ';

    // let params = ['인천'];
    let params = {sido: '인천'};
    let options = {
        resultSet: true,
        outFormat: oracledb.OUT_FORMAT_OBJECT
    };
    let conn = null;

    try {
        oracledb.initOracleClient(
            {libDir: 'c:/Java/instantclient_19_17'});
        conn = await oracledb.getConnection({
            user: 'bigdata', password: 'bigdata',
            connectString: '52.78.108.132:1521/XE'
        });

        let result = await conn.execute(sql, params, options);
        const rs = result.resultSet;
        let row = null;

        while((row = await rs.getRow())) {
            console.log(row.GUGUN);
        }
        await rs.close();

    } catch(ex) {
        console.error(ex);
    } finally {
        if (conn) {
            try { await conn.close(); }
            catch (ex) { console.error(ex); }
        }
    }

};

main();
