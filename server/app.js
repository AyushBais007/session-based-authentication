
express= require('express')
svgcaptcha = require('svg-captcha')
crypto=require('crypto-js')
path = require('path')
app=express();
cors=require('cors');
db = require('./dbconnection')
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyparser = require('body-parser');
var MySQLStore = require('express-mysql-session')(session);
commonrouter=require('./route/common');
loginrouter = require('./route/login');
adminrouter = require('./route/admin');
pdfrouter = require('./route/pdf');

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use('', express.static(path.join(__dirname, 'dist')));
app.use(express.json());
var sessionStore = new MySQLStore({}, db);

const corsConfig = {
    credentials: true,
    origin: true,
};

app.use(bodyparser.urlencoded({
    extended: true
  }));

app.use(bodyparser.json())  
app.use(cors(corsConfig));

function sessionCheck(req, res, next) {
    console.log(req.session.id)
    db.query(`select * from sessions where session_id = ?`, [req.session.id], (err, row) => {
      if (err) throw err;
      console.log(row);
      if (row[0] != undefined) {
        //return res.json({msg: 'authentic'})
        next()
      }
      else {
        return res.status(401).json({ msg: 'not authentic' })
      }
    })
  }


app.use(session({
    secret: 'session_secret_key',
    resave: false,
    saveUninitialized: false,
    store : sessionStore,
    cookie: {
      httpOnly: false,
      //maxAge: 500 * 1000, //set the expiry of token to 500second
      secure: false
    }
  }));

  app.use((req, res, next) => {
    console.log(req.method + '-' + req.url)
    next()
  })

app.use('/login',loginrouter);

app.use((req,res,next)=>{sessionCheck(req,res,next)});
app.use('/common',commonrouter);
app.use('/admin',adminrouter);
app.use('/pdf',pdfrouter);

app.get('/captcha',function(req,res){
    var captcha=svgcaptcha.create({ignoreChars:'iI0OolL1',});
    console.log(captcha.text)
    captcha.text=crypto.AES.encrypt(captcha.text,'private_key').toString();
    console.log(crypto.AES.decrypt(captcha.text,'private_key').toString(crypto.enc.Utf8))
    res.json(captcha);
})

module.exports=app;

