import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const ShowOne = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState({});

  useEffect(() => {
    const getUser = () => {
      axios.get(`https://sttiss-api.vercel.app/student/get/${id}`).then((res) => {
        setUser(res.data.user);
      });
    };
    getUser();
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    axios
      .put(`https://sttiss-api.vercel.app/student/update/${id}`, user)
      .then(() => {
        Swal.fire({
          title: "Do you want to save the changes?",
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: "Save",
          denyButtonText: `Don't save`,
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire("Saved!", "", "success");
            navigate("/");
          } else if (result.isDenied) {
            Swal.fire("Changes are not saved", "", "info");
          }
        });
      })
      .catch((err) => Swal.fire("Not Updated", err.message, "error"));
  };

  return (
    <div className="container p-5">
      <form>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={user.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="nim">Nim</label>
          <input
            type="text"
            className="form-control"
            id="nim"
            name="nim"
            value={user.nim}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="gender">Gender</label>
          <select
            className="form-control"
            id="gender"
            name="gender"
            value={user.gender}
            onChange={handleInputChange}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <br />
        <button onClick={handleFormSubmit} className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ShowOne;
