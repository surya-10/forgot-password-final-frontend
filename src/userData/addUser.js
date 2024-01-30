import axios from "axios";
import { useState } from "react";
import Base from "../admincontrols/base";
import { useNavigate } from "react-router-dom";

const UserData = () =>{
    let navigate = useNavigate();
    let [show, setShow] = useState(false);
    let [add, setAdd] = useState("Add");
    let [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        age: '',
        dob: '',
        college: '',
        about: '',
        number: '',
        gender: '',
        photo: null,
    });
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    async function handleImage(e) {
        setFormData({ ...formData, photo: e.target.files[0] });
    }

    const handleSubmit = async (e)=>{
        setShow(true);
        setAdd("Adding");
        e.preventDefault();
        const dataToSend = new FormData();
        dataToSend.append('firstname',formData.firstname);
        dataToSend.append('lastname', formData.lastname);
        dataToSend.append('email', formData.email);
        dataToSend.append("age", formData.age);
        dataToSend.append("dob", formData.dob);
        dataToSend.append("college", formData.college);
        dataToSend.append("number", formData.number);
        dataToSend.append("gender", formData.gender);
        dataToSend.append("about", formData.about);
        dataToSend.append("photo", formData.photo);

        try {
            let result = await axios.post('https://forgotpassword-mbwj.onrender.com/add/user', dataToSend);
            if(result.data.status==201){
                setShow(false);
                alert("student data created");
                navigate("/admin/auth/all")
            }
            if(result.data.status==404){
                alert("student data already exist");
                setAdd("Add");
            }
            setAdd("Add");
          } catch (error) {
            console.error('Error submitting form:', error);
            alert('Error submitting form. Please try again.');
          }

    }
    return (
        <div className="add-div">
            <Base>
            <div className="container d-flex justify-content-center align-items-center min-vh-100 flex-column mt-5">
                <div className="d-flex align-self-center">
                    <p className="fs-6 tx-prim fw-bold head">As you are admin of our college, you have to add students data.</p>
                </div>
                <div className="form-div d-flex flex-column justify-content-center align-items-center">

                    <div className="form1">
                        <form onSubmit={handleSubmit}>
                            <div className="form-inside">
                                <p className="fs-5 add-title">Add New Student</p>
                                <div className="names d-flex flex-column flex-lg-row">

                                    <div className="f-name d-flex flex-column justify-content-start align-items-start">
                                        <label><small className="text-uppercase fw-bolder mb-2">First name</small></label>
                                        <input type="text" placeholder="First name" className="form-control"
                                            name="firstname"
                                            value={formData.firstname}
                                            onChange={handleChange} required
                                        />
                                    </div>
                                    <div className="l-name d-flex flex-column justify-content-start align-items-start">
                                        <label><small className="text-uppercase fw-bolder mb-2">Last name</small></label>
                                        <input type="text" placeholder="Last name" className="form-control"
                                            name="lastname"
                                            value={formData.lastname}
                                            required
                                            onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="names d-flex flex-column flex-lg-row">

                                    <div className="f-name d-flex flex-column justify-content-start align-items-start">
                                        <label><small className="text-uppercase fw-bolder mb-2">Email</small></label>
                                        <input type="email" placeholder="email id" className="form-control"
                                            name="email"
                                            value={formData.email}
                                            required
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="l-name d-flex flex-column justify-content-start align-items-start">
                                        <label><small className="text-uppercase fw-bolder mb-2">Phone number</small></label>
                                        <input type="text" placeholder="phone number" className="form-control"
                                            name="number"
                                            value={formData.number}
                                            required
                                            onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="names d-flex flex-column flex-lg-row">

                                    <div className="f-name d-flex flex-column justify-content-start align-items-start">
                                        <label><small className="text-uppercase fw-bolder mb-2">Age</small></label>
                                        <input type="text" placeholder="age" className="form-control"
                                            name="age"
                                            value={formData.age}
                                            required
                                            onChange={handleChange} />
                                    </div>
                                    <div className="l-name d-flex flex-column justify-content-start align-items-start">
                                        <label><small className="text-uppercase fw-bolder mb-2">Joined Date</small></label>
                                        <input type="date" placeholder="phone number" className="form-control"
                                            name="dob"
                                            value={formData.dob}
                                            required
                                            onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="d-flex flex-column align-items-start">
                                    <label><small className="text-uppercase fw-bolder mb-2">College name</small></label>
                                    <input type="text" placeholder="college name" className="form-control"
                                        name="college"
                                        value={formData.college}
                                        required
                                        onChange={handleChange} />
                                </div>
                                <div className="d-flex flex-column align-items-stretch">
                                    <select name="gender" value={formData.gender} onChange={handleChange} required>
                                        <option value="">Select Gender</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                                <div className="form-floating">
                                    <textarea className="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style={{ height: 100 + "px" }}
                                        name="about"
                                        value={formData.about}
                                        required
                                        onChange={handleChange}></textarea>
                                    <label htmlFor="floatingTextarea2">About student</label>
                                </div>
                                <div className="upload-img d-flex justify-content-start align-items-start flex-column">
                                    <label><small className="text-uppercase fw-bolder mb-5">Student image - required   size: less than 4MB</small></label>
                                    <div className="input-group mb-3 mt-2">
                                        <input type="file" className="form-control" id="inputGroupFile02" accept="image/*" required
                                            name="image"
                                            onChange={handleImage} />
                                        <label className="input-group-text" htmlFor="inputGroupFile02">Upload</label>
                                    </div>
                                </div>
                                <div className="add-btn">
                                    <button className="btn bg-success text-white" type="submit">{add}</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

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
export default UserData;