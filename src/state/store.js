import { createStore } from 'easy-peasy';
import { todoModel } from './todoModel';
import { hnsModel } from './hnsModel';
import { mySkyModel } from './mySkyModel';
import { uiModel } from './uiModel';

export const store = createStore(
  {
    mySky: mySkyModel,
    todos: todoModel,
    hns: hnsModel,
    ui: uiModel,
  },
  { version: 1 }
);
