
require('dotenv').config()
var mysql=require('mysql');

connect = mysql.createPool({
    // host:'localhost',
    // user:'root',
    // password:'ayush',
    // database:'hrpms'
    host:process.env.db_host,
    user:process.env.db_user,
    password:process.env.db_password,
    database:'hrpms'
})

console.log(process.env);

module.exports=connect;