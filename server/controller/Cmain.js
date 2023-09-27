const model = require("../model/Model");

const getTodos = (req, res) => {
  model.db_getTodos(undefined, (result) => {
    res.json(result);
  });
};

const postTodo = (req, res) => {
  model.db_postTodo(req.body, () => {
    res.json({ result: true });
  });
};

const patchTodo = (req, res) => {
  const id = req.params.todoId;
  const { title, done } = req.body;

  model.db_update({ id, title, done }, () => {
    res.json({ result: true });
  });
};

const deleteTodo = (req, res) => {
  const id = req.params.todoId;

  model.db_delete({ id }, () => {
    res.json({ result: true });
  });
};

module.exports = {
  getTodos,
  postTodo,
  patchTodo,
  deleteTodo,
};
