//module xac nhan user

const bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var con = require('./connectDB.js'); // module database
var actor = require('./actor.js');


module.exports = (app)=>{
    //trang dieu huong user
    app.get('/user', function(req, res) {
        if (req.isAuthenticated() && actor.is_user == 1) {
            userID = actor.userID
            res.render('trangchuUser', { userID });
        } else res.render('baoloidangnhap');
    });
    //đăng bài theo chủ đề
    app.get('/addNew', function(req, res) {
        if (req.isAuthenticated && actor.is_user == 1) {
            userID = actor.userID
            res.render('addNew', { userID });
        } else res.render('baoloidangnhap');
    });
    app.post('/addNew', urlencodedParser, function(req, res) {
        if (req.isAuthenticated && actor.is_user == 1) {
            var type = req.body.type;
            var name = req.body.name;
            var name1 = req.body.name1;
            var time = req.body.time;
            var author = req.body.author;
            var content1 = req.body.content1;
            var content2 = req.body.content2;
            var content3 = req.body.content3;
            var content4 = req.body.content4;
            var content5 = req.body.content5;
            var image1 = req.body.image1;
            var image2 = req.body.image2;
            var image3 = req.body.image3;

            var sql = "insert into " + type + "(name,time,author,content1,content2,content3,content4,content5,image1,image2,postManId,name1,image3) values(N'" + name + "','" + time + "','" + author + "','" +
                content1 + "','" + content2 + "','" + content3 + "','" + content4 + "','" + content5 + "','" + image1 + "','" +
                image2 + "','" + actor.userID + "','" + name1 + "','" + image3 + "')";
            //console.log(sql);
            con.query(sql, function(error) {
                if (error) {
                    res.send("loi trong thuc thi câu lệnh");
                } else {
                    res.redirect('/xemtindadang/' + actor.userID);
                }
            });
        } else res.render('baoloidangnhap');
    });
    //xem tin da dang
    app.get('/xemtindadang/:id', function(req, res) {
        if (req.isAuthenticated() && actor.is_user == 1) {
            var id = req.params.id;
            var sql = "select name,time,author,type,id from bongda where postManId=" + id +
                " union select name,time,author,type,id from kinhdoanh where postManId=" + id +
                " union select name,time,author,type,id from thitruong where postManId=" + id +
                " union select name,time,author,type,id from suckhoe where postManId=" + id +
                " union select name,time,author,type,id from hitech where postManId=" + id +
                " union select name,time,author,type,id from showbiz where postManId=" + id +
                " union select name,time,author,type,id from thegioi where postManId=" + id +
                " union select name,time,author,type,id from thethao where postManId=" + id +
                " union select name,time,author,type,id from phaidep where postManId=" + id +
                " union select name,time,author,type,id from amthuc where postManId=" + id;
            con.query(sql, function(error, results, fields) {
                if (error) {
                    res.send("loi trong thuc thi câu lệnh");
                } else {
                    res.render('hienxemtin1', { results });
                }
            });
        } else res.render('baoloidangnhap');
    });
    //xóa tin
    app.get('/user/delete/:type/:id', function(req, res) {
        if (req.isAuthenticated() && actor.is_user == 1) {
            var sql = "delete from " + req.params.type + " where id=" + req.params.id;
            con.query(sql, function(error) {
                if (error) {
                    res.send('loi thực thi câu lệnh');
                } else {
                    res.redirect('/xemtindadang/' + actor.userID);
                }
            });
        } else res.render('baoloidangnhap');
    });
    //chi tiết tin
    app.get('/user/chitiet/:type/:id', function(req, res) {
        if (req.isAuthenticated()) {
            var type = req.params.type
            var id = req.params.id
            var sql = "select * from " + type + " where id=" + id;
            con.query(sql, function(error, results, fields) {
                if (error) {
                    res.send('loi thực thi câu lệnh');
                } else {
                    res.render('MotTrangTin1', { results });
                }
            });
        } else res.render('baoloidangnhap');
    });
    //sửa tin
    app.get('/user/suatin/:type/:id', function(req, res) {
        if (req.isAuthenticated()) {
            var sql = "select * from " + req.params.type + " where id=" + req.params.id;
            con.query(sql, function(error, results, fields) {
                if (error) {
                    res.send('loi thực thi câu lệnh');
                } else {
                    res.render('suaMotTrangTin1', { results });
                }
            });
        } else res.render('baoloidangnhap');
    });
    app.post('/user/suatin/:type/:id', urlencodedParser, function(req, res) {
        if (req.isAuthenticated()) {
            var type = req.body.type;
            var hot = req.body.hot;
            var name = req.body.name;
            var name1 = req.body.name1;
            var time = req.body.time;
            var author = req.body.author;
            var content1 = req.body.content1;
            var content2 = req.body.content2;
            var content3 = req.body.content3;
            var content4 = req.body.content4;
            var content5 = req.body.content5;
            var image1 = req.body.image1;
            var image2 = req.body.image2;
            var image3 = req.body.image3;

            var sql = "update " + type + " set name='" + name + "',name1='" + name1 + "',time='" + time + "',author='" + author + "',content1='" +
                content1 + "',content2='" + content2 + "',content3='" + content3 + "',content4='" +
                content4 + "',content5='" + content5 + "',image1='" + image1 + "',image2='" + image2 + "',image3='" + image3 + "',hot='" + hot +
                "' where id=" + req.params.id;
            console.log(sql);
            con.query(sql, function(error) {
                if (error) {
                    res.send("loi thuc thi cau lenh");

                } else {
                    res.redirect('/xemtindadang/' + actor.userID);
                }
            });
        } else res.render('baoloidangnhap');
    });
    //xua tin
    //=========================================================================================================================
    //báo lỗi
    //dang xuat
    app.get('/dangxuat', function(req, res) {
        actor.is_admin = 0;
        actor.is_user = 0;
        actor.userID = 0;
        res.redirect('/');
    });


    
    //================================================================================
    //xem va xoa gop y
    app.get('/xemgopy', function(req, res) {
        if (req.isAuthenticated()) {
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
        if (req.isAuthenticated()) {
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