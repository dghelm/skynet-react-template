import { action, thunk, thunkOn, computed } from "easy-peasy";
import _ from "underscore";

export const uiModel = {
  error: null,
  messages: [
    { message: "hello", negative: false, dismissed: false, id: "fake" },
  ],

  setError: action((state, { message }) => {
    state.error = message;
  }),

  resetError: action((state, payload) => {
    state.error = null;
  }),

  addMessage: action((state, { message, negative }) => {
    state.messages.push({
      message,
      negative,
      dismissed: false,
      id: _.uniqueId(),
    });
  }),

  dismissMessage: action((state, { id }) => {
    const notYetDismissed = _.reject(state.messages, (item) => {
      return item.dismissed;
    });
    state.messages = _.reject(notYetDismissed, (item) => {
      return item.id == id;
    });
  }),

  throwError: thunk((actions, { message }) => {
    actions.setError({ message });
    actions.addMessage({ message, negative: true });
  }),
};
