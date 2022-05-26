# AITUattendance API

API for AITUattendance diploma project.

## Contents:
- Prerequirements
- Get Started
- Used tools
- Object models
- Examples

## Prerequirements
Make sure that you have  installed:
- Node.js 14+
- Mongodb 4.0+
- Mongo Compass
- Git command utility

## Get Started
First of all, you should clone the project, install all dependencies and run the application. Make sure that you have installed Node.js v14+.

#### Clone the project from github repo
```bash
git clone https://github.com/realibi/aituattendance-backend
```

#### Go to downloaded folder
```bash
cd aituattendance-backend
```

#### Install the dependencies
```bash
npm install
```

#### Set the connection string for mongodb database in app.js
```bash
23. mongoose.connect("mongodb://localhost:27017/aituattendance")...
```

#### Start the application
```bash
node app.js
```

#### That's it!
You will see the output in terminal (example):
```bash
Server started on port 3030
at Thu May 26 2022 08:20:21 GMT+0600 (East Kazakhstan Time)
```

## Used tools
The project was built with help of these technologies:
- [Node JS](https://nodejs.org/en/) - JavaScript runtime built on Chrome's V8 JavaScript engine.
- [Express](http://expressjs.com/) - Fast, unopinionated, minimalist web framework for Node.js
- [Mongoose](https://mongoosejs.com/) - elegant mongodb object modeling for node.js
- [BodyParser](https://www.npmjs.com/package/body-parser) - Node.js body parsing middleware.
- [Cors](https://www.npmjs.com/package/cors) - node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.

## Object models

#### Lecturer:
- fullName: String,
- login: String,
- password: String,
- createdAt: Date

#### Course:
- title: String,
- code: String,
- owner: Lecturer,
- attendanceDate: Date,
- createdAt: Date

#### Student:
- fullName: String,
- login: String,
- password: String,
- groupName: String,
- faceDescriptor: Object,
- enrolledCourses: Course,
- createdAt: Date

#### Attendance:
- student: Student,
- course: Course,
 createdAt: Date

## Examples
Application provides various endpoints handling GET and POST queries.
The list of possible routes:
- /students
- /lecturers
- /courses
- /attendances

Here are some examples of results:

#### Student
```bash
GET /students – retrieving all students from database
```

```bash
GET /students/enrolledCourses/:studentId – retrieving all enrolled courses of exact student by id
```

```bash
POST /students data{fullName, login, password, groupName, faceDescriptor} – creating new student
```

#### Student
```bash
GET /students – retrieving all students from database
```

```bash
GET /students/enrolledCourses/:studentId – retrieving all enrolled courses of exact student by id
```

```bash
POST /students data{fullName, login, password, groupName, faceDescriptor} – creating new student
```

#### Lecturer
```bash
GET /lecturers – retrieving all lecturers from database
```

```bash
GET /lecturers/login – authorization endpoint for lecturer
```

```bash
POST /lecturers data{fullName, login, password, createdAt} – creating new lecturer
```

#### Attendance
```bash
GET /attendances – retrieving all attendances from database
```

```bash
GET /attendances/course/:courseId – retrieving the participants list of exact course
```

```bash
POST /attendances data{student, course} – creating new attendance
```
