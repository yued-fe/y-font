'use strict';

const Y_CONFIG = require('../y-font-config');

const fs = require('fs');
const path = require('path');
const express = require('express');
const router = express.Router();
const utils = require('utility');

// 自定义方法
var tools = require('../lib/tool');

function getFontList() {
  try {
    let fontList = require('../y-font-list');
    let data = {};
    let fonts = [];
    Object.keys(fontList).forEach(function(key){
      fonts.push({
        "queryName":key,
        "fontName":fontList[key].fontDes
      })
    })
    data = {
      code:'0',
      msg:"成功读取当前字体列表",
      data:{
        totalFonts:fonts.length,
        fontList:fonts
      }
    }
    return data;
  } catch (e) {
    return {
      "msg":"字体列表文件出错,请检查重试"
    }
  }

}

router.get('/', function(req, res, next) {
  res.send(getFontList());
});

module.exports = router;