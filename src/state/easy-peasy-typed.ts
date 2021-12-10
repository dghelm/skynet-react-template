import { createTypedHooks } from "easy-peasy";
import { StoreModel } from "./store";

const typedHooks = createTypedHooks<StoreModel>();

const useStoreActions = typedHooks.useStoreActions;
const useStoreDispatch = typedHooks.useStoreDispatch;
const useStore = typedHooks.useStore;
const useStoreState = typedHooks.useStoreState;

export { useStoreActions, useStoreDispatch, useStoreState, useStore };
