import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 全局样式
import '@/assets/style/reset.less';

// element-plus UI插件
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

// 创建应用实例对象——app(类似之前Vue2的vm,app比vm轻，之前的vm属性太多)
const app = createApp(App);
console.log('createApp(App):', app);

// 注册插件
app.use(ElementPlus);
app.use(store);
app.use(router);
// 挂载
app.mount('#app');
