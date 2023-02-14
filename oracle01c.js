// zipcode2013 테이블에서
// 서울시, 강남구에 있는 모든 동을 조회해서 출력하세요

// zipcode2013 테이블에서
// 서울에 있는 모든 구를 조회해서 출력하세요

const oracledb = require('oracledb');

async function main() {

    // const sql = ' select distinct dong from ' +
    //     ' zipcode2013 where sido = :1 and gugun = :2 order by dong ';
    const sql = ' select distinct dong from ' +
            ' zipcode2013 where sido = :sido and gugun = :gugun ' +
            ' order by dong ';

    //let params = ['서울', '강남구'];
    let params = {sido:'서울', gugun:'강남구'};
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
            console.log(row.DONG);
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


