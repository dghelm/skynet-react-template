import { createStore, Store } from "easy-peasy";
import { uiModel, UiModelType } from "./uiModel";
import { mySkyModel, MySkyModelType } from "./mySkyModel";
import { todoModel, TodoModelType } from "./todoModel";
import { hnsModel } from "./hnsModel";

export interface StoreModel {
  ui: UiModelType;
  mySky: MySkyModelType;
  todos: TodoModelType; 
  [key: string]: any;
}

export const store = createStore<StoreModel>(
  {
    mySky: mySkyModel,
    todos: todoModel,
    hns: hnsModel,
    ui: uiModel,
  },
  { version: 1 }
);
