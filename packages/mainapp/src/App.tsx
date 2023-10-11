import React from 'react';
import './App.css';
import { registerMicroApps, start, loadMicroApp, initGlobalState, MicroAppStateActions } from 'qiankun';
import { Link, BrowserRouter, Routes, Route } from 'react-router-dom';

const state = {
  myage: 12,
  st: 'init',
};
// 初始化 state
const actions: MicroAppStateActions = initGlobalState(state);
actions.onGlobalStateChange((state, prev) => {
  // state: 变更后的状态; prev 变更前的状态
  console.log(state, prev);
});
actions.setGlobalState(state);
registerMicroApps([
  {
    name: 'react app', // app name registered
    entry: '//localhost:3001',
    container: '#reactapp',
    activeRule: '/reactapp',
    props: {
      haha: 'prop传递',
    },
  },
  {
    name: 'vue app',
    entry: '//localhost:8080',
    container: '#vueapp',
    activeRule: '/vueapp',
    props: {
      haha: 'prop传递',
    },
  },
]);
start({
  sandbox: {
    //  experimentalStyleIsolation: true,
    // strictStyleIsolation: true,
  },
});

function Home() {
  const btnClick = () => {
    loadMicroApp({
      name: 'vue3 app',
      entry: '//localhost:7105/',
      container: '#vue3app',
      props: {
        haha: 'kk',
      },
    });
  };
  const btnClickvue2dongtai = () => {
    loadMicroApp({
      name: 'vue2 app dongtai',
      entry: '//localhost:8080/',
      container: '#vue2appDongtai',
      props: {
        haha: 'kk',
      },
    });
  };
  return (
    <section className='App'>
      <div>
        <span className='pdr'>导航栏：</span>
        <button onClick={btnClick} className='pdr'>
          动态添加路由
        </button>
        <button onClick={btnClickvue2dongtai} className='pdr'>
          动态添加vue2路由
        </button>
        <Link className='pdr' to='/vueapp'>
          跳转到默认的vue路由
        </Link>
        <Link className='pdr' to='/reactapp'>
          跳转到默认的react路由
        </Link>
      </div>
      <div>
        <span>默认微前端模块:</span>
        <div className='def-wrap'>
          <div className='contain'>
            <span>默认vue模块:</span>
            <div id='vueapp'></div>
          </div>
          <div className='contain'>
            <span>默认react模块:</span>
            <div id='reactapp'></div>
          </div>
          <div className='contain'>
            <span>动态加载vue3模块:</span>
            <div id='vue3app'></div>
          </div>
          <div className='contain'>
            <span>动态加载vue2模块:</span>
            <div id='vue2appDongtai'></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='*' element={<Home />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
