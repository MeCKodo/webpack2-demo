module.exports = {
	"extends": "airbnb-base",
	"parser": "babel-eslint",
	"globals" : {
		"Vue" : true,
		"$": true,
		"$data": true,
		"wx": true,
		"pingpp": true,
	},
	env: {
		browser: true,
	},
	"plugins": [
		'html'
	],
	"rules" : {
		"global-require": 0,
		// "indent": [0, "tab"], // 去掉tab约定,IDE会有问题
		"no-new" : 0, // 避免vue 必须new调用的注释
		"no-trailing-spaces": [0, { "skipBlankLines": true }],// 去掉行未得空格
		"no-param-reassign": 0,
		"no-tabs": 0,
		"key-spacing": 0,
	},
};