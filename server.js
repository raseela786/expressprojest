const express = require("express");
const app = express();
app.use(express.json());

let todosdata = [];
let currentId = 1;


app.get('/todos', (req, res) => {

    res.json({ data: todosdata });
});

app.post('/todos', (req, res) => {
    const newTodo = { id: currentId++, ...req.body };
    todosdata.push(newTodo);


    res.status(201).json(newTodo);
});

app.get("/todos/:id", (req, res) => {
    const todo = todosdata.filter(t => t.id === parseInt(req.params.id));
    if (!todo)
        return res.status(404).send("Todo not found");
    res.json(todo);
});
app.put("/todos/:id", (req, res) => {
    const todoId = parseInt(req.params.id);
    let updatedTodo = null;
    todosdata = todosdata.map(todo => {
        if (todo.id === todoId) {
            updatedTodo = { ...todo, ...req.body };
            return updatedTodo;
        }
        return todo;
    });

    if (!updatedTodo) {
        return res.status(404).send("Todo not found");
    }

    res.json(updatedTodo);
});

app.delete("/todos/:id", (req, res) => {
    const todoId = parseInt(req.params.id);
    const todoIndex = todosdata.findIndex(todo => todo.id === todoId);

    if (todoIndex === -1) {
        return res.status(404).send("Todo not found");
    }

    const deletedTodo = todosdata.splice(todoIndex, 1);

    res.json(deletedTodo[0]);
});

app.listen(3003, () => {
    console.log("Server running on port 3003");
});
