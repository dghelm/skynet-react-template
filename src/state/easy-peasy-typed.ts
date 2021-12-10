import { createTypedHooks } from "easy-peasy";
import { StoreModel } from "./store";

const typedHooks = createTypedHooks<StoreModel>();

const useStoreActions = typedHooks.useStoreActions;
const useStoreDispatch = typedHooks.useStoreDispatch;
const useStoreState = typedHooks.useStoreState;

export { useStoreActions, useStoreDispatch, useStoreState };
