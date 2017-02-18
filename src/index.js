// 引入作为全局对象储存空间的global.js, js文件可以省略后缀
import global from './global'
import SpaHistory from 'spa-history';

// 引入页面文件
import foo from './views/foo'
import bar from './views/bar'

const routes = {
	'/foo': foo,
	'/bar': bar
}


new SpaHistory({
	onNavigate(location) {
		console.log(location);
		const path = location.path === '/' ? '' : location.path;
		import(`./views${path}/index.js`).then(module => {
			const View = module.default
			const view = new View()
			view.mount(document.body)
		})
	}
})

// Router类, 用来控制页面根据当前URL切换
class Router {
	start() {
		// 点击浏览器后退/前进按钮时会触发window.onpopstate事件, 我们在这时切换到相应页面
		// https://developer.mozilla.org/en-US/docs/Web/Events/popstate
		window.addEventListener('popstate', () => {
			this.load(location.pathname)
		})
		
		// 打开页面时加载当前页面
		this.load(location.pathname)
	}
	
	// 前往path, 会变更地址栏URL, 并加载相应页面
	go(path) {
		// 变更地址栏URL
		history.pushState({}, '', path)
		// 加载页面
		this.load(path)
	}
	
	// 加载path路径的页面
	load(path) {
		// 创建页面实例
		
	}
}

// new一个路由对象, 赋值为global.router, 这样我们在其他js文件中可以引用到
// global.router = new Router()
// global.router.start()