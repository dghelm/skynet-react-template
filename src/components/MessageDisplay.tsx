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
import { useStoreState, useStoreActions } from "easy-peasy";
import { useState, useEffect } from "react";

const MessageList = ({ messages, dismissMessage }) => {
  const messageItems = messages.map(({ message, negative, dismissed, id }) => {
    return (
      <div key={id}>
        <Transition animation="fade up" duration={500} visible={!dismissed}>
          <Message
            onDismiss={(i) => dismissMessage({ id })}
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
  const { resetError, dismissMessage } = useStoreActions(
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
