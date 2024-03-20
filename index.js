const express = require('express');
const db = require('./db');
const bodyParser = require('body-parser');
const employeeRouter = require('./controllers/employee_controller');

const app = express();

//middleware
app.use(bodyParser.json());
app.use('/api/employees', employeeRouter);


//server intializing
app.listen(3005, () => {
    console.log("server started on port " + 3005);
    db.query("SELECT 1")
        .then(() => console.log("db connected successfully"))
        .catch(err => console.log("db connection failed" + err));
});