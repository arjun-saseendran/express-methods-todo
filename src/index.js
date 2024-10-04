import express from "express";

const port = 6000;
const app = express();
app.use(express.json());

// create todos array
const todos = [];

// create id
let todoId = 1;

// add todo
app.post("/", (req, res) => {
  const { title } = req.body;
  const newTodo = { id: todoId++, title };
  todos.push(newTodo);
  res.send(newTodo);
});
// read todo
app.get("/", (req, res) => {
  res.send(todos);
});

// update todo
app.put("/:id", (req, res) => {
  const { title } = req.body;
  const todo = todos.find((t) => t.id === parseInt(req.params.id));

  if (todo) {
    todo.title = title;
    res.send(todo);
  } else {
    res.send("not found");
  }
});

// delete todo

app.delete("/:id", (req, res) => {
  const deleteTodo = todos.findIndex((t) => t.id === req.params.id);
  todos.splice(deleteTodo, 1);
  res.send("deleted");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
