import { action, thunk, Action, Thunk } from "easy-peasy";
import _ from "underscore";

export interface uiMessageModel {
  message: string;
  negative?: boolean;
  dismissed?: boolean;
  id?: string;
  action?: string;
}

export interface UiModelType {
  error: string | null;
  messages: Array<uiMessageModel>;
  setError: Action<UiModelType, uiMessageModel>;
  resetError: Action<UiModelType, UiModelType>;
  addMessage: Action<UiModelType, uiMessageModel>;
  dismissMessage: Action<UiModelType, uiMessageModel>;
  throwError: Thunk<UiModelType, uiMessageModel>;
}

export const uiModel: UiModelType = {
  error: null,
  messages: [
    { message: "hello", negative: false, dismissed: false, id: "fake" },
  ],

  setError: action((state, { message }) => {
    state.error = message;
  }),

  resetError: action((state, _payload) => {
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
    const notYetDismissed = _.reject(
      state.messages,
      (item: { dismissed?: any }) => {
        return item.dismissed;
      }
    );
    state.messages = _.reject(
      notYetDismissed,
      (item: { id?: string | undefined }) => {
        return item.id == id;
      }
    );
  }),

  throwError: thunk((actions, { message }) => {
    actions.setError({ message });
    actions.addMessage({ message, negative: true });
  }),
};
