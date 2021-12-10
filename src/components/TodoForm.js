import { Input, Button } from "semantic-ui-react";
import { useState } from "react";
import { useStoreActions } from "easy-peasy";

function TodoForm() {
  const addTodo = useStoreActions((actions) => actions.todos.addTodo);
  const [value, setValue] = useState("");
  return (
    <>
      <Input
        placeholder="Todo item..."
        onChange={(e) => setValue(e.target.value)}
        value={value}
      />
      <Button
        onClick={() => addTodo({ text: value, done: false })}
        style={{ marginLeft: "10px" }}
      >
        Add Todo
      </Button>
    </>
  );
}

export default TodoForm;
