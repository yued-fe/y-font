var express = require('express');
var app = express();
var Fontmin = require('fontmin');
app.get('/api/baidu/:keyword', function(req, res) {
	var keyword = req.param('keyword');
	var encodeKey = encodeURIComponent(keyword);
	var url = 'http://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=0&rsv_idx=1&tn=baidu&wd=' + encodeKey + '&rsv_pq=d1bc678500027fae&rsv_t=b1baqnanzIu6%2B%2B6jgA5UgJY9hPGjPUfG2I03drYiQCZLKs41hn1TBNqN2tg&rqlang=cn&rsv_enter=1&rsv_sug3=14&rsv_sug1=13&rsv_sug7=100&rsv_sug2=0&inputT=1230&rsv_sug4=1231'
});


app.get('/test', function(req, res) {

	res.send ({
		"font":"FZDBSJT.tff",
		"fontDes":"方正大标宋简体",
		"css":"",
		"assets":{

		}
	})
});


app.listen(3000);