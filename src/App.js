import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Signup from './signin/signup';
import Login from './login/login';
import Forgot from './forgotpassword/forgotPassword';
import Reset from './reset/reserPassword';
import UpdatePassword from './updatepass/updatePassword';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path='/' element={<Signup/>}/>
        <Route exact path='/login' element={<Login/>}/>
        <Route exact path='/forgot-password' element={<Forgot/>}/>
        <Route exact path=':id/:token' element={<Reset/>}/>
        <Route exact path='/update-new-password' element={<UpdatePassword/>}/>

      </Routes>
    </div>
  );
}

export default App;
