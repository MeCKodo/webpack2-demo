import tpl from './index.html';

export default class {
	mount(container) {
		document.title = 'home';
		container.innerHTML = tpl
	}
}