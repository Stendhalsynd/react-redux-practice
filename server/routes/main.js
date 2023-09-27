const express = require("express");
const router = express.Router();
const controller = require("../controller/Cmain");

router.get("/todos", controller.getTodos);

router.post("/todo", controller.postTodo);

router.patch("/todo/:todoId", controller.patchTodo);

router.delete("/todo/:todoId", controller.deleteTodo);

module.exports = router;
