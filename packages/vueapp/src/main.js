import './public-path';
import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import routes from './router';
import store from './store';
Vue.config.productionTip = false;
Vue.use(VueRouter);

let router = null;
let instance = null;

function render (props = {}) {
  const { container } = props;
  let routeModule = 'history'
  if (props.haha === 'kk') {
    routeModule = 'abstract'
  }
  router = new VueRouter({
    base: window.__POWERED_BY_QIANKUN__ ? '/vueapp/' : '/',
    mode: routeModule,
    routes,
  });

  instance = new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount(container ? container.querySelector('#app') : '#app');
}

// 独立运行时
if (!window.__POWERED_BY_QIANKUN__) {
  render();
}

export async function bootstrap () {
  console.log('[vue] vue app bootstraped');
}

export async function mount (props) {
  console.log('[vue] props from main framework', props);
  console.log('[vue] props.name', props.haha);

  render(props);
  console.log('instance', instance.$router.push({ name: 'about' }))
}
export async function unmount () {
  instance.$destroy();
  instance.$el.innerHTML = '';
  instance = null;
  router = null;
}
