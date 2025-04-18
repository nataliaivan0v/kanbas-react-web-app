/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import * as client from "./client";
import { FormControl, ListGroup } from "react-bootstrap";
import { FaTrash, FaPlusCircle } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";
import { FaPencil } from "react-icons/fa6";

export default function WorkingWithObjectsAsynchronously() {
  const [assignment, setAssignment] = useState<any>({});
  const fetchAssignment = async () => {
    const assignment = await client.fetchAssignment();
    setAssignment(assignment);
  };
  const updateTitle = async (title: string) => {
    const updatedAssignment = await client.updateTitle(title);
    setAssignment(updatedAssignment);
  };
  useEffect(() => {
    fetchAssignment();
  }, []);

  const [todos, setTodos] = useState<any[]>([
    { id: 1, title: "Task 1", completed: false },
    { id: 2, title: "Task 2", completed: true },
    { id: 3, title: "Task 3", completed: false },
  ]); // Ensuring it's an empty array initially
  const fetchTodos = async () => {
    try {
      const response = await client.fetchTodos();
      if (Array.isArray(response)) {
        setTodos(response);
      } else {
        setTodos([]); // Prevent crashing if response isn't an array
      }
    } catch (error) {
      console.error("Error fetching todos:", error);
      setTodos([]); // Ensure an empty array on error
    }
  };
  useEffect(() => {
    fetchTodos();
  }, []);

  const removeTodo = async (todo: any) => {
    const updatedTodos = await client.removeTodo(todo);
    setTodos(updatedTodos);
  };
  const createTodo = async () => {
    const todos = await client.createTodo();
    setTodos(todos);
  };
  const postTodo = async () => {
    const newTodo = await client.postTodo({
      title: "New Posted Todo",
      completed: false,
    });
    setTodos([...todos, newTodo]);
  };
  const editTodo = (todo: any) => {
    const updatedTodos = todos.map((t) =>
      t.id === todo.id ? { ...todo, editing: true } : t
    );
    setTodos(updatedTodos);
  };
  const [errorMessage, setErrorMessage] = useState(null);
  const updateTodo = async (todo: any) => {
    try {
      await client.updateTodo(todo);
      setTodos(todos.map((t) => (t.id === todo.id ? todo : t)));
    } catch (error: any) {
      setErrorMessage(error.response.data.message);
    }
  };
  const deleteTodo = async (todo: any) => {
    try {
      await client.deleteTodo(todo);
      const newTodos = todos.filter((t) => t.id !== todo.id);
      setTodos(newTodos);
    } catch (error: any) {
      console.log(error);
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <div id="wd-asynchronous-objects">
      <h3>Working with Objects Asynchronously</h3>
      {errorMessage && (<div id="wd-todo-error-message" className="alert alert-danger mb-2 mt-2">{errorMessage}</div>)}
      <h4>Assignment</h4>
      <FormControl
        defaultValue={assignment.title}
        className="mb-2"
        onChange={(e) =>
          setAssignment({ ...assignment, title: e.target.value })
        }
      />
      <FormControl
        rows={3}
        defaultValue={assignment.description}
        className="mb-2"
        onChange={(e) =>
          setAssignment({ ...assignment, description: e.target.value })
        }
      />
      <FormControl
        type="date"
        className="mb-2"
        defaultValue={assignment.due}
        onChange={(e) => setAssignment({ ...assignment, due: e.target.value })}
      />
      <div className="form-check form-switch">
        <input
          className="form-check-input"
          type="checkbox"
          id="wd-completed"
          defaultChecked={assignment.completed}
          onChange={(e) =>
            setAssignment({ ...assignment, completed: e.target.checked })
          }
        />
        <label className="form-check-label" htmlFor="wd-completed">
          {" "}
          Completed{" "}
        </label>
      </div>
      <button
        className="btn btn-primary me-2"
        onClick={() => updateTitle(assignment.title)}
      >
        Update Title
      </button>
      <pre>{JSON.stringify(assignment, null, 2)}</pre>
      <hr />
      <h4>
        {" "}
        Todos
        <FaPlusCircle
          onClick={createTodo}
          className="text-success float-end fs-3"
          id="wd-create-todo"
        />{" "}
        <FaPlusCircle
          onClick={postTodo}
          className="text-primary float-end fs-3 me-3"
          id="wd-post-todo"
        />
      </h4>
      <ListGroup>
        {Array.isArray(todos) && todos.length > 0 ? (
          todos.map((todo) => (
            <ListGroup.Item key={todo.id}>
              <FaTrash
                onClick={() => removeTodo(todo)}
                className="text-danger float-end mt-1"
                id="wd-remove-todo"
              />
              <TiDelete
                onClick={() => deleteTodo(todo)}
                className="text-danger float-end me-2 fs-3"
                id="wd-delete-todo"
              />
              <FaPencil
                onClick={() => editTodo(todo)}
                className="text-primary float-end me-2 mt-1"
              />
              <input
                type="checkbox"
                defaultChecked={todo.completed}
                className="form-check-input me-2 float-start"
                onChange={(e) =>
                  updateTodo({ ...todo, completed: e.target.checked })
                }
              />
              {!todo.editing ? (
                todo.title
              ) : (
                <FormControl
                  className="w-50 float-start"
                  defaultValue={todo.title}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      updateTodo({ ...todo, editing: false });
                    }
                  }}
                  onChange={(e) =>
                    updateTodo({ ...todo, title: e.target.value })
                  }
                />
              )}

              <span
                style={{
                  textDecoration: todo.completed ? "line-through" : "none",
                }}
              >
                {todo.title}
              </span>
            </ListGroup.Item>
          ))
        ) : (
          <p>No todos available.</p>
        )}
      </ListGroup>{" "}
      <hr />
    </div>
  );
}
