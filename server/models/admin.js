db = require('../dbconnection');

var admin =
{
    loginhistory: function (callback) {
        db.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query(`SELECT tblHistory.id AS ID,mr.role_name AS role_name, mr.role_id,tblHistory.datetime_in AS logged_in ,tblHistory.datetime_out AS logged_out,tblHistory.ip_address FROM login_history tblHistory INNER JOIN mas_role mr
                ON tblHistory.user_id=mr.role_id ORDER BY(tblHistory.datetime_in) desc;`,
                function (err, result) {
                    connection.release();
                    if (err) throw err;
                    return callback(result);
                });
        });
    },

    sessionHistory: function (callback) {
        db.getConnection(function (err, connection) {
            try {
                if (err) throw err;
                connection.query(`select session_id , expires FROM sessions;`,
                    function (err, result) {
                        connection.release();
                        if (err) throw err;
                        return callback(result);
                    });
            }
            catch (err) {
                console.log(err);
                return callback(err)
            }
        });
    },

    getSessionDetails: function (callback) {
        db.getConnection((err, connection) => {
            try {
                if (err) throw err;
                connection.query('SELECT session_id AS id , expires AS expiry , data FROM sessions ORDER BY(expires) desc;',
                    (err, result) => {
                        connection.release();
                        try {
                            if (err) throw err;
                            return callback(result);
                        } catch (err) {
                            return callback(err);
                        }
                    });
            }
            catch (err) {
                return callback(err);
            }
        })
    },

    deleteSession: function (data, callback) {
        db.getConnection((err, connection) => {
            try {
                if (err) throw err;
                console.log(data)
                connection.query('DELETE  from sessions WHERE session_id= ?;', [data.p1],
                    (err, result) => {
                        connection.release();
                        try {
                            if (err) throw err;
                            db.query(`delete from session_user_id where session_id_ = ?`, [data.p1],
                                (err, deleteSession) => {
                                    console.log(err);
                                    console.log(deleteSession);
                                })
                            console.log(result);
                            return callback(result);
                        } catch (err) {
                            return callback(err);
                        }
                    });
            }
            catch (err) {
                return callback(err);
            }
        })
    }
}


module.exports = admin;