const express = require("express");
const models = require("../Models");
const lecturersRouter = express.Router();

lecturersRouter.get('/', (req, res) => {
    models.Lecturer.find({}, function(err, results){
        if(err) return console.log(err);
        res.send(results);
    });
});

lecturersRouter.post('/', (req, res) => {
    if(!req.body) return res.sendStatus(400);

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();

    const fullName = req.body.fullName;
    const login = req.body.login;
    const password = req.body.password;
    const createdAt = `${year}-${month}-${day}`;

    const lecturer = new models.Lecturer({fullName, login, password, createdAt});

    lecturer.save(function(err){
        if(err) return console.log(err);
        res.status(201).send(lecturer);
    });
});

lecturersRouter.post('/login', (req, res) => {
    if(!req.body) return res.sendStatus(400);
    const login = req.body.login;
    const password = req.body.password;

    models.Lecturer.findOne({login, password}, function(err, doc){
        if(err) return console.log(err);

        if(doc !== null){
            res.send(doc);
        }else{
            res.send(false);
        }
    });
});

module.exports = lecturersRouter;
