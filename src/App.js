import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Signup from './components/signup';
import Login from './components/login';
import Forgot from './components/forgotPassword';
import Reset from './components/reserPassword';
import UpdatePassword from './components/updatePassword';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path='/' element={<Signup/>}/>
        <Route exact path='/login' element={<Login/>}/>
        <Route exact path='/forgot-password' element={<Forgot/>}/>
        <Route exact path='/reset-password/:id/:token' element={<Reset/>}/>
        <Route exact path='/update-new-password' element={<UpdatePassword/>}/>

      </Routes>
    </div>
  );
}

export default App;
