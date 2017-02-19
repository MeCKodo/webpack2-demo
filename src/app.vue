<template>
	<div id="app">
		123
		123
		<router-view></router-view>
		<router-link to="/foo">go to222222 2foo</router-link>

	</div>
</template>

<script>
	export default {
		name: 'app',
		data() {
			return {
				cacheRecord : [{
					name : 'kodo1',
					age : 118,
				}],
			};
		},
		methods : {},
	};
</script>

<style>
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		margin-top: 60px;
	}
	body {
		background: #abd;
	}
	#kodo {
		display: flex;
	}
</style>
