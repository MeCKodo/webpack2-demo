import Vue from 'vue'
import Router from 'vue-router'
import Hello from '../components/Hello.vue'
import test from '../components/test.vue'

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			name: 'Hello',
			component: Hello
		},
		{
			path: '/foo',
			name: 'test',
			component: test
		}
	]
})

