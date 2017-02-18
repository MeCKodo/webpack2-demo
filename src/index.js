// 引入作为全局对象储存空间的global.js, js文件可以省略后缀
import './assets/index.css'
import './assets/sass/style.scss'
import Vue from 'vue';
import App from './app.vue'
import router from './router'

new Vue({
	el : "#app",
	data : {
		name : 'kodo',
		age : 18
	},
	router,
	...App
});