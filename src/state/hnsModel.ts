import { Action, action, Thunk, thunk, ThunkOn, thunkOn } from "easy-peasy";
import { parseSkylink } from "skynet-js";
import { StoreModel } from "./store";

export interface HnsModelType {
  loading: boolean;
  hnsEntries: Array<any>;
  setLoading: Action<HnsModelType, { isLoading: boolean }>;
  addEntry: Action<
    HnsModelType,
    { hnsName: string; dataLink: string; entryLink: string }
  >;
  deleteEntry: Action<HnsModelType, { i: number }>;
  updateEntry: Action<HnsModelType, { i: number; elem: { checked: boolean } }>;
  clearEntries: Action<HnsModelType>;
  loadEntries: Action<HnsModelType, { hnsEntries: Array<any> }>;
  createEntry: Thunk<
    HnsModelType,
    { hnsName: string; dataLink: string },
    any,
    Pick<StoreModel, "ui" | "mySky">
  >;

  onLoginChange: ThunkOn<HnsModelType, any, Pick<StoreModel, "mySky">>;
}

export const hnsModel: HnsModelType = {
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
  clearEntries: action((state, _payload) => {
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

      if (mySky) {
        const filteredHNS = hnsName;

        // double check entry -- this should get caught by form validation
        let filteredDataLink = parseSkylink(dataLink);
        if (!filteredDataLink) {
          throwError({
            action: "createEntry",
            message: "Unable to parse provided Skylink",
          });
          return;
        }

        const entryLink = "v2 Skylink soon";

        actions.addEntry({
          hnsName: filteredHNS,
          dataLink: filteredDataLink,
          entryLink: entryLink,
        });
      }
    }
  ),
  onLoginChange: thunkOn(
    (_actions, storeActions) => storeActions.mySky.setUserID,
    async (actions, target) => {
      actions.clearEntries();

      // logging in, call loadTodos
      if (target.payload.userID) {
        actions.setLoading({ isLoading: true });
        const mySky = target.payload.mySky;
        if (mySky) {
          const response = await mySky.getJSON("localhost/todos");
          const jsonResponse = response?.data;
          if (jsonResponse?.hnsEntries) {
            const { hnsEntries }: Pick<HnsModelType, "hnsEntries"> = {
              hnsEntries: jsonResponse?.hnsEntries as any[],
            };
            if (hnsEntries) {
              actions.loadEntries({ hnsEntries });
            }
          } else {
            await mySky.setJSON("localhost/hnsEntries.json", {
              hnsEntries: [],
            });
          }
          actions.setLoading({ isLoading: false });
        }
      }
    }
  ),
};
