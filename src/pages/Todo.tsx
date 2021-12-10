import { Header, Container } from "semantic-ui-react";
import TodoList from "../components/TodoList";
import TodoForm from "../components/TodoForm";

const Todo = () => {
  return (
    <Container text style={{ marginTop: "7em" }}>
      <Header>Simple Todo App</Header>
      {/* This Component renders the items from our state. */}
      <TodoList />
      {/* This Component renders a form to add items to our state. */}
      <TodoForm />
    </Container>
  );
};

export default Todo;
