'use strict';

const Y_CONFIG = require('../y-font-config');
const fontList = require('../y-font-list');
var fs = require('fs');
var path = require('path');
var express = require('express');
var router = express.Router();
var Fontmin = require('fontmin');
var intoStream = require('into-stream');
var uuid = require('node-uuid');
var crypto = require('crypto');
var utils = require('utility');
var rename = require('gulp-rename');
var EasyZip = require('easy-zip').EasyZip;

// 储存相关
var COS = require('cos-nodejs-sdk-v5');
var cos = new COS(Y_CONFIG.storage);

// 自定义方法
var tools = require('../lib/tool');

router.post('/', function(req, res, next) {
  fs.readFile(path.join(process.cwd(), 'assets', 'fonts', req.body.font + '.ttf'), (err, data) => {
    if (err){
      res.send({
        "code":1,
        "msg":"字体参数错误"
      })
    };
    handleFont(req, res);
  });
});

function handleFont(req, res) {
  var fontminOptions = Object.assign({
    base64: true, // inject base64 data:application/x-font-ttf; (gzip font with css). 
    // default = false
    glyph: false, // generate class for each glyph. default = false
    asFileName: true, // rewrite fontFamily as filename force. default = false
  }, req.body.fontOption);

  var fontString = tools.getUniqSortedSting(req.body.text);
  var absUrl = Y_CONFIG.domain;
  var styleData;
  var fontmin;
  var originalname = req.body.font + '.ttf';
  var output = path.join(process.cwd(), 'assets', 'fonts', originalname);
  var fontFamily = originalname.replace(/\.ttf/, '');
  var id = utils.md5(req.body.font + fontString);
  var dest = path.join(process.cwd(), 'public', 'fontmin', id);
  var fontPath = absUrl + '/fontmin/' + id + '/';
  var cssPath = path.join(process.cwd(), 'public', 'fontmin', id, originalname.replace(/\.ttf/, '.css'));
  var reg = /url\("\/fontmin\/([^/]+)\//g;
  var outputName = path.join(process.cwd(), 'public', 'fontmin', id + '.zip');

  if (req.body.text.length > 0) {
    fontmin = new Fontmin()
      .src(output)
      .use(rename(originalname))
      .use(Fontmin.glyph({ // 字型提取插件
        text: fontString // 所需文字
      }))
      .use(Fontmin.ttf2eot()) // eot 转换插件
      .use(Fontmin.ttf2woff()) // woff 转换插件
      .use(Fontmin.ttf2svg()) // svg 转换插件
      .use(Fontmin.css(Object.assign({
        fontPath: fontPath
      }, fontminOptions))) // css 生成插件
      .dest(dest)

  } else {
    fontmin = new Fontmin()
      .src(output)
      .use(Fontmin.glyph())
      .use(rename(originalname))
      .use(Fontmin.ttf2eot()) // eot 转换插件
      .use(Fontmin.ttf2woff()) // woff 转换插件
      .use(Fontmin.ttf2svg()) // svg 转换插件
      .use(Fontmin.css(Object.assign({
        fontPath: fontPath
      }, fontminOptions))) // css 生成插件
      .dest(dest)
  }

  runFontmin(fontmin)
    .then(function() {
      return readFile(cssPath);
    })
    .then(function(data) {
      styleData = data;
      data = data.replace(reg, absUrl + 'url("/fonts/');
      return writeFile(cssPath, data);
    })
    .then(function() {
      return zipFonts(dest, outputName);
    })
    .then(function() {
      res.json({
        meta: {
          md5: id,
          text: fontString,
          textLength: fontString.length
        },
        fontName: !fontList[req.body.font].fontDes ? fontList[req.body.font].fontDes : '未找到字体描述',
        fontFamily: fontFamily,
        cssUrl: absUrl + '/fontmin/' + id + '/' + req.body.font + '.css',
        zipUrl: absUrl + '/fontmin/' + id + '.zip',
        style: styleData
      });

    })
    .catch(function(err) {
      throw new Error(err);
    });

}

function runFontmin(fontmin) {
  return new Promise(function(resolve, reject) {
    fontmin.run(function(err) {
      if (err) {
        return reject(err);
      }

      resolve();
    });
  });
}

function readFile(path) {
  return new Promise(function(resolve, reject) {
    fs.readFile(path, 'utf-8', function(err, data) {
      if (err) {
        return reject(err);
      }

      resolve(data);
    });
  });
}

function writeFile(path, data) {
  return new Promise(function(resolve, reject) {
    fs.writeFile(path, data, function(err) {
      if (err) {
        return reject(err);
      }

      resolve();
    });
  });
}

function zipFonts(input, output) {
  var zip = new EasyZip();
  return new Promise(function(resolve, reject) {
    zip.zipFolder(input, function(err) {
      if (err) {
        return reject(err);
      }

      zip.writeToFile(output);
      resolve();
    });
  });
}



module.exports = router;