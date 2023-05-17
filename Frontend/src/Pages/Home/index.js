import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { FaRegEdit } from 'react-icons/fa'
import { BsTrash3 } from 'react-icons/bs'
import NoStudent from "../../Components/NoStudent";


export default function Home() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const getStudents = () => {
      axios
        .get("https://sttiss-api.vercel.app/student/get")
        .then((res) => {
          setStudents(res.data);
        })
        .catch((err) => alert(err.message));
    };
    getStudents();
  }, []);

  const deleteUser = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`https://sttiss-api.vercel.app/student/delete/${id}`)
          .then((res) => {
            Swal.fire("Deleted!", res.data.status, "success");
            //update table after deleting
            const updatedStudents = students.filter(
              (student) => student._id !== id
            );
            setStudents(updatedStudents);
          })
          .catch((err) => {
            Swal.fire("Not Deleted!", err.message, "error");
          });
      }
    });
  };

  return (
    <div className="text-center mb-4">
      <h5 style={{ textAlign: "center", padding: "3rem" }}>Students Attendance Sekolah Tinggi Teknologi Informatika Sony Sugema</h5>
      <Link to="/add-student">
        <div className="col-4">
          <button className="btn btn-primary" type="submit">
            Add Student
          </button>
        </div>
      </Link > 
      <div className="container">
        {students.length > 0 ? (
          <table className="table ">
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col">Name</th>
                <th scope="col">Nim</th>
                <th scope="col">Gender</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            {students.map((item, count = 0) => (
              <tbody>
                <tr>
                  <td style={{ color: "red" }}>{count + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.nim}</td>
                  <td>{item.gender}</td>
                  <td>
                    <Link to={`/get/${item._id}`} className="btn btn-primary">
                      <FaRegEdit className="d-flex align-items-center justify-content-center" />
                    </Link>
                    {" "}
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => deleteUser(item._id)}
                    >
                      <BsTrash3 className="d-flex align-items-center justify-content-center" />
                    </button>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        ) : (
          <NoStudent />
        )}
      </div>
    </div>
  );
}
