import {
  Header,
  Checkbox,
  List,
  Container,
  Input,
  Button,
} from 'semantic-ui-react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { useState } from 'react';

function TodoList() {
  const todos = useStoreState((state) => state.todos.todoItems);
  const { updateTodo, deleteTodo } = useStoreActions(
    (actions) => actions.todos
  );

  return (
    <List divided relaxed>
      {todos.map((todo, i) => (
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
}

function AddTodoForm() {
  const addTodo = useStoreActions((actions) => actions.todos.addTodo);
  const [value, setValue] = useState('');
  return (
    <>
      <Input
        placeholder="Todo item..."
        onChange={(e) => setValue(e.target.value)}
        value={value}
      />
      <Button
        onClick={() => addTodo({ text: value, done: false })}
        style={{ marginLeft: '10px' }}
      >
        Add Todo
      </Button>
    </>
  );
}

const Todo = () => {
  return (
    <Container text>
      <Header>Sample Todo App</Header>
      <TodoList />
      <AddTodoForm />
    </Container>
  );
};

export default Todo;
