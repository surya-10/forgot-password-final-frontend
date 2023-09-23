import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
let userValidation = yup.object({
    password:yup.string().required("password cannot be empty")
})
function Reset(){
    let navigate = useNavigate();
    let{id, token} = useParams();
    localStorage.setItem("id", id);
    let {values, handleChange, handleSubmit, handleBlur, touched, errors} = useFormik({
        initialValues:{
            password:""
        },
        validationSchema:userValidation,
        onSubmit:(obj)=>{
            console.log(obj);
            resetPass(obj);
            console.log(obj);
        }
    })
    async function resetPass(obj){
        let result = await fetch(`http://localhost:9001/reset-password/${id}/${token}`, {
            method:"POST",
            body:JSON.stringify(obj),
            headers:{
                "content-type":"application/json"
            }
        })
        let output = await result.json();
        if(output.finalResult===true && output.status==="matching"){
            navigate("/update-new-password");
        }
        else if(output.finalResult===false && output.status==="token expired"){
            alert("password reset link expired")
        }
        else if(output.finalResult===false && output.status==="not"){
            document.querySelector(".temp").style.display = "flex";
        }
        
    }
    
    return (
        <div className="signup-div min-vh-100 d-flex justify-content-center align-items-center">
            <div className="signup">
                <div className="container-fluid d-flex justify-content-center align-items-stretch flex-column cont">
                    <p className="h5 mb-4">Enter tempoary password</p>
                    <form onSubmit={handleSubmit}>
                        <div className="forms d-flex justify-content-center flex-column align-content-center">
                            
                            <div className="form">
                                <input type="password" placeholder="temporary password" className="form-control"
                                name="password"
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}/>
                                {touched.password && errors.password ? <div className="text-danger">password cannot be empty</div>:""}
                            </div>
                           
                        </div>
                        <p className="temp">tempoary password is incorrect</p>
                        <button className="btn bg-success text-white" type="submit">Verify</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Reset;