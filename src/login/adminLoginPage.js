import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
let userValidation = yup.object({
    email: yup.string().required("email cannot be empty"),
    accessKey: yup.string().required("password cannot be empty")
})

function LoginAsAdmin() {
    let [show, setShow] = useState(false);
    let navigate = useNavigate();
    let { values, handleChange, handleSubmit, handleBlur, touched, errors } = useFormik({
        initialValues: {
            email: "",
            accessKey: ""
        },
        validationSchema: userValidation,
        onSubmit: (obj) => {
            loginUser(obj);
        }
    })

    async function loginUser(obj) {
        setShow(true);
        let result = await fetch("https://forgotpassword-mbwj.onrender.com/access/admin/login", {
            method: "POST",
            body: JSON.stringify(obj),
            headers: {
                "content-type": "application/json"
            }
        })
        let output = await result.json();
        setShow(false);
        if (output.status == 200) {
            navigate("/admin/auth/all");
        }
        else if (output.status == 404 && output.msg == "not found") {
            document.querySelector(".msg").style.display = "flex";
        }
        else if (output.status == 404 && output.msg == "accesskey incorrect") {
            document.querySelector(".msg2").style.display = "flex";
        }
    }
    return (
        <div className="admin-login-div min-vh-100 d-flex justify-content-center align-items-center">
            <div className="signup">
                <div className="container-fluid d-flex justify-content-center align-items-stretch flex-column cont">
                    <p className="h5 mb-4">ADMIN LOGIN</p>
                    <form onSubmit={handleSubmit}>
                        <div className="forms d-flex justify-content-center flex-column align-content-center">
                            {/* <div className="form">
                            </div> */}
                            <div className="form">
                                <input type="email" placeholder="admin email" className="form-control"
                                    name="email"
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur} />
                                {touched.email && errors.email ? <div className="text-danger">email cannot be empty</div> : ""}
                            </div>
                            <div className="form">
                                <input type="password" placeholder="enter accessKey" className="form-control"
                                    name="accessKey"
                                    value={values.accessKey}
                                    onChange={handleChange}
                                    onBlur={handleBlur} />
                                {touched.accessKey && errors.accessKey ? <div className="text-danger">accessKey cannot be empty</div> : ""}
                            </div>
                        </div>
                        <p className="msg text-danger">Your are not a admin. go back and select student.</p>
                        <p className="text-danger msg2">invalid accessKey</p>
                        <button className="btn bg-success text-white" type="submit">Login</button>

                        <p className="mt-3 sign-btn" onClick={() => navigate("/signup")}>Not admin ? click here</p>
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
export default LoginAsAdmin;