import {
  action,
  thunk,
  thunkOn,
  computed,
  Action,
  Computed,
  Thunk,
  ThunkOn,
  Actions,
} from "easy-peasy";
import { MySky } from "skynet-js";
import { StoreModel } from "./store";

export interface MySkyModelType {
  userID?: string;
  mySky?: MySky;
  loggedIn: Computed<MySkyModelType, boolean>;
  setMySky: Action<MySkyModelType, { mySky: MySky }>;

  setUserID: Thunk<MySkyModelType, { userID: string; mySky?: MySky }>;

  setValidUserID: Action<MySkyModelType, { userID: string }>;

  setNullUserID: Action<MySkyModelType>;

  fetchUserID: Thunk<MySkyModelType, MySkyModelType>;

  logout: Thunk<MySkyModelType, MySkyModelType>;
  persistTodoState: ThunkOn<MySkyModelType, Actions<StoreModel>, StoreModel>;
  persistHNSEntriesState: ThunkOn<
    MySkyModelType,
    Actions<StoreModel>,
    StoreModel
  >;
}

export const mySkyModel: MySkyModelType = {
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
        console.log("persisting to MySky");
        await mySky.setJSON("localhost/todos", { todos });
      }
    }
  ),
  persistHNSEntriesState: thunkOn(
    (actions, storeActions) => [
      storeActions.hns.addEntry,
      storeActions.hns.updateEntry,
      storeActions.hns.deleteEntry,
    ],
    async (actions, target, { getStoreState }) => {
      const hnsEntries = getStoreState().hns.hnsEntries;
      const mySky = getStoreState().mySky.mySky;

      if (mySky) {
        console.log("persisting HNS entries to MySky");
        await mySky.setJSON("localhost/hnsEntries.json", { hnsEntries });
      }
    }
  ),
};
