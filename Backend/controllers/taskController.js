//Import Database 
const db = require('../database/database');

// Get all tasks
const getTasks = (req, res) => {
    db.all('SELECT * FROM tasks', [], (err, rows) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
};

// Get task
const getTask = (req, res) => {
    const { id } = req.params;
    db.get('SELECT * FROM tasks WHERE id = ?', [id], (err, row) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({ data: row });
    });
};

// Create task
const createTask = (req, res) => {
    const { title } = req.body;
    db.run('INSERT INTO tasks (title, completed) VALUES (?, 0)', [title], function(err) {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({ id: this.lastID });
    });
};

// Update task 
const updateTask = (req, res) => {
    const { id } = req.params;
    const { title, completed } = req.body;
    db.run('UPDATE tasks SET title = ?, completed = ? WHERE id = ?', [title, completed, id], function(err) {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({ updatedID: id });
    });
};

// Delete task
const deleteTask = (req, res) => {
    const { id } = req.params;
    db.run('DELETE FROM tasks WHERE id = ?', [id], function(err) {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({ deletedID: id });
    });
};

module.exports = {
    getTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask
};
