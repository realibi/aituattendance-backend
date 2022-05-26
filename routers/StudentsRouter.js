const express = require("express");
const models = require("../Models");
const studentsRouter = express.Router();

studentsRouter.get('/', (req, res) => {
    models.Student.find({}, function(err, results){
        if(err) return console.log(err);
        res.send(results);
    });
});

studentsRouter.get('/enrolledCourses/:id', async (req, res) => {
    const studentId = req.params.id;
    let student = await models.Student.findById(studentId);
    res.send(student.enrolledCourses);
});

studentsRouter.post('/', (req, res) => {
    if(!req.body) return res.sendStatus(400);

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();

    const fullName = req.body.fullName;
    const login = req.body.login;
    const password = req.body.password;
    const groupName = req.body.groupName;
    const faceDescriptor = req.body.faceDescriptor;
    const enrolledCourses = [];
    const createdAt = `${year}-${month}-${day}`;

    const student = new models.Student({fullName, login, password, groupName, faceDescriptor, enrolledCourses, createdAt});

    student.save(function(err){
        if(err) return console.log(err);
        res.status(201).send(student);
    });
});

studentsRouter.post('/login', (req, res) => {
    if(!req.body) return res.sendStatus(400);

    const login = req.body.login;
    const password = req.body.password;

    models.Student.findOne({login, password}, function(err, doc){
        if(err) return console.log(err);

        if(doc !== null){
            res.send(doc);
        }else{
            res.send(false);
        }
    });
});

studentsRouter.post('/uploadDescriptor', async (req, res) => {
    if(!req.body) return res.sendStatus(400);

    const studentId = req.body.studentId;
    const faceDescriptor = req.body.faceDescriptor;

    let result = await models
        .Student
        .findOneAndUpdate({_id: studentId}, {faceDescriptor: faceDescriptor});

    res.status(200).send(result);
});

studentsRouter.post('/enrollToCourse', async (req, res) => {
    if(!req.body) return res.sendStatus(400);

    const courseCode = req.body.courseCode;
    const studentId = req.body.studentId;

    let student = await models.Student.findById(studentId);
    let studentEnrolledCoursesArray = student.enrolledCourses;
    let course = await models.Course.findOne({code: courseCode});
    studentEnrolledCoursesArray.push(course);
    let result = await models
        .Student
        .findOneAndUpdate({_id: studentId}, {enrolledCourses: studentEnrolledCoursesArray});

    res.status(200).send(result);
});

module.exports = studentsRouter;
