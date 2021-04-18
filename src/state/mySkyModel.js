import { action, thunk, thunkOn, computed } from 'easy-peasy';

export const mySkyModel = {
  // MySky State
  userID: null, //only set through setUserID!
  mySky: null,
  loggedIn: computed((state) => !!state.userID),

  // MySky Setters
  setMySky: action((state, { mySky }) => {
    state.mySky = mySky;
  }),
  setValidUserID: action((state, { userID }) => {
    state.userID = userID;
  }),
  setNullUserID: action((state) => {
    state.userID = null;
  }),
  setUserID: thunk((actions, { userID }) => {
    if (userID) {
      actions.setValidUserID({ userID });
    } else {
      actions.setNullUserID();
    }
  }),

  // MySky Thunks
  fetchUserID: thunk(async (actions, { mySky }) => {
    if (mySky) {
      actions.setMySky({ mySky });
      const userID = await mySky.userID();
      if (userID) {
        actions.setUserID({ userID, mySky });
      } else {
        actions.setUserID({ userID: null });
      }
    }
  }),
  logout: thunk(async (actions, { mySky }) => {
    await mySky.logout();
    actions.setUserID({ userID: null });
  }),
  persistTodoState: thunkOn(
    (actions, storeActions) => [
      storeActions.todos.addTodo,
      storeActions.todos.updateTodo,
      storeActions.todos.deleteTodo,
    ],
    async (actions, target, { getStoreState }) => {
      const todos = getStoreState().todos.todoItems;
      const mySky = getStoreState().mySky.mySky;

      if (mySky) {
        console.log('persisting to MySky');
        await mySky.setJSON('localhost/todos', { todos });
      }
    }
  ),
};
