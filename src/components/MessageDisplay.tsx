import {
  Sidebar,
  Container,
  Segment,
  Message,
  Transition,
  Icon,
  Button,
  Sticky,
  Rail,
} from "semantic-ui-react";
import { useStoreState, useStoreActions } from "../state/easy-peasy-typed";
import { useState, useEffect } from "react";
import { uiMessageModel } from "../state/uiModel";

const MessageList = ({
  messages,
  dismissMessage,
}: {
  messages: uiMessageModel[];
  dismissMessage: any;
}): JSX.Element => {
  const messageItems = messages.map(({ message, negative, dismissed, id }) => {
    return (
      <div key={id}>
        <Transition animation="fade up" duration={500} visible={!dismissed}>
          <Message
            onDismiss={() => dismissMessage({ id })}
            floating
            negative={negative}
          >
            {message}
          </Message>
        </Transition>
      </div>
    );
  });

  return <>{messageItems}</>;
};

const MessageDisplay = () => {
  const { error, messages } = useStoreState((state) => state.ui);
  const { dismissMessage } = useStoreActions(
    (actions) => actions.ui
  );
  const [visible, setVisible] = useState(false);
  const [errorText, setErrorText] = useState("Default Error Text");

  useEffect(() => {
    if (error) {
      setErrorText(error);
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [error]);

  return (
    <Rail internal position="right">
      <Segment basic style={{ marginTop: "70px" }} />
      <MessageList messages={messages} dismissMessage={dismissMessage} />
    </Rail>
  );
};

export default MessageDisplay;
