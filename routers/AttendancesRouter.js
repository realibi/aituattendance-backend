const express = require("express");
const models = require("../Models");
const attendancesRouter = express.Router();

attendancesRouter.get('/', (req, res) => {
    models.Attendance.find({}, function(err, results){
        if(err) return console.log(err);
        res.send(results);
    });
});

attendancesRouter.post('/', async (req, res) => {
    if(!req.body) return res.sendStatus(400);

    const student = req.body.student;
    const course = req.body.course;
    const createdAt = new Date();

    const attendance = new models.Attendance({student, course, createdAt});
    const similarAttendance = await models.Attendance.findOne({course: course, student: student});

    if(similarAttendance === null){
        attendance.save(function(err){
            if(err) return console.log(err);
            res.status(201).send(course);
        });
    }else{
        res.status(200).send('Already attended');
    }
});

attendancesRouter.get('/course/:courseId', async (req, res) => {
    const courseId = req.params.courseId;
    let course = await models.Course.findById(courseId);

    models.Attendance.find({course: course}, function(err, results){
        if(err) return console.log(err);
        res.send(results);
    });
});

module.exports = attendancesRouter;
