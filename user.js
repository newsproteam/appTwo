function user(x) {
    var express = require('express');
    var app = express();
    //ket noi csdl
    var mysql = require('mysql');
    var con = mysql.createConnection({
        host: "db4free.net",
        user: "thanhan1181999",
        password: "77621176211",
        database: "news_data",
        port: "3306"
    });
    con.connect();
    //-------------------------------
    app.get('/', (req, res) => res.send("hello an dep trai"));
    //---------------------------------
    return app;
}
module.exports = user;