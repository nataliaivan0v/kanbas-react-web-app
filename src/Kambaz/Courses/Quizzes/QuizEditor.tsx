import React, { useState } from "react";
import QuizDetailsEditor from "./QuizDetailsEditor";
import QuizQuestionsEditor from "./QuizQuestionsEditor";
import "../../styles.css";

const QuizEditor: React.FC = () => {
    const [tab, setTab] = useState("details");
  
    return (
        <div>
          <h1 className="h2 mb-4">Quiz Editor</h1>
          <ul className="nav nav-tabs custom-tabs mb-4 border-bottom">
            <li className="nav-item">
              <button
                className={`nav-link ${tab === "details" ? "active" : "inactive-tab"}`}
                onClick={() => setTab("details")}
              >
                Details
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${tab === "questions" ? "active" : "inactive-tab"}`}
                onClick={() => setTab("questions")}
              >
                Questions
              </button>
            </li>
          </ul>
          <div>
            {tab === "details" && <QuizDetailsEditor />}
            {tab === "questions" && <QuizQuestionsEditor />}
          </div>
        </div>
    );
  };
  
export default QuizEditor;  