import renderer from "react-test-renderer";
import TodoForm from "../TodoForm";

test("Check if forms renders correctly", () => {
  const component = renderer.create(TodoForm);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
