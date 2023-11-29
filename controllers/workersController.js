const { Router } = require('express');
const app = Router();

// קריאה מקובץ json:
const fsPromises = require("fs").promises;
const path = require("path");

// פונקציה לקבלת עובד לפי קוד מזהה:
app.get('/workers/:workerId', async (req, res) => {

    const data = await fsPromises.readFile("./dataProject/workers.json");
    const workers = JSON.parse(data);

    const id = Number(req.params.workerId);
    const worker = workers.find(worker => worker.id === id);

    if (!worker) {
        return res.status(404).send('Worker not found');
    }
    res.json(worker);
});

// פונקציה לקבלת עובד לפי תפקיד:
app.get('/query', async (req, res) => {

    const data = await fsPromises.readFile("./dataProject/workers.json");
    const workers = JSON.parse(data);

    const role = req.query.role;
    const name = req.query.name;
    const class_worker = req.query.class;
    const workers_result = workers.filter(worker => worker.role.includes(role) || worker.name.includes(name) || worker.class.includes(class_worker));

    if (workers_result.length < 1) {
        return res.status(200).send(`No workers matched your search`)
    }

    res.json(workers_result);
});

// פונקציה לקבלת כלל העובדים:
app.get('/workers', async (req, res) => {

    const data = await fsPromises.readFile("./dataProject/workers.json")
    const workers = JSON.parse(data);

    if (!workers) {
        return res.status(404).send('Worker not found');
    }
    res.json(workers);
});

module.exports = app;