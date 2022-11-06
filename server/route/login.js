var db = require('../dbconnection');
var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
var CryptoJS = require('crypto-js');
const session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);

var sessionStore = new MySQLStore({}, db);

// router.use(session({
//   secret: 'session_secret_key',
//   resave: false,
//   saveUninitialized: false,
//   store: sessionStore,
//   cookie: {
//     httpOnly: false,
//      maxAge: 500 * 1000, //set the expiry of token to 500 second
//     secure: false
//   }
// }));




///////////////login route//////////////
router.post('', (req, res) => {
  var isExist = false;
  /////////////////////for ip address of resquest//////////
  if (req.headers['x-forwarded-for']) {
    client_ip = req.headers['x-forwarded-for'].split(",")[0];
  } else if (req.connection && req.connection.remoteAddress) {
    client_ip = req.connection.remoteAddress;
  } else {
    client_ip = req.ip;
  }

  if (req.body.name == 'admin') {
    db.query(`select data from sessions`, (err, result) => {
      console.log(`length:- ${result.length}`)
      if (result.length > 0) {
        result.forEach(element => {
          const data = JSON.parse(element.data)
          const user = data.user_name
          console.log(`user:-${user}`);
          if (req.body.name == user) {
            //isExist = true;     /////////////////////////////////////////////////for only one id is permitted ///
          }
        });
      }
      console.log(`isExist;- ${isExist}`)
      if (isExist) {
        res.json({
          success: false,
          msg: 'user already logged in'
        })
      }
      else {
        console.log(req.sessionID);
        db.query(
          `select role_id,name,password,id from session_user where role = 'admin' and name = ?`, [req.body.name]
          , function (err, rows) {
            if (typeof rows[0] != 'undefined') {
              if (rows[0].password == req.body.password) {
                db.query('insert into login_history(ip_address, user_id) values (?,?)', [client_ip, rows[0].role_id]
                  , function (err, result) {
                    const JWTToken = jwt.sign({
                      role_id: rows[0].role_id.toString(),
                      login_id: result.insertId,
                      user_id: rows[0].id,
                      emp_name: rows[0].name,
                    }, 'token_key');

                    req.session.isAuth = true;
                    req.session.user_name = rows[0].name;
                    req.session.login_id = result.insertId;
                    req.session.user_id = rows[0].id;
                    role_id = rows[0].role_id.toString();
                    role_name = rows[0].name
                    req.session.role = rows[0].role_id.toString();
                    //const role_id = CryptoJS.AES.encrypt(rows[0].role_id.toString(),'secret');
                    //const role_name = CryptoJS.AES.encrypt(rows[0].name,'secret');

                    res.cookie('role_id', role_id);
                    res.cookie('role_name', role_name);
                    console.log(`before sessionStore:- ${sessionStore}`);


                    /////////////////////////////////inserting data in session_user_id/////////////////////////
                    console.log(rows[0].id);
                    db.query('insert into session_user_id(session_id_,user_id_) values(?,?)', [req.sessionID, rows[0].id],
                      function (err, sessionEntry) {
                        console.log(err);
                        console.log(`sessionEntry :- ${sessionEntry}`)
                      })
                    return res.status(200).json({
                      success: true,
                      token: JWTToken
                    })
                  })

              }
              else {
                return res.json({
                  success: false,
                  msg: 'incorrect password'
                })
              }
            }
            else {
              return res.json({
                success: false,
                msg: 'user not exist'
              });
            }
          })
      }
    });
  }

  ////for other users
  else {
    db.query(`select data from sessions`, (err, result) => {
      console.log(`length:- ${result.length}`)
      if (result.length > 0) {
        result.forEach(element => {
          const data = JSON.parse(element.data)
          const user = data.user_name
          console.log(`user:-${user}`);
          if (req.body.name == user) {
            // isExist = true;                  ///////////////////////////////////remove me for only one session//////////////////
          }
        });
      }
      console.log(`isExist;- ${isExist}`)
      if (isExist) {
        res.json({
          success: false,
          msg: 'user already logged in'
        })
      }
      else {
        db.query(
          `select role_id,name,password,id from session_user where role = 'user' and name = ?`, [req.body.name]
          , function (err, rows) {
            if (typeof rows[0] != 'undefined') {
              if (rows[0].password == req.body.password) {
                db.query('insert into session_user_id(session_id_,user_id_) values(?,?)', [req.sessionID, rows[0].id],
                  function (err, sessionEntry) {
                    console.log(`sessionEntry :- ${sessionEntry}`)
                  })
                db.query('insert into login_history(ip_address, user_id) values (?,?)', [client_ip, rows[0].role_id]
                  , function (err, result) {
                    const JWTToken = jwt.sign({
                      role_id: rows[0].role_id.toString(),
                      login_id: result.insertId,
                      user_id: rows[0].id,
                      emp_name: rows[0].name,
                    }, 'token_key');

                    req.session.isAuth = true;
                    req.session.user_name = rows[0].name;
                    req.session.login_id = result.insertId;
                    role_id = rows[0].role_id.toString();
                    req.session.user_id = rows[0].id;
                    role_name = rows[0].name
                    //const role_id = CryptoJS.AES.encrypt(rows[0].role_id.toString(),'secret');
                    //const role_name = CryptoJS.AES.encrypt(rows[0].name,'secret');

                    res.cookie('role_id', role_id);
                    res.cookie('role_name', role_name);
                    req.session.role = rows[0].role_id.toString();
                    return res.status(200).json({
                      success: true,
                      token: JWTToken
                    })
                  })
              }
              else {
                return res.json({
                  success: false,
                  msg: 'incorrect password'
                })
              }
            }
            else {
              console.log('error1')
              return res.json({
                success: false,
                msg: 'incorrect user id'
              });
            }
          })
      }
    })

  }
})




router.get('/logout', (req, res) => {
  try {
    console.log(req.session.login_id, req.session.role)
    db.query('update login_history set datetime_out = NOW() where id = ? AND user_id = ?', [req.session.login_id, req.session.role],
      (err, result) => {
        if (result) {
          db.query(`delete from session_user_id where session_id_ = ?`, [req.sessionID],
            (err, deleteSession) => {
              try {
                if (err) throw err;
                else {
                  req.session.destroy((err) => {
                    if (err) console.log(err);
                    else {
                      return res.status(200).json({
                        msg: 'logout'
                      })
                    }
                  });
                }

              } catch (err) {
                console.log(err);
              }
            })
          sessionStore.close();
          if (err) {
            res.json({
              msg: 'something went wrong'
            })
          }
        }
      })
  }
  catch (err) {
    console.log(err)
    res.send(err);
  }
})




function sessionCheck(req, res, next) {
  db.query(`select * from sessions where session_id = ?`, [req.session.id], (err, row) => {
    if (err) throw err;
    console.log(row);
    if (row[0] != undefined) {
      next()
    }
    else {
      return res.status(401).json({ msg: 'not authentic' })
    }
  })

}



router.get('/home', sessionCheck, (req, res) => {
  console.log(req.session)
  console.log(req.session.id)
  db.query(`select * from sessions where session_id = ?`, [req.session.id], (err, row) => {
    if (err) throw err;
    console.log(row);
    if (row[0] != undefined) {
      return res.json({
        success: 'true'
      })
    }
    else {
      return res.json({ msg: 'not authentic' })
    }
  })
})



module.exports = router;
