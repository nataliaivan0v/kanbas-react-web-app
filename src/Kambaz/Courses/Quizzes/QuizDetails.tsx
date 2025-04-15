/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import * as quizzesClient from "./client";
import { useEffect, useState } from "react";

export default function QuizDetails() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { cid } = useParams();
  const { qid } = useParams();
  const [quizzes, setQuizzes] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
      if (cid) {
        quizzesClient.findQuizzesForCourse(cid).then(setQuizzes);
      }
    }, [cid]); 

  const quiz = quizzes.find((quiz) => quiz._id === qid);

  const navigateEdit = () => {
    navigate(`/Kambaz/Courses/${quiz.course}/Quizzes/${quiz._id}/Edit`);
  };

  function addDay(date: Date): Date {
    const newDate = new Date(date);
    newDate.setDate(date.getDate() + 1);
    return newDate;
  }

  if (!quiz) {
    return <div></div>;
  }

  if (currentUser.role === "STUDENT") {
    return (
      <div>
        <h2>
          <b>{quiz.title}</b>
        </h2>
        <br></br>
        <Button id="wd-start-quiz-button" variant="danger">
          Start Quiz
        </Button>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button
          id="wd-preview-button"
          variant="secondary"
          style={{ marginRight: "10px" }}
        >
          Preview
        </Button>
        <Button
          id="wd-edit-button"
          variant="secondary"
          onClick={() => navigateEdit()}
        >
          Edit
        </Button>
      </div>
      <br></br>
      <div
        style={{
          border: "1px solid #ccc",
          padding: "24px",
          borderRadius: "2px",
        }}
      >
        <h2>
          <b>{quiz.title}</b>
        </h2>
        <br />
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <div style={{ display: "flex" }}>
            <b
              style={{
                width: "300px",
                textAlign: "right",
                paddingRight: "10px",
              }}
            >
              Quiz Type
            </b>
            <span>{quiz.type}</span>
          </div>
          <div style={{ display: "flex" }}>
            <b
              style={{
                width: "300px",
                textAlign: "right",
                paddingRight: "10px",
              }}
            >
              Points
            </b>
            <span>{quiz.points || "Not set"}</span>
          </div>
          <div style={{ display: "flex" }}>
            <b
              style={{
                width: "300px",
                textAlign: "right",
                paddingRight: "10px",
              }}
            >
              Assignment Group
            </b>
            <span>{quiz.group}</span>
          </div>
          <div style={{ display: "flex" }}>
            <b
              style={{
                width: "300px",
                textAlign: "right",
                paddingRight: "10px",
              }}
            >
              Shuffle Answers
            </b>
            <span>{quiz.shuffle}</span>
          </div>
          <div style={{ display: "flex" }}>
            <b
              style={{
                width: "300px",
                textAlign: "right",
                paddingRight: "10px",
              }}
            >
              Time Limit
            </b>
            <span>{quiz.timeLimit}</span>
          </div>
          <div style={{ display: "flex" }}>
            <b
              style={{
                width: "300px",
                textAlign: "right",
                paddingRight: "10px",
              }}
            >
              Multiple Attempts
            </b>
            <span>{Number(quiz.attempts) > 1 ? "Yes" : "No"}</span>
          </div>
          <div style={{ display: "flex" }}>
            <b
              style={{
                width: "300px",
                textAlign: "right",
                paddingRight: "10px",
              }}
            >
              Show Correct Answers
            </b>
            <span>{quiz.showAnswers || "Not set"}</span>
          </div>
          <div style={{ display: "flex" }}>
            <b
              style={{
                width: "300px",
                textAlign: "right",
                paddingRight: "10px",
              }}
            >
              Access Code
            </b>
            <span>{quiz.accessCode || "(none)"}</span>
          </div>
          <div style={{ display: "flex" }}>
            <b
              style={{
                width: "300px",
                textAlign: "right",
                paddingRight: "10px",
              }}
            >
              One Question at a Time
            </b>
            <span>{quiz.oneQuestion}</span>
          </div>
          <div style={{ display: "flex" }}>
            <b
              style={{
                width: "300px",
                textAlign: "right",
                paddingRight: "10px",
              }}
            >
              Webcam Required
            </b>
            <span>{quiz.webcam}</span>
          </div>
          <div style={{ display: "flex" }}>
            <b
              style={{
                width: "300px",
                textAlign: "right",
                paddingRight: "10px",
              }}
            >
              Lock Questions After Answering
            </b>
            <span>{quiz.lock}</span>
          </div>
        </div>
        <div style={{ marginTop: "32px", width: "50vw" }}>
          <div
            style={{
              display: "flex",
              fontWeight: "bold",
              borderBottom: "1px solid #ccc",
              paddingBottom: "4px",
              marginBottom: "4px",
            }}
          >
            <div style={{ flex: 1 }}>Due</div>
            <div style={{ flex: 1 }}>For</div>
            <div style={{ flex: 1 }}>Available from</div>
            <div style={{ flex: 1 }}>Until</div>
          </div>

          <div style={{ display: "flex" }}>
            <div style={{ flex: 1 }}>
              {addDay(new Date(quiz.dueDate)).toLocaleDateString()}
            </div>
            <div style={{ flex: 1 }}>Everyone</div>
            <div style={{ flex: 1 }}>
              {addDay(new Date(quiz.availableFrom)).toLocaleDateString()}
            </div>
            <div style={{ flex: 1 }}>
              {addDay(new Date(quiz.availableUntil)).toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
