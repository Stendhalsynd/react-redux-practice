import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

let initialState = {
  todos: [
    // { id: 0, text: "Learn React", completed: true },
    // { id: 1, text: "Learn Redux", completed: false },
  ],
};

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  try {
    const response = await axios.get("http://localhost:8000/todos");
    let dbTodos = response.data.map((todoData) => ({
      id: todoData.id - 1,
      text: todoData.title,
      completed: todoData.done === 1,
    }));
    return dbTodos;
  } catch (error) {
    console.error("error fetching todos : ", error);
    return [];
  }
});

export const todoAdded = createAsyncThunk(
  "todos/todoAdded",
  async (payload, { dispatch }) => {
    try {
      const requestData = {
        title: payload,
        done: 0,
      };

      const response = await axios.post(
        "http://localhost:8000/todo",
        requestData
      );

      if (response.result)
        dispatch(
          todosSlice.actions.addTodo({
            text: payload,
            completed: false,
          })
        );
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  }
);

export const editTodo = createAsyncThunk(
  "todos/editTodo",
  async ({ id, newText, completed }, { dispatch, getState }) => {
    const currentState = getState();
    const isDone = currentState.todos.todos.find(
      (todo) => todo.id === id
    ).completed;

    try {
      const response = await axios.patch(
        `http://localhost:8000/todo/${id + 1}`,
        {
          title: newText,
          done: isDone ? 1 : 0,
        }
      );

      if (response.data.result) {
        dispatch(
          todosSlice.actions.editTodoState({
            id,
            text: newText,
            completed,
          })
        );
      }
    } catch (error) {
      console.error("Error editing todo:", error);
      throw error;
    }
  }
);

export const deleteTodo = createAsyncThunk("todos/deleteTodo", async (id) => {
  try {
    await axios.delete(`http://localhost:8000/todo/${id + 1}`);
    return id + 1;
  } catch (error) {
    console.error("Error deleting todo:", error);
    throw error;
  }
});

export const todoDeleted = createAsyncThunk(
  "todos/todoDeleted",
  async (id, { dispatch }) => {
    try {
      await dispatch(deleteTodo(id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  }
);

const removeTodoById = (state, id) => {
  state.todos = state.todos.filter((todo) => todo.id !== id);
};

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    todoToggled: (state, action) => {
      const toggledTodo = state.todos.find(
        (todo) => todo.id === action.payload
      );
      if (toggledTodo) {
        toggledTodo.completed = !toggledTodo.completed;
      }
    },
    todoDeleted: (state, action) => {
      // state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      removeTodoById(state, action.payload);
    },
    allCompleted: (state) => {
      state.todos = state.todos.map((todo) => ({
        ...todo,
        completed: true,
      }));
    },
    completedCleared: (state) => {
      state.todos = state.todos.filter((todo) => !todo.completed);
    },
    addTodo: (state, action) => {
      state.todos.push(action.payload);
    },
    editTodoState: (state, action) => {
      const { id, text, completed } = action.payload;
      state.todos = state.todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            text,
            completed,
          };
        }
        return todo;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.todos = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        console.error("Error fetching todos:", action.error);
      });
  },
});

export const maxId = (todos) =>
  todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1;

export const todos = (state) => state.todos;

export const completedTodos = (state) =>
  state.todos.filter((todo) => todo.completed === true);

export const { todoToggled, allCompleted, completedCleared } =
  todosSlice.actions;

export default todosSlice.reducer;
