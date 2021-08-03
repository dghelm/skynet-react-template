import { action, thunk, thunkOn } from 'easy-peasy';
import { parseSkylink } from 'skynet-js';
import { dataDomain } from './SkynetContext';

export const hnsModel = {
  // Todo State
  loading: false,
  hnsEntries: [],

  // Todo Setters and CRUD operations
  setLoading: action((state, { isLoading }) => {
    state.loading = isLoading;
  }),
  addEntry: action((state, { hnsName, dataLink, entryLink }) => {
    state.hnsEntries.push({ hnsName, dataLink, entryLink });
  }),
  deleteEntry: action((state, payload) => {
    state.hnsEntries.splice(payload.i, 1);
  }),
  updateEntry: action((state, payload) => {
    state.hnsEntries[payload.i].done = payload.elem.checked;
  }),
  clearEntries: action((state, payload) => {
    state.hnsEntries = [];
  }),
  loadEntries: action((state, { hnsEntries }) => {
    state.hnsEntries = hnsEntries;
  }),

  // Todo Thunks
  createEntry: thunk(
    async (
      actions,
      { hnsName, dataLink },
      { getStoreState, getStoreActions }
    ) => {
      const mySky = getStoreState().mySky.mySky;
      const { throwError } = getStoreActions().ui;
      const client = mySky.connector.client;

      const filteredHNS = hnsName;

      // double check entry -- this should get caught by form validation
      let filteredDataLink = parseSkylink(dataLink);
      if (!filteredDataLink) {
        throwError({
          action: 'createEntry',
          message: 'Unable to parse provided Skylink',
        });
        return;
      }
      const path = dataDomain + '/sites/' + filteredHNS;

      const v2 = await mySky.getEntryLink(path);
      const pathUrl = await client.getSkylinkUrl(v2, { subdomain: true });
      console.log('v2', v2, pathUrl);

      // await mySky.setJSON(path, { test: true });
      // console.log('wrote', path, 'test');
      await mySky.setDataLink(path, dataLink);
      console.log('wrote', path, dataLink);

      const entryLink = v2;

      actions.addEntry({
        hnsName: filteredHNS,
        dataLink: filteredDataLink,
        entryLink: entryLink,
      });
    }
  ),
  onLoginChange: thunkOn(
    (actions, storeActions) => storeActions.mySky.setUserID,
    async (actions, target) => {
      actions.clearEntries();

      // logging in, call loadTodos
      if (target.payload.userID) {
        actions.setLoading({ isLoading: true });
        const mySky = target.payload.mySky;
        const { data } = await mySky.getJSON(dataDomain + '/hnsEntries.json');
        if (data) {
          actions.loadEntries({ hnsEntries: data.hnsEntries });
        } else {
          await mySky.setJSON(dataDomain + '/hnsEntries.json', {
            hnsEntries: [],
          });
        }
        actions.setLoading({ isLoading: false });
      }
    }
  ),
};
