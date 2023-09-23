import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
let userValidation = yup.object({
    name:yup.string().required("name cannot be empty"),
    email:yup.string().required("email cannot be empty"),
    password:yup.string().required("password cannot be empty")
})
function Signup(){
    let navigate = useNavigate();
    let {values, handleChange, handleSubmit, handleBlur, touched, errors} = useFormik({
        initialValues:{
            name:"",
            email:"",
            password:""
        },
        validationSchema:userValidation,
        onSubmit:(obj)=>{
            addUser(obj)
        }
    })
    async function addUser(obj){
        let result = await fetch("http://localhost:9001/signup", {
            method:"POST",
            body:JSON.stringify(obj),
            headers:{
                "content-type":"application/json"
            }
        })
        let output = await result.json();
        if(output.status==201){
            alert("Your signup was succesfull. Go and Login");
            navigate("/login")
        }
        else if(output.status==404 && output.msg=="exist"){
            document.querySelector(".msg").style.display="flex"
        }
    }
    
    return (
        <div className="signup-div min-vh-100 d-flex justify-content-center align-items-center">
            <div className="signup">
                <div className="container-fluid d-flex justify-content-center align-items-stretch flex-column cont">
                    <p className="h5 mb-4">REGISTER HERE</p>
                    <form onSubmit={handleSubmit}>
                        <div className="forms d-flex justify-content-center flex-column align-content-center">
                            <div className="form">
                                <input type="text" placeholder="enter name" className="form-control" id="name"
                                name="name"
                                value={values.name}
                                onChange={handleChange}
                                onBlur={handleBlur}/>
                                {touched.name && errors.name ? <div className="text-danger">name cannot be empty</div>:""}
                            </div>
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
                        
                        <p className="msg text-danger">email already exist</p>
                        
                        <button className="btn bg-success text-white mt-2" type="submit">Signup</button>

                        <p className="msg1 mt-3" onClick={()=>navigate("/login")}>Already have an account ?</p>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Signup;