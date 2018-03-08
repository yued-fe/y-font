'use strict';

/**
 * 通用函数
 */

const Y_CONFIG = require('../y-font-config');
const fs = require('fs');



module.exports = {

	// 获得去重后的字符串合集
	getUniqSortedSting(string) {
		let sortedSting = string.split('').sort().join('');
		let uniqString = Array.from(new Set(sortedSting.split('').sort())).join('');
		return uniqString;
	},

	// 检查文件夹是否存在,若不存在则创建
	 checkDirectory(dirPath) {
		try {
			fs.statSync(dirPath);
		} catch (err) {
			fs.mkdirSync(dirPath);
			try {
				fs.statSync(dirPath);
			} catch (err) {
				throw new Error(`Create dir ${dirPath} failed, please check your system write permission.`);
			}
		}
	}
}