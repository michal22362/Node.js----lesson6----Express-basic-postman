const express = require('express');
const app = express();

const workers = require('./controllers/workersController.js');
const courses = require('./controllers/coursesController.js');

app.get('/',(req,res)=>{
    res.send('welcome to manager courses!!!');
});

app.listen(8000, () => {
    console.log('server is listening on port 5000');
});

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

app.use(workers);
app.use(courses);