import Vue from 'vue';
import App from './app.vue';

import './assets/style/test.css';

var vm = new Vue({
    el: '#app',
    render: (h) => h(App)  // 通过创建DOM元素返回参数h将App挂载，h即为hyperscript，用来实现虚拟DOM的
});