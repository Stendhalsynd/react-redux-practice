import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import {
  todoToggled,
  todoDeleted,
  allCompleted,
  completedCleared,
  todos,
  fetchTodos,
  editTodo,
} from "./todosSlice";
import {
  statusFilterChanged,
  filterStatus,
  StatusFilters,
} from "../filters/filtersSlice";
import {
  InputStyle,
  titleStyle,
  itemContainerStyle,
  footerContainerStyle,
} from "./style";

import TodoForm from "./TodoForm";

export function Todo() {
  const dispatch = useDispatch();
  const todoList = useSelector(todos).todos;
  const currentStatus = useSelector(filterStatus);
  const [todoInput, setTodoInput] = useState("");
  const [editingTodoId, setEditingTodoId] = useState(null);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const resultTodos = (currentStatus) => {
    switch (currentStatus) {
      case StatusFilters.Active:
        return todoList.filter((todo) => todo.completed === false);
      case StatusFilters.Completed:
        return todoList.filter((todo) => todo.completed === true);
      default:
        return todoList;
    }
  };

  return (
    <>
      <div style={titleStyle}>TODO 앱 만들기</div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "10px",
        }}
      >
        {<TodoForm dispatch={dispatch} />}
      </div>
      <ul>
        {resultTodos(currentStatus).map((todo) => (
          <li key={todo.id} style={itemContainerStyle}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => dispatch(todoToggled(todo.id))}
              id={todo.id}
            />
            <label htmlFor={todo.id} style={{ padding: "5px" }}>
              <InputStyle
                type="text"
                value={editingTodoId === todo.id ? todoInput : todo.text}
                onClick={() => {
                  setEditingTodoId(todo.id);
                  setTodoInput(todo.text);
                }}
                onChange={(e) => setTodoInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    dispatch(
                      editTodo({
                        id: todo.id,
                        newText: todoInput,
                        completed: todo.completed,
                      })
                    );
                    setEditingTodoId(null);
                    setTodoInput("");

                    e.target.blur();
                  }
                }}
              />
            </label>
            <button
              onClick={() => {
                dispatch(todoDeleted(todo.id));
              }}
            >
              x
            </button>
          </li>
        ))}
      </ul>

      <div style={footerContainerStyle}>
        <div>
          <button onClick={() => dispatch(allCompleted())}>
            모두 체크하기
          </button>
          <button onClick={() => dispatch(completedCleared())}>
            완료한 일 모두 삭제하기
          </button>
        </div>

        <select
          name="status"
          onChange={(e) => {
            dispatch(statusFilterChanged(e.target.value));
          }}
          value={currentStatus}
        >
          <option value="all">모두 보기</option>
          <option value="active">할 일 보기</option>
          <option value="completed">완료한 일 보기</option>
        </select>
      </div>
    </>
  );
}
