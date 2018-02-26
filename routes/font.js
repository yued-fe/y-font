'use strict';
var fs = require('fs');
var path = require('path');
var express = require('express');
var router = express.Router();
var intoStream = require('into-stream');
var uuid = require('node-uuid');
var rename = require('gulp-rename');
var EasyZip = require('easy-zip').EasyZip;

router.post('/', function(req, res, next) {
  console.log('读取文件:' + req.body.font + '.ttf');
  console.log(path.join(process.cwd(), 'public', 'uploads', req.body.font + '.ttf'))
  fs.readFile(path.join(process.cwd(), 'public', 'uploads', req.body.font + '.ttf'), (err, data) => {
    if (err) throw err;
    handleFont(req, res);
  });

});

function handleFont(req, res) {
  var absUrl = "http://webfont.pub.is26.com";
  var styleData;
  var fontmin;
  var originalname = req.body.font + '.ttf';
  var output = path.join(process.cwd(), 'public', 'uploads', originalname);
  var fontFamily = originalname.replace(/\.ttf/, '');
  var id = uuid.v1();
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
        text: req.body.text // 所需文字
      }))
      .use(Fontmin.ttf2eot()) // eot 转换插件
      .use(Fontmin.ttf2woff()) // woff 转换插件
      .use(Fontmin.ttf2svg()) // svg 转换插件
      .use(Fontmin.css({
        fontPath: fontPath,
        asFileName: true,
        base64: true, 
      })) // css 生成插件
      .dest(dest);
  } else {
    fontmin = new Fontmin()
      .src(output)
      .use(Fontmin.glyph())
      .use(rename(originalname))
      .use(Fontmin.ttf2eot()) // eot 转换插件
      .use(Fontmin.ttf2woff()) // woff 转换插件
      .use(Fontmin.ttf2svg()) // svg 转换插件
      .use(Fontmin.css({
        fontPath: fontPath,
        asFileName: true,
        base64: true, 
      })) // css 生成插件
      .dest(dest);

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
        style: styleData,
        fontFamily: fontFamily,
        cssUrl:absUrl + '/fontmin/' + id + '/' + req.body.font +  '.css',
        zipUrl: absUrl + '/fontmin/' + id + '.zip'

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