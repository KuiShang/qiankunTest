import './public-path';
import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import routes from './router';
import store from './store';

let router = null;
let instance = null;
let history = null;

function render (props = {}) {
  const { container } = props;
  history = createWebHistory(window.__POWERED_BY_QIANKUN__ ? '/vue3' : '/');
  router = createRouter({
    history,
    routes,
  });

  instance = createApp(App);
  instance.use(router);
  instance.use(store);
  instance.mount(container ? container.querySelector('#app') : '#app');
}

if (!window.__POWERED_BY_QIANKUN__) {
  render();
}

export async function bootstrap () {
  console.log('%c%s', 'color: green;', 'vue3.0 app bootstraped');
}

function storeTest (props) {
  props.onGlobalStateChange && props.onGlobalStateChange((value, prev) => console.log(`[onGlobalStateChange - ${props.name}]:`, value, prev), true);
  props.setGlobalState &&
    props.setGlobalState({
      ignore: props.name,
      user: {
        name: props.name,
      },
    });
}

let tempstate;
export async function mount (props) {
  console.log('vue3-props---', props);
  props.onGlobalStateChange((state, prev) => {
    // state: 变更后的状态; prev 变更前的状态
    console.log('vue3-props---');
    tempstate = state;
    console.log(state, prev);
  });
  props.setGlobalState({ ...tempstate, st: 'from vue3 state' });
  storeTest(props);
  render(props);

  router.push({ name: 'about' })
  instance.config.globalProperties.$onGlobalStateChange = props.onGlobalStateChange;
  instance.config.globalProperties.$setGlobalState = props.setGlobalState;
}

export async function unmount () {
  instance.unmount();
  instance._container.innerHTML = '';
  instance = null;
  router = null;
  history.destroy();
}
