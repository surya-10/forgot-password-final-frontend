import { useNavigate } from "react-router-dom";

function AdminControl(){
    let navigate = useNavigate();
    return (
        <div className="admin-div">
            <div className="container d-flex justify-content-center align-items-center min-vh-100 flex-column pb-2">
                <div className="role-page">
                <p className="fs-4 mb-3">Select your role</p>
                <div className="role pb-2">
                    <button className="btn bg-danger text-white" onClick={()=>navigate("/admin-login")}>Admin</button>
                    <button className="btn bg-success  text-white" onClick={()=>navigate("/login")}>Student</button>
                </div>
            </div>
            </div>
        </div>
    )
}
export default AdminControl;