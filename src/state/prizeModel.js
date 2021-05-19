import { action, thunk, thunkOn } from 'easy-peasy';

export const prizeModel = {
  // Prize State
  loading: false,
  prizeItems: [],
  userID: '',

  // Prize Setters and CRUD operations
  setLoading: action((state, { loading }) => {
    state.loading = loading;
  }),
  setUserID: action((state, { userID }) => {
    state.userID = userID;
  }),
  clearUserID: action((state) => {
    state.userID = '';
  }),
  setLoading: action((state, { isLoading }) => {
    state.loading = isLoading;
  }),
  addPrize: action((state, { prize, description }) => {
    state.prizeItems.push({ prize, sent: false, description });
  }),
  deletePrize: action((state, payload) => {
    state.prizeItems.splice(payload.i, 1);
  }),
  updatePrize: action((state, payload) => {
    state.prizeItems[payload.i].sent = payload.elem.checked;
  }),
  clearPrizes: action((state) => {
    state.prizeItems = [];
  }),
  loadPrizes: action((state, { prizes }) => {
    state.prizeItems = prizes;
  }),

  // Prize Thunks
  getUserPrizes: thunk(async (actions, { userID }, { getStoreState }) => {
    actions.setLoading({ loading: true });
    const mySky = getStoreState().mySky.mySky;
    // const client = mySky.connector.client;

    const path = 'skynet-hackathon.hns/' + userID + '/prizes.json';
    try {
      const { data } = await mySky.getJSON(path);
      if (data.prizes) {
        actions.loadPrizes({ prizes: data.prizes });
        actions.setUserID({ userID });
      } else {
        actions.clearPrizes();
        actions.setUserID({ userID });
      }
    } catch (error) {
      console.error(error);
      actions.setUserID({ userID });
      actions.clearPrizes();
    }
    actions.setLoading({ loading: false });
  }),

  // Todo Thunks
  // onLoginChange: thunkOn(
  //   (actions, storeActions) => storeActions.mySky.setUserID,
  //   async (actions, target) => {
  //     actions.clearPrizes();

  //     // logging in, call loadTodos
  //     if (target.payload.userID) {
  //       actions.setLoading({ isLoading: true });
  //       const mySky = target.payload.mySky;
  //       const { data } = await mySky.getJSON('localhost/todos');
  //       if (data) {
  //         actions.loadTodos({ todos: data.todos });
  //       } else {
  //         await mySky.setJSON('localhost/todos', { todos: [] });
  //       }
  //       actions.setLoading({ isLoading: false });
  //     }
  //   }
  // ),
};
