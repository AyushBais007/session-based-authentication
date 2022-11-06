
//common (model) that receive function from common (route) module
bcrypt = require('bcrypt')
db = require('../dbconnection')

var common = {
    heightDetails: function (callback) {
        db.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query(`SELECT id,value,active_status from mas_height;`,
                function (err, result) {
                    connection.release();
                    if (err) callback(err)//throw err;
                    return callback(result);
                });
        });
    },

    hrpreasonDetails: function (callback) {
        db.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query(`SELECT hrp_reason_id AS id,label_english, label_hindi,active_status,type FROM mas_hrp_reason;`,
                function (err, result) {
                    connection.release();
                    if (err) throw err;
                    return callback(result);
                });
        });

    },

    updatePassword: function (req, callback) {
        console.log(req.body.new_pass);
        console.log(req.session);
        const activeSessionId = [];

        db.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query('UPDATE session_user SET password = ? WHERE id =?', [req.body.new_pass, req.session.user_id],
                function (err, result) {
                    connection.release();
                    if (err) throw err;
                    if (result) {
                        db.query(`select data,session_id as id from sessions`, (err, result) => {
                            console.log(`result:- ${result}`)
                            if (result.length > 0) {
                                result.forEach(element => {
                                    const data = JSON.parse(element.data)
                                    const user_id = data.user_id
                                    console.log(`user:-${user_id}`);
                                    if (req.session.user_id == user_id) {
                                        activeSessionId.push(element.id);
                                        if(req.session.id !== element.id)
                                        {
                                            db.query('delete from sessions where session_id =?', [element.id],
                                            (err, res) => {
                                                if (err) throw err;
                                                console.log(res);
                                            })
                                        }
                                    }
                                });
                            }
                            console.log(`activeSessionId :- ${activeSessionId}`);
                        })
                    }
                    return callback(result);
                })
        })
    }
}

module.exports = common;
