import { useNavigate } from "react-router-dom";
import StudentBase from "./studBase";
import { useEffect, useState } from "react";

function CurrentStudent() {
    let [show, setShow] = useState(false);

    let email = localStorage.getItem("email");

    let navigate = useNavigate()
    let [allStudent, setAllStudent] = useState([]);
    useEffect(() => {
        getAllStudents();
    }, []);

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

    let findStud = allStudent.filter((stud) => stud.email == email);
    return (
        <div className="curent-stud-div">
            <StudentBase>
                <p className="fs-5 p-2">Your dashboard</p>
                <div className="show-students d-flex jutify-content-center align-items-start flex-wrap align-content-center">
                    {findStud.map((stud, ind) => (
                        <div className="stud1 d-flex flex-column justify-content-start align-items-start bg-white p-5 flex-wrap" key={ind}>
                            <div className="stud-img mb-4">
                                <img src={`data:image/jpeg;base64,${stud.photo}`} alt={stud.name} />
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
                            </div>
                        </div>
                    ))}
                </div>
            </StudentBase>
            {show && <div className="spin">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>}
        </div>
    )
}
export default CurrentStudent;