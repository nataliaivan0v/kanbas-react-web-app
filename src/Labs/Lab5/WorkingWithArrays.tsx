import { useState } from "react";
import { FormControl } from "react-bootstrap";

const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;

export default function WorkingWithArrays() {
  const API = `${REMOTE_SERVER}/lab5/todos`;
  const [todo, setTodo] = useState({
    id: "1",
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    completed: false,
  });

  // Function to update the completed status of a todo
  const updateCompleted = async () => {
    await fetch(`${API}/${todo.id}/completed/${todo.completed}`, {
      method: "GET",
    });
    alert("Todo completed status updated!");
  };

  // Function to update the description of a todo
  const updateDescription = async () => {
    await fetch(`${API}/${todo.id}/description/${todo.description}`, {
      method: "GET",
    });
    alert("Todo description updated!");
  };

  return (
    <div id="wd-working-with-arrays">
      <h3>Working with Arrays</h3>

      <h4>Retrieve Todos</h4>
      <a className="btn btn-primary" href={API}>
        Get Todos
      </a>
      <hr />

      <h4>Retrieve a Todo by ID</h4>
      <a className="btn btn-primary float-end" href={`${API}/${todo.id}`}>
        Get Todo by ID
      </a>
      <FormControl
        defaultValue={todo.id}
        className="w-50"
        onChange={(e) => setTodo({ ...todo, id: e.target.value })}
      />
      <hr />

      <h3>Update Todo</h3>
      <label>Todo ID:</label>
      <FormControl
        defaultValue={todo.id}
        className="w-25 float-start me-2"
        onChange={(e) => setTodo({ ...todo, id: e.target.value })}
      />
      <br />

      <label>Title:</label>
      <FormControl
        defaultValue={todo.title}
        className="w-50 float-start"
        onChange={(e) => setTodo({ ...todo, title: e.target.value })}
      />
      <a href={`${API}/${todo.id}/title/${todo.title}`} className="btn btn-primary">
        Update Title
      </a>
      <hr />

      <label>Description:</label>
      <FormControl
        type="text"
        value={todo.description}
        className="w-50"
        onChange={(e) => setTodo({ ...todo, description: e.target.value })}
      />
      <button onClick={updateDescription} className="btn btn-primary">
        Update Description
      </button>
      <hr />

      <label>Completed:</label>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={(e) => setTodo({ ...todo, completed: e.target.checked })}
      />
      <button onClick={updateCompleted} className="btn btn-primary">
        Update Completed Status
      </button>
      <hr />
    </div>
  );
}