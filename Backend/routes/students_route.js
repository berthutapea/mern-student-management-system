const router = require('express').Router();
const Student = require('../models/student');
let student = require('../models/student');

//http//localhost:8070/student/add
router.route('/add').post((req, res) => {
  const name = req.body.name;
  const nim = Number(req.body.nim);
  const gender = req.body.gender;

  //send this object through model to mongodb to store it in the database
  const newStudent = new student({
    name,
    nim,
    gender,
  });

  newStudent
    .save()
    .then(() => {
      res.json('Student Added Successfully');
    })
    .catch((err) => console.log(err.message));
});

//https//localhost:8070/get/student/
router.route('/get').get((req, res) => {
  student
    .find()
    .then((students) => {
      res.json(students);
    })
    .catch((err) => console.log(err.message));
});

//https//localhost:8070/student/update/:sid
router.route('/update/:sid').put(async (req, res) => {
  let userID = req.params.sid;
  const { name, nim, gender } = req.body;

  const updateStudent = {
    name,
    nim,
    gender,
  };

  const update = await Student.findByIdAndUpdate(userID, updateStudent)
    .then(() => {
      res.status(200).send({
        status: 'User Updated',
      });
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send({
        status: 'Server Error with updating data',
        error: err.message,
      });
    });
});

//https//localhost:8070/student/delete/:sid
router.route('/delete/:sid').delete(async (req, res) => {
  let uId = req.params.sid;
  await Student.findByIdAndDelete(uId)
    .then(() => {
      res.status(200).send({
        status: 'user Deleted',
      });
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send({
        status: 'Error with deleting user',
        error: err.message,
      });
    });
});

//https//localhost:8070/student/get/:sid
router.route('/get/:sid').get(async (req, res) => {
  const uID = req.params.sid;
  const user = await Student.findById(uID)
    .then((user) => {
      res.status(200).send({
        status: 'User Fetched',
        user,
      });
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send({
        status: 'Error with fetch user',
        error: err.message,
      });
    });
});

module.exports = router;
