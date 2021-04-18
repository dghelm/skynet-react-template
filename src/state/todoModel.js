import { action, thunkOn } from 'easy-peasy';

export const todoModel = {
  // Todo State
  loading: false,
  todoItems: [],

  // Todo Setters and CRUD operations
  setLoading: action((state, { isLoading }) => {
    state.loading = isLoading;
  }),
  addTodo: action((state, { text, done }) => {
    state.todoItems.push({ text, done });
  }),
  deleteTodo: action((state, payload) => {
    state.todoItems.splice(payload.i, 1);
  }),
  updateTodo: action((state, payload) => {
    state.todoItems[payload.i].done = payload.elem.checked;
  }),
  clearTodos: action((state, payload) => {
    state.todoItems = [];
  }),
  loadTodos: action((state, { todos }) => {
    state.todoItems = todos;
  }),

  // Todo Thunks
  onLoginChange: thunkOn(
    (actions, storeActions) => storeActions.mySky.setUserID,
    async (actions, target) => {
      actions.clearTodos();

      // logging in, call loadTodos
      if (target.payload.userID) {
        actions.setLoading({ isLoading: true });
        const mySky = target.payload.mySky;
        const { data } = await mySky.getJSON('localhost/todos');
        if (data) {
          actions.loadTodos({ todos: data.todos });
        } else {
          await mySky.setJSON('localhost/todos', { todos: [] });
        }
        actions.setLoading({ isLoading: false });
      }
    }
  ),
};
