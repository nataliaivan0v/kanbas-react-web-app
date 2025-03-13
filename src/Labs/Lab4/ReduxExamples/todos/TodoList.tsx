import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";
import { useSelector } from "react-redux";
import { ListGroup } from "react-bootstrap";

export default function TodoList() {
  const { todos } = useSelector((state: any) => state.todosReducer); // eslint-disable-line @typescript-eslint/no-explicit-any
  return (
    <div id="wd-todo-list-redux">
      <h2>Todo List</h2>
      <ListGroup>
        <TodoForm />
        {todos.map((todo: any) => ( // eslint-disable-line @typescript-eslint/no-explicit-any
          <TodoItem todo={todo} />
        ))}
      </ListGroup>
      <hr/>
    </div>
);}