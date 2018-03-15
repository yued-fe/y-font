// y-font 服务配置文件


module.exports = {
	port: process.env.PORT || 13013,
	domain: 'http://webfont.is26.com',
	apiName:'/api/v1',
	publicPath:'/data/static/webfont',
	staticDomain: '/public',
	storage: {
		SecretId: 'AKIDOqb8e2KwJIJ60TtxC66vBxd9qyesrlO6',
		SecretKey: 'rCP3h2MWDKdU196CbtlB7yicxoaTGEot',
		Bucket: 'luoleiorg-1251554599',
		Region: 'ap-shanghai'
	},
}