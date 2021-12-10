import { Checkbox, List, Button } from "semantic-ui-react";
import { useStoreState } from "../state/easy-peasy-typed";

const TodoList = () => {
  const todoItems = useStoreState((state) => state.todos.todoItems);
  //   const { updateTodo, deleteTodo } = useStoreActions(
  //     (actions) => actions.todos
  //   );

  return (
    <List divided relaxed>
      {todoItems.map((todo, i) => (
        <List.Item key={i}>
          <Checkbox
            onClick={(_e, _elem) => {
              //   updateTodo({ elem, i });
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
            onClick={(_e, _elem) => {
              //   deleteTodo({ elem, i });
            }}
          />
        </List.Item>
      ))}
    </List>
  );
};

export default TodoList;
