
const oracledb = require('oracledb');
const dbconfig = require('./dbconfig.js');  // db연결정보 파일

async function main() {

    let sql1 = ' create table sungjuk (name varchar(100), kor number(3), ' +
               ' eng number(3), mat number(3)) ';
    let sql2 = ' insert into sungjuk values (:1, :2 ,:3, :4) ';
    let sql3 = ' update sungjuk set kor = :1, eng = :2, mat = :3 ' +
               ' where name = :4 ';
    let sql4 = ' delete from sungjuk where name = :1 ';
    let sql5 = ' select * from sungjuk ';

    let params = [];
    let conn = null;

    try {
        oracledb.initOracleClient({libDir: 'c:/Java/instantclient_19_17'});
        conn = await oracledb.getConnection(dbconfig);

        //let result = await conn.execute(sql1);

        params = ['혜교', 99,98,99];
        let result = await conn.execute(sql2, params);
        await conn.commit();  // 반드시 필요!!

        // params = [11,22,33, '혜교'];
        // result = await conn.execute(sql3, params);
        // await conn.commit();

        // params = ['혜교'];
        // result = await conn.execute(sql4, params);
        // await conn.commit();

        result = await conn.execute(sql5);
        console.log(result);

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


