import { useNavigate } from "react-router-dom";

function StudentBase({children}){
    let navigate = useNavigate();

    function goToLogin(){
        navigate("/");
        localStorage.removeItem("email");
    }
    return (
            <div className="base-div">
            <div className="url-cont">
                <nav className="navbar navbar-expand-lg bg-body-tertiary navbar-light bg-secondary navbr pt-2 pb-3">
                    <div className="container-fluid">
                       
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <h6 className="dash text-light pe-4 rounded text-center ps-4" aria-current="page" onClick={() => navigate("/user/students/all")}>Students</h6>
                                </li>
                                <li className="nav-item">
                                    <h6 className="dash text-light pe-4" aria-current="page" onClick={() => navigate("/user/student/my-dashboard")}>Me</h6>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div>
                    <div className="logout-div d-flex justify-content-end">
                        <button className="btn bg-danger text-white me-2 logout-btn ms-4 mt-2" onClick={goToLogin}>Logout</button>
                    </div>
                    </div>
                </nav>
                <div className="base-main d-flex flex-wrap align-content-center">
                    {children}
                </div>
            </div>
        </div>
    )
}
export default StudentBase;