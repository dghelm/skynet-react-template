import { Checkbox, List, Button, Loader } from "semantic-ui-react";
import { useStoreState, useStoreActions } from "easy-peasy";

const TodoList = () => {
  const todoItems = useStoreState((state) => state.todos.todoItems);
  const { updateTodo, deleteTodo } = useStoreActions(
    (actions) => actions.todos
  );

  return (
    <List divided relaxed>
      {todoItems.map((todo, i) => (
        <List.Item key={i}>
          <Checkbox
            onClick={(e, elem) => {
              updateTodo({ elem, i });
            }}
            checked={todo.done}
            label={todo.text}
          />
          <Button
            compact
            basic
            color="red"
            icon="delete"
            floated="right"
            onClick={(e, elem) => {
              deleteTodo({ elem, i });
            }}
          />
        </List.Item>
      ))}
    </List>
  );
};

export default TodoList;
