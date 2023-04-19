import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosBase from "../../axiosBase";

export const getUserTodos = createAsyncThunk(
  "todo/getUserTodo",
  async (userId) => {
    const usersTodo = await axiosBase.get(`/todo/getbyUser/${userId}`);
    // console.log(usersTodo.data);
    return usersTodo.data;
  }
);

// export const updateUSerTodo = createAsyncThunk(
//   "todo/updateUserTodo",
//   async (todoId) => {
//     const updatedTodo = await axiosBase
//       .patch(`/todo/update/${todoId}`)
//       .then((res) => {
//         return res.data;
//       })
//       .catch((err) => {
//         return [];
//       });

//     return await updatedTodo;
//   }
// );
const initialStateData = {
  todos: [],
  loading: false,
  error: false,
  length: 0,
};
const TodoSlice = createSlice({
  name: "todo",
  initialState: initialStateData,
  reducers: {
    CompleteAction(state, action) {
      let copyData = state.todos;
      let indexOfTaskToBeCompleted = copyData.findIndex(
        (task) => task._id === action.payload
      );
      copyData[indexOfTaskToBeCompleted].completed =
        !copyData[indexOfTaskToBeCompleted].completed;
      state.todos = [...copyData];
    },
    LogoutUserData(state, action) {
      state = initialStateData;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getUserTodos.pending, (state, action) => {
        state.loading = true;
        state.todos = [];
        state.length = 1;
      })
      .addCase(getUserTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = action.payload.reverse();
        state.length = state.todos.length;
        state.error = false;
      })
      .addCase(getUserTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.length = 0;
      });
    // .addCase(updateUSerTodo.pending, (state, action) => {
    //   state.loading = true;
    //   state.todos = [];
    //   state.length = 1;
    // })
    // .addCase(updateUSerTodo.fulfilled, (state, action) => {
    //   state.loading = false;
    //   const index = state.todos.findIndex(
    //     (todo) => todo._id === action.payload.updatedTodos._id
    //   );
    //   state.todos[index] = action.payload.updatedTodos;
    //   state.error = false;
    // })
    // .addCase(updateUSerTodo.rejected, (state, action) => {
    //   state.loading = false;
    //   state.error = true;
    //   state.length = 0;
    // });
  },
});
export const { CompleteAction, LogoutUserData } = TodoSlice.actions;
export default TodoSlice;
