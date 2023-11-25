import { useEffect, useState } from "react";
import Base from "./base";
import { useNavigate } from "react-router-dom";





function ViewStudents() {
    let navigate = useNavigate();
    let [show, setShow] = useState(false);
    let [allStudent, setAllStudent] = useState([]);
    useEffect(() => {
        getAllStudents();
    }, []);


    async function editStud(id){
        navigate(`/admin/student/edit/${id}`)
    }
    async function deleteStudfromDb(id){

        let afterDelete = allStudent.filter((val)=>val._id!==id);
        let result = await fetch(`https://forgotpassword-mbwj.onrender.com/access/student/delete/${id}`,{
            method:"DELETE",
            headers:{
                "content-type": "application/json"
            }
        })
        let output = await result.json();
        if(output.msg==="deleted success"){
            setAllStudent(afterDelete);
            alert("successfully deleted");
           
        }
    }

    async function getAllStudents() {
        setShow(true);
        let result = await fetch("https://forgotpassword-mbwj.onrender.com/access/students/all", {
            method: "GET",
            headers: {
                "content-type": "application/json"
            }
        })
        let studentsData = await result.json();
        setShow(false);
        setAllStudent(studentsData.data);
    }
    return (
        <div className="add-dtud-div">
            
            <Base>
            <p className="fs-5 p-2">Your can find all students data below.</p>
                <div className="show-students d-flex jutify-content-center align-items-start flex-wrap">
                    {allStudent.map((stud, ind) => (
                        <div className="stud d-flex flex-column justify-content-start align-items-start bg-white p-5" key={ind}>
                            <div className="stud-img mb-4">
                                <img src={`data:image/jpeg;base64,${stud.photo}`} alt={stud.name}/>
                            </div>
                            <div lassName="mt-3">
                                    <tr>
                                    <th><p><small className="text-uppercase fw-bolder me-2">Name: </small></p></th>
                                    <td><p><span className="me-1">{stud.firstname}</span><span>{stud.lastname}</span></p></td>
                                    </tr>
                                </div>
                            <div className="stud-others d-flex flex-column justify-content-between align-items-start">
                                <div className="d-flex justify-content-between flex-column">
                                <div>
                                    <tr>
                                    <th><p><small className="text-uppercase fw-bolder me-2">Email: </small></p></th>
                                    <td><p>{stud.email}</p></td>
                                    </tr>
                                </div>
                                <div>
                                <tr>
                                    <th><p><small className="text-uppercase fw-bolder me-2">Age: </small></p></th>
                                    <td><p>{stud.age}</p></td>
                                    </tr>
                                </div>
                                <div>
                                <tr>
                                    <th><p><small className="text-uppercase fw-bolder me-2">Phone: </small></p></th>
                                    <td><p>{stud.number}</p></td>
                                    </tr>
                                </div>
                                <div>
                                <tr>
                                    <th><p><small className="text-uppercase fw-bolder me-2">Joined date: </small></p></th>
                                    <td><p>{stud.dob}</p></td>
                                    </tr>
                                </div>
                                <div>
                                <tr>
                                    <th><p><small className="text-uppercase fw-bolder me-2">College: </small></p></th>
                                    <td><p>{stud.college}</p></td>
                                    </tr>
                                </div>
                                <div>
                                <tr>
                                    <th><p><small className="text-uppercase fw-bolder me-2">Gender: </small></p></th>
                                    <td><p>{stud.gender}</p></td>
                                    </tr>
                                </div>
                                <div>

                                    <p><small className="text-uppercase fw-bolder me-2">about</small></p>
                                    <p>{stud.about}</p>
                                </div>
                                
                            </div>
                            <div className="d-flex justify-content-between btns-div">
                                    <button className="btn bg-info text-white" onClick={()=>editStud(stud._id)}>Edit</button>
                                    <button className="btn bg-danger text-white " onClick={()=>deleteStudfromDb(stud._id)}>Delete</button>
                                    </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Base>
            {show && <div className="spin">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>}
        </div>
    )
}
export default ViewStudents;