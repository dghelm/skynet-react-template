import { createStore, action, thunk, thunkOn, computed } from 'easy-peasy';
import { todoModel } from './todoModel';
import { mySkyModel } from './mySkyModel';

export const store = createStore(
  {
    mySky: mySkyModel,
    todos: todoModel,
  },
  { version: 1 }
);
