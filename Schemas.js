const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LecturerSchema = new Schema({
    fullName: String,
    login: String,
    password: String,
    createdAt: Date
})

const CourseSchema = new Schema({
    title: String,
    code: String,
    owner: LecturerSchema,
    attendanceDate: Date,
    createdAt: Date
})

const StudentSchema = new Schema({
    fullName: String,
    login: String,
    password: String,
    groupName: String,
    faceDescriptor: [Object],
    enrolledCourses: [CourseSchema],
    createdAt: Date
})

const AttendanceSchema = new Schema({
    student: StudentSchema,
    course: CourseSchema,
    createdAt: Date
})

module.exports = {
    StudentSchema,
    LecturerSchema,
    CourseSchema,
    AttendanceSchema
}
