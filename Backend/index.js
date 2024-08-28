// index.js
const express = require('express');
const cors = require('cors');
const app = express();
const taskRoute = require('./routes/taskRoute');

app.use(cors({
    origin : "http://localhost:4200"
}));

app.use(express.json());
app.use('/api/tasks', taskRoute);

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
