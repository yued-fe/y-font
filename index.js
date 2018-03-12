const Y_CONFIG = require('./y-font-config');
const express = require('express');
const path = require('path');
const app = express();
const Fontmin = require('fontmin');
const logger = require('morgan');
const multer  = require('multer');
const chalk = require('chalk');

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 配置路由
const getFont = require('./routes/getFont');
const getFontList = require('./routes/getFontList');

app.use(Y_CONFIG.apiName + '/get-font', upload.any(), getFont);
app.use(Y_CONFIG.apiName + '/get-font-list', upload.any(), getFontList);

app.listen('0.0.0.0' , Y_CONFIG.port, () => {
    console.log(chalk.blue('[服务环境]:') + chalk.green(app.get('env')));
    console.log(chalk.blue('[服务端口]:') + chalk.green(Y_CONFIG.port));
})