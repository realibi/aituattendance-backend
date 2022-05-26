const express = require("express");
const models = require("../Models");
const coursesRouter = express.Router();

coursesRouter.get('/', (req, res) => {
    models.Course.find({}, function(err, results){
        if(err) return console.log(err);
        res.send(results);
    });
});

coursesRouter.get('/:id', async (req, res) => {
    models.Course.findById(req.params.id, (err, results) => {
        if(err) return console.log(err);
        res.send(results);
    });
});

coursesRouter.get('/lecturer/:id', async (req, res) => {
    const lecturerId = req.params.id;
    let lecturer = await models.Lecturer.findById(lecturerId);

    models.Course.find({owner: lecturer}, function(err, results){
        if(err) return console.log(err);
        res.send(results);
    });
});

coursesRouter.post('/', (req, res) => {
    if(!req.body) return res.sendStatus(400);

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();

    const title = req.body.title;
    const code = req.body.code;
    const owner = req.body.owner;
    const attendanceDate = currentDate;
    const createdAt = `${year}-${month}-${day}`;

    const course = new models.Course({title, code, attendanceDate, owner, createdAt});

    course.save(function(err){
        if(err) return console.log(err);
        res.status(201).send(course);
    });
});

coursesRouter.post('/setAttendance', async (req, res) => {
    if(!req.body) return res.sendStatus(400);

    const id = req.body.id;
    const newDate = req.body.newDate;

    await models.Course.findByIdAndUpdate(id,{attendanceDate: newDate});

    res.status(200).send('ok');
});

module.exports = coursesRouter;
