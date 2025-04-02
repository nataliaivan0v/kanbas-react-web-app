import { useState } from "react";

export default function Module() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [module, setModule] = useState<any>({});
  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [score, setScore] = useState<number>(85);
  const [completed, setCompleted] = useState<boolean>(false);

  // Fetch module
  const fetchModule = async () => {
    const response = await fetch("http://localhost:4000/lab5/module");
    const data = await response.json();
    setModule(data);
  };

  // Fetch module name
  const fetchModuleName = async () => {
    const response = await fetch("http://localhost:4000/lab5/module/name");
    const name = await response.text();
    alert(`Module Name: ${name}`);
  };

  // Update module name
  const updateModuleName = async () => {
    await fetch("http://localhost:4000/lab5/module/name", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newName })
    });
    fetchModule(); // Refresh the module data
  };

  // Update module description
  const updateModuleDescription = async () => {
    await fetch("http://localhost:4000/lab5/module/description", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ description: newDescription })
    });
    fetchModule(); // Refresh module
  };

  // Update assignment score
  const updateScore = async () => {
    await fetch("http://localhost:4000/lab5/assignment/score", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ score })
    });
    alert("Score updated!");
  };

  // Update assignment completion status
  const updateCompletion = async () => {
    await fetch("http://localhost:4000/lab5/assignment/completed", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed })
    });
    alert("Completion status updated!");
  };

  return (
    <div id="wd-lab5">
      <h2>Lab 5</h2>
      
      <div className="list-group">
        <button onClick={fetchModule} className="list-group-item">
          Get Module
        </button>
        <button onClick={fetchModuleName} className="list-group-item">
          Get Module Name
        </button>
      </div>

      <h3>Edit Module</h3>
      <input
        type="text"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
        placeholder="New module name"
      />
      <button onClick={updateModuleName}>Update Name</button>

      <input
        type="text"
        value={newDescription}
        onChange={(e) => setNewDescription(e.target.value)}
        placeholder="New module description"
      />
      <button onClick={updateModuleDescription}>Update Description</button>

      <h3>Assignment</h3>
      <label>Score: </label>
      <input
        type="number"
        value={score}
        onChange={(e) => setScore(Number(e.target.value))}
      />
      <button onClick={updateScore}>Update Score</button>

      <label>Completed: </label>
      <input
        type="checkbox"
        checked={completed}
        onChange={(e) => setCompleted(e.target.checked)}
      />
      <button onClick={updateCompletion}>Update Completion</button>

      <h3>Current Module Data</h3>
      <pre>{JSON.stringify(module, null, 2)}</pre>
    </div>
  );
}
