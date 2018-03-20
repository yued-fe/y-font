// y-font 服务配置文件
module.exports = {
	port: process.env.PORT || 10301,
	domain: 'http://font.pub.is26.com',
	staticDomain: '',
	storage: {
		SecretId: 'AKIDOqb8e2KwJIJ60TtxC66vBxd9qyesrlO6',
		SecretKey: 'rCP3h2MWDKdU196CbtlB7yicxoaTGEot',
		Bucket: 'luoleiorg-1251554599',
		Region: 'ap-shanghai'
	},
}

// 根据不同开发env环境做做的定制配置
module.exports.evnConf = {
	// 本地开发和调试
	local:{
		assetsDomain:'',
		staticDomain: '',
		extendStorage:false,
		COS:{

		},
	},
	// 开发环境
	dev:{
		assetsDomain:'devgtimg.qidian.com',
		staticDomain: '',
		extendStorage:false,
	},
	// 测试环境
	oa:{
		assetsDomain:'oagtimg.qidian.com',
		staticDomain: '',
		extendStorage:false,
	},
	// 预发布环境
	pre:{
		assetsDomain:'pregtimg.qidian.com',
		staticDomain: '',
		extendStorage:false,
	},
	// 生产环境
	pro:{
		assetsDomain:'gtimg.qidian.com',
		staticDomain: '',
		extendStorage:true,
	}
}