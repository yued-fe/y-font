var express = require('express');
var express = require('express');
var path = require('path');
var app = express();
var Fontmin = require('fontmin');
var logger = require('morgan');
var multer  = require('multer');

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var storage = multer.memoryStorage();
var upload = multer({ storage: storage });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'assets')));

// 配置路由
var getFont = require('./routes/font');

app.use('/api/v1/get-font', upload.any(), getFont);


app.listen(3000);