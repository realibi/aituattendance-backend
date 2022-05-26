const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const studentsRouter = require("./routers/StudentsRouter");
const lecturersRouter = require("./routers/LecturersRouter");
const coursesRouter = require("./routers/CoursesRouter");
const attendancesRouter = require("./routers/AttendancesRouter");
const app = express();

app.use(cors({
    origin: '*'
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/students', studentsRouter);
app.use('/lecturers', lecturersRouter);
app.use('/courses', coursesRouter);
app.use('/attendances', attendancesRouter);

mongoose.connect("mongodb://localhost:27017/aituattendance",
    {
        useUnifiedTopology: true,
        useNewUrlParser: true
    },
    function(err){
        if(err) return console.log(err);
        const PORT = 3030;
        app.listen(PORT, function(){
            console.log(`Server started on port ${PORT}\nat ${new Date()}`);
        });
    }
);
