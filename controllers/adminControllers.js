// module cua admin


const bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var con = require('./connectDB'); // module database
var actor = require('./actor');

module.exports = (app) => {

    app.get('/admin', function(req, res) {
        if (req.isAuthenticated() && actor.is_admin == 1) {
            res.render('trangchuAdmin');
        } else res.render('baoloidangnhap');
    });

    //thêm tài khoản
    app.get('/themtaikhoan', function(req, res) {
        if (req.isAuthenticated() && actor.is_admin == 1) {
            res.render('themtaikhoan');
        } else res.render('baoloidangnhap');
    });

    app.post('/themtaikhoan', urlencodedParser, function(req, res) {
        if (req.isAuthenticated() && actor.is_admin == 1) {
            var name = req.body.name;
            var email = req.body.email;
            var phone = req.body.phone;
            var user = req.body.user;
            var password = req.body.password;
            var confirmPass = req.body.confirmPass;

            var sql = "insert into taikhoan(name,email,phone,user,password) values(N'" +
                name + "','" + email + "','" + phone + "','" + user + "','" + password + "')";
            console.log(sql);
            con.query(sql, function(error) {
                if (error) {
                    res.send("loi trong thuc thi câu lệnh");
                } else res.redirect('/xemtaikhoan');
            });


        } else res.render('baoloidangnhap');
    });

    // xem tai khoan
    app.get('/xemtaikhoan', function(req, res) {
        if (req.isAuthenticated() && actor.is_admin == 1) {
            var sql = "select * from taikhoan where is_admin='N'";
            con.query(sql, function(error, results, fields) {
                if (error) {
                    res.send("loi trong thuc thi câu lệnh");
                } else {
                    res.render('xemtaikhoan', { results });
                }
            });
        } else res.render('baoloidangnhap');
    });

    app.get('/xoataikhoan/:id', urlencodedParser, function(req, res) {
        if (req.isAuthenticated() && is_admin == 1) {
            var id = req.params.id;
            var sql = "delete from taikhoan where id= " + id;
            con.query(sql, function(error) {
                if (error) {
                    res.send("loi trong thuc thi câu lệnh");
                } else {
                    res.redirect('/xemtaikhoan');
                }
            });
        } else res.render('baoloidangnhap');
    });


    //xem tin và xóa tin
    app.get('/xemtin', function(req, res) {
        if (req.isAuthenticated() && actor.is_admin == 1) {
            var sql = "select t.name as name,t.time as time,t.type as type,t.type1 as type1,t.id as id,tg.name as author from bongda t INNER JOIN taikhoan tg on t.postManId =tg.id";
            con.query(sql, function(error, results, fields) {
                if (error) {
                    res.send("loi trong thuc thi câu lệnh");
                } else {
                    res.render('xemtin', { results });
                }
            });
        } else res.render('baoloidangnhap');
    });
    app.get('/hienxemtin/:type', function(req, res) {
        if (req.isAuthenticated() && actor.is_admin == 1) {
            var type = req.body.type;
            var sql = "select t.name as name,t.time as time,t.type as type,t.type1 as type1,t.id as id,tg.name as author from " +
                req.params.type + " t INNER JOIN taikhoan tg on t.postManId =tg.id";

            con.query(sql, function(error, results, fields) {
                if (error) {
                    res.send("loi trong thuc thi câu lệnh");
                } else {
                    res.render('hienxemtin', { results });
                }
            });
        } else res.render('baoloidangnhap');
    })


    //xóa tin
    app.get('/delete/:type/:id', function(req, res) {
        if (req.isAuthenticated() && actor.s_admin == 1) {
            var sql = "delete from " + req.params.type + " where id=" + req.params.id;
            con.query(sql, function(error) {
                if (error) {
                    res.send('loi thực thi câu lệnh');
                } else {
                    res.redirect('/hienxemtin/' + req.params.type);
                }
            });
        } else res.render('baoloidangnhap');
    });


    //chi tiết tin
    app.get('/chitiet/:type/:id', function(req, res) {
        if (req.isAuthenticated() && actor.is_admin == 1) {
            var sql = "select * from " + req.params.type + " where id=" + req.params.id;
            con.query(sql, function(error, results, fields) {
                if (error) {
                    res.send('loi thực thi câu lệnh');
                } else {
                    res.render('MotTrangTin', { results });
                }
            });
        } else res.render('baoloidangnhap');
    });
    app.post('/chitiet/:type/:id', urlencodedParser, function(req, res) {
        if (req.isAuthenticated() && actor.is_admin == 1) {
            var hot = req.body.hot;
            var sql = "update " + req.params.type + " set hot='" + hot + "' where id=" + req.params.id;
            con.query(sql, function(error, results, fields) {
                if (error) {
                    res.send('loi thực thi câu lệnh');
                } else {
                    res.redirect('/hienxemtin/' + req.params.type);
                }
            });
        } else res.render('baoloidangnhap');
    });

    //sửa tin
    app.get('/suatin/:type/:id', function(req, res) {
        if (req.isAuthenticated() && actor.is_admin == 1) {
            var sql = "select * from " + req.params.type + " where id=" + req.params.id;
            con.query(sql, function(error, results, fields) {
                if (error) {
                    res.send('loi thực thi câu lệnh');
                } else {
                    res.render('suaMotTrangTin', { results });
                }
            });
        } else res.render('baoloidangnhap');
    });
    app.post('/suatin/:type/:id', urlencodedParser, function(req, res) {
        if (req.isAuthenticated() && actor.is_admin == 1) {
            var type = req.body.type;
            var hot = req.body.hot;
            var name = req.body.name;
            var time = req.body.time;
            var author = req.body.author;
            var content1 = req.body.content1;
            var content2 = req.body.content2;
            var content3 = req.body.content3;
            var content4 = req.body.content4;
            var content5 = req.body.content5;
            var image1 = req.body.image1;
            var image2 = req.body.image2;
            var sql = "update " + type + " set type='" + type + "',name='" + name + "',time='" + time + "',author='" + author + "',content1='" +
                content1 + "',content2='" + content2 + "',content3='" + content3 + "',content4='" +
                content4 + "',content5='" + content5 + "',image1='" + image1 + "',image2='" + image2 + "',hot='" + hot +
                "' where id=" + req.params.id;
            con.query(sql, function(error) {
                if (error) {
                    res.send("loi thuc thi cau lenh");
                } else {
                    res.redirect('/hienxemtin/' + type);
                }
            });
        } else res.render('baoloidangnhap');
    });
    //xem va xoa gop y
    app.get('/xemgopy', function(req, res) {
        if (req.isAuthenticated() && actor.is_admin == 1) {
            var sql = "select * from gopy";
            con.query(sql, function(error, results, fields) {
                if (error) {
                    res.send('loi thực thi câu lệnh');
                } else {
                    res.render('xemgopy', { results });
                }
            });
        } else res.render('baoloidangnhap');
    });
    app.get('/xoagopy/:id', function(req, res) {
        if (req.isAuthenticated() && actor.is_admin == 1) {
            var id = req.params.id;
            var sql = "delete from gopy where id=" + id;
            con.query(sql, function(error, results, fields) {
                if (error) {
                    res.send('loi thực thi câu lệnh');
                } else {
                    res.redirect('/xemgopy');
                }
            });
        } else res.render('baoloidangnhap');
    });

};