const { Router } = require('express');
const app = Router();

const fsPromises = require("fs").promises;
const path = require("path");


app.get('/courses/:courseId', async (req, res) => {

    const data = await fsPromises.readFile("./dataProject/courses.json");
    const courses = JSON.parse(data);
    
    const id = Number(req.params.courseId);
    const course = courses.find(course => course.id === id);

        if (!course) {
        return res.status(404).send('Course not found');
    }
    res.json(course);
})

app.get('/courses', async (req, res) => {

    const data = await fsPromises.readFile("./dataProject/courses.json")
    const courses = JSON.parse(data);

        if (!courses) {
        return res.status(404).send('Worker not found');
    }
    res.json(courses);
})

module.exports = app;