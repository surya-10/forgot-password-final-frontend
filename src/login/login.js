import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
let userValidation = yup.object({
    email:yup.string().required("email cannot be empty"),
    password:yup.string().required("password cannot be empty")
})
function Login(){
    let navigate = useNavigate();
    let {values, handleChange, handleSubmit, handleBlur, touched, errors} = useFormik({
        initialValues:{
            email:"",
            password:""
        },
        validationSchema:userValidation,
        onSubmit:(obj)=>{
            loginUser(obj)
        }
    })
    async function loginUser(obj){
        let result = await fetch("http://localhost:9001/login", {
            method:"POST",
            body:JSON.stringify(obj),
            headers:{
                "content-type":"application/json"
            }
        })
        let output = await result.json();
        if(output.status==200){
            alert("login successfully")
        }
        else if(output.status==404 && output.msg=="user does not exist"){
            document.querySelector(".msg").style.display="flex";
        }
        else if(output.status==400 && output.msg=="incorrect"){
            document.querySelector(".msg2").style.display="flex";
        }
    }
    
    return (
        <div className="signup-div min-vh-100 d-flex justify-content-center align-items-center">
            <div className="signup">
                <div className="container-fluid d-flex justify-content-center align-items-stretch flex-column cont">
                    <p className="h5 mb-4">WELCOME, LOGIN HERE</p>
                    <form onSubmit={handleSubmit}>
                        <div className="forms d-flex justify-content-center flex-column align-content-center">
                            {/* <div className="form">
                            </div> */}
                            <div className="form">
                                <input type="email" placeholder="enter email" className="form-control"
                                name="email"
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}/>
                                {touched.email && errors.email ? <div className="text-danger">email cannot be empty</div>:""}
                            </div>
                            <div className="form">
                                <input type="password" placeholder="enter password"className="form-control" 
                                name="password"
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}/>
                                {touched.password && errors.password ? <div className="text-danger">password cannot be empty</div>:""}
                            </div>
                        </div>
                        <p className="msg text-danger">Your email does not exit. Do signup</p>
                        <p className="text-danger msg2">Username or password is incorrect</p>
                        <p className="sign-btn" onClick={()=>navigate("/forgot-password")}>Forgot password ?</p>
                        <button className="btn bg-success text-white" type="submit">Login</button>

                        <p className="mt-3 sign-btn" onClick={()=>navigate("/")}>New user ? click here</p>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Login;