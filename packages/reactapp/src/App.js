import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function Foo() {
  return <div>i am foo</div>;
}

function Bar() {
  return <div>i am bar</div>;
}
function DefaultReact() {
  return (
    <div>
      i am DefaultReact <br />
      <Link to='/bar'>go to bar</Link>
      <Link to='/foo'>go to foo</Link>
    </div>
  );
}
function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <BrowserRouter basename={window.__POWERED_BY_QIANKUN__ ? '/reactapp' : '/'}>
          <Routes>
            <Route path='/' element={<DefaultReact />} />

            <Route path='/foo' element={<Foo />} />
            <Route path='/bar' element={<Bar />} />
          </Routes>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
