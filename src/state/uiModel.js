import { action, thunk, thunkOn, computed } from 'easy-peasy';

export const uiModel = {
  error: null,
  messages: [{ message: 'hello', negative: false, dismissed: false }],

  setError: action((state, { message }) => {
    state.error = message;
  }),
  resetError: action((state, payload) => {
    state.error = null;
  }),

  addMessage: action((state, { message, negative }) => {
    state.messages.push({ message, negative, dismissed: false });
  }),

  throwError: thunk((actions, { message }) => {
    actions.setError({ message });
    actions.addMessage({ message, negative: true });
  }),
};
