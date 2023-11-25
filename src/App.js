import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Signup from './signin/signup';
import Login from './login/login';
import Forgot from './forgotpassword/forgotPassword';
import Reset from './reset/reserPassword';
import UpdatePassword from './updatepass/updatePassword';
import UserData from './userData/addUser';
import AdminControl from './login/adminLogin';
import LoginAsAdmin from './login/adminLoginPage';
import Base from './admincontrols/base';
import ViewStudents from './admincontrols/addtudent';
import ShowFullStudent from './admincontrols/showFulldata';
import EditStudents from './admincontrols/editStudent';
import StudentDash from './studentcontrol/studentDashboard';
import StudentBase from './studentcontrol/studBase';
import ShowStudenData from './studentcontrol/showStudent';
import CurrentStudent from './studentcontrol/student';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path='/signup' element={<Signup/>}/>
        <Route  path='/login' element={<Login/>}/>
        <Route  path='/forgot-password' element={<Forgot/>}/>
        <Route  path='/reset-password/:id/:token' element={<Reset/>}/>
        <Route  path='/update-new-password' element={<UpdatePassword/>}/>
        <Route path='/admin/auth/add' element={<UserData/>}/>
        <Route path='/' element={<AdminControl/>}/>
        <Route path='/admin-login' element={<LoginAsAdmin/>}/>
        {/* <Route path='/admin/auth/all' element={<Base/>}/> */}
        <Route path='/admin/auth/all' element={<ViewStudents/>}/>
        <Route path='/admin/auth/student/profile' element={<ShowFullStudent/>}/>
        <Route path='/admin/student/edit/:id' element={<EditStudents/>}/>
        <Route path='/student/dashboard' element={<StudentBase/>}/>
        <Route path='/user/students/all' element={<ShowStudenData/>}/>
        <Route path='/user/student/my-dashboard' element={<CurrentStudent/>}/>

      </Routes>
    </div>
  );
}

export default App;
