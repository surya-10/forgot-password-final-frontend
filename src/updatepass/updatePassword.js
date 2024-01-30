import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
let userValidation = yup.object({
    password:yup.string().required("password cannot be empty")
})
function UpdatePassword(){
    let [show, setShow] = useState(false);
    let [update, setUpdate] = useState("Update");
    let navigate = useNavigate();
    let id = localStorage.getItem("id");
    let {values, handleChange, handleSubmit, handleBlur, touched, errors} = useFormik({
        initialValues:{
            password:""
        },
        validationSchema:userValidation,
        onSubmit:(obj)=>{
            obj.id = id;
            updatePass(obj)
        }
    })
    async function updatePass(obj){
        setUpdate("Updating....");
        setShow(true);
        let result = await fetch("https://forgotpassword-mbwj.onrender.com/update-new-password", {
            method:"POST",
            body:JSON.stringify(obj),
            headers:{
                "content-type":"application/json"
            }
        })
        let output = await result.json();
        setUpdate("Update");
        setShow(false);
        if(output.response){
            alert("New password has been updated");
            navigate("/login");
        }
    }
    
    return (
        <div className="signup-div min-vh-100 d-flex justify-content-center align-items-center">
            <div className="signup">
                <div className="container-fluid d-flex justify-content-center align-items-stretch flex-column cont">
                    <p className="h5 mb-4">Enter new password</p>
                    <form onSubmit={handleSubmit}>
                        <div className="forms d-flex justify-content-center flex-column align-content-center">
                            <div className="form">
                                <input type="password" placeholder="Enter new password"className="form-control" 
                                name="password"
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}/>
                                {touched.password && errors.password ? <div className="text-danger">password cannot be empty</div>:""}
                            </div>
                        </div>
                        <button className="btn bg-success text-white" type="submit">{update}</button>
                    </form>
                </div>
            </div>
            {show && <div className="spin">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>}
        </div>
    )
}
export default UpdatePassword;