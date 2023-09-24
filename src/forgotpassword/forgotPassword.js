import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
let userValidation = yup.object({
    email:yup.string().required("email cannot be empty"),
})
function Forgot(){
    let navigate = useNavigate();
    let {values, handleChange, handleSubmit, handleBlur, touched, errors} = useFormik({
        initialValues:{
            email:""
        },
        validationSchema:userValidation,
        onSubmit:(obj)=>{
            forgotPass(obj)
        }
    })
    async function forgotPass(obj){
        let result = await fetch("https://forgotpassword-mbwj.onrender.com/forgot", {
            method:"POST",
            body:JSON.stringify(obj),
            headers:{
                "content-type":"application/json"
            }
        })
        let output = await result.json();
        if(output.status==201){
            alert("reset link sent successfully to you");
            navigate("/login")
        }
        else{
            alert("Your email does not exist. please signup");
            navigate("/")
        }
    }
    
    return (
        <div className="signup-div min-vh-100 d-flex justify-content-center align-items-center">
            <div className="signup">
                <div className="container-fluid d-flex justify-content-center align-items-stretch flex-column cont">
                    <p className="h5 mb-4">Confirm your email</p>
                    <form onSubmit={handleSubmit}>
                        <div className="forms d-flex justify-content-center flex-column align-content-center">
                            
                            <div className="form">
                                <input type="email" placeholder="enter email" className="form-control"
                                name="email"
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}/>
                                {touched.email && errors.email ? <div className="text-danger">email cannot be empty</div>:""}
                            </div>
                           
                        </div>
                        
                        <p className="msg text-danger">Your email does not exit. Do signup</p>
                        <button className="btn bg-success text-white" type="submit">Send</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Forgot;