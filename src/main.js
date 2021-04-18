import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';

import "./permission"; //路由守卫即页面权限和按钮权限
import "../mock"; //mock.js
import "@/styles/index.scss"; // global css

import directive from './permission'

const app = createApp(App).use(store).use(router).use(ElementPlus)
// 按钮权限相关的自定义指令



directive(app)
app.mount('#app')
