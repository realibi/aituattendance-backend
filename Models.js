const mongoose = require("mongoose");
const schemas = require("./Schemas");

let Student = mongoose.model("Student", schemas.StudentSchema);
let Lecturer = mongoose.model("Lecturer", schemas.LecturerSchema);
let Course = mongoose.model("Course", schemas.CourseSchema);
let Attendance = mongoose.model("Attendance", schemas.AttendanceSchema);

module.exports = {
    Student,
    Lecturer,
    Course,
    Attendance
}
