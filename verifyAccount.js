// module xac nhan tai khoan

const session = require('express-session');
const Passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

var connect = require('./connectDB.js'); // module database
var actor = require('./actor');

module.exports = (app)=>{

    app.use(session({
        secret: "mysecret",
    }));
    app.use(Passport.initialize());
    app.use(Passport.session());
    //-------------------------
    app.route('/')
        .get((req, res) => res.render('dangnhap'))
        .post(Passport.authenticate('local', { failureRedirect: '/', successRedirect: '/loginOK' }))
    app.get('/loginOK', (req, res) => {
        if (actor.is_admin == 1) res.redirect('/admin');
        else
        if (actor.is_user == 1) res.redirect('/user')
    });
    //--------------------------
    Passport.use(new LocalStrategy(
        (username, password, done) => {
            var sql = "select count(*) as num from taikhoan where user='" + username + "' and password='" + password + "' " +
                " union select is_admin from taikhoan where user='" + username + "' and password='" + password + "' " +
                " union select id from taikhoan where user='" + username + "' and password='" + password + "' ";
            var user = [username, password];
            connect.query(sql, function(error, results, fields) {
                if (error) return done(null, false);
                else {
                    if (results[0].num > 0) {
                        if (results[1].num == 'Y') {
                            actor.is_admin = 1;
                        } else {
                            actor.is_user = 1;
                            if (results.length == 2)
                            actor.userID = results[0].num;
                            else actor.userID = results[2].num;
                        }
                        return done(null, user)
                    } else {
                        return done(null, false);
                    }
                }
            });
        }
    ))


    Passport.serializeUser((user, done) => { done(null, user) })
    Passport.deserializeUser((user, done) => {
        var sql = "select count(*) as num,is_admin from taikhoan where user='" + user[0] + "' and password='" + user[1] + "' group by is_admin";
        connect.query(sql, function(error, results, fields) {
            if (error) return done(null, false);
            else {
                actor.name = user[0];
                actor.pass = user[1];
                if (results[0].num > 0) {
                    return done(null, user);
                } else return done(null, false)
            }
        });
    });
};
