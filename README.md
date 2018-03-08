
y-font 中文字体接口服务
==============

## 更新日志

* 2018.03.03 增加获得字体列表接口

## 写在前面

一个优秀的中文字体，可以给网站访客带来更加精致的阅读体验。但是由于中文字体文件大小限制，传统上比较少在网页端使用中文字体。过去我们团队在项目中使用[字蛛](http://font-spider.org/)作为压缩中文webfont的解决方案，一定程度上解决了我们的痛点。

为了让大家更方便使用中文webfont，现在基于[fonmin](https://github.com/ecomfe/fontmin)，开发了[y-font](https://github.com/yued-fe/y-font)字体服务。

## Install

```
git clone https://github.com/yued-fe/y-font.git
cd y-font && npm install
npm start

```

## Config

服务配置文件为`y-font-config.js`，可进行服务相关配置

```
// y-font 服务配置文件

module.exports = {
	port: process.env.PORT || 3000,
	domain: 'http://font.pub.is26.com',
	apiName:'/api/v1',
	staticDomain: '',
	storage: {
		SecretId: '',
		SecretKey: '',
		Bucket: '',
		Region: 'ap-shanghai'
	},
}
```

为方便维护字体,在`y-font-list.js`维护支持的中文字体列表，可将中文字体`tff`文件保存在`assets/fonts`目录下。

## Usage

#### 获得字体接口列表

* `GET` `{apiName}/get-font-list`

可获得当前维护的所有字体。

#### 获得中文字体

* `POST` `{apiName}/get-font`

`body`
```
{
	"font":"FZCQJT", // 字体编号
	"text":"创世纪起点中文网起点传奇", // 需要生成中文字体的字体
	"fontOption":{
		"base64":false, // 是否转base64
		"glyph":true, 
		"iconPrefix": "qidian-icon", // 在css中使用自定前缀，需要`glyph:true`
		"fontFamily":"qidian-book" // 在css中使用自定字体名称
	}
}	

```




