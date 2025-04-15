/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import * as quizzesClient from "./client";
import { useState } from "react";
import { useEffect } from "react";

export default function QuizDetailsEditor() {
  const { cid, qid } = useParams<{ cid: string; qid: string }>();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [quizzes, setQuizzes] = useState<any[]>([]);

  const fetchQuizzes = async () => {
    if (cid) {
      quizzesClient.findQuizzesForCourse(cid).then((fetchedQuizzes) => {
        setQuizzes(fetchedQuizzes);
      });
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, [cid]);

  const currQuiz = quizzes.find((quiz) => quiz._id === qid);

  const [title, setTitle] = useState(currQuiz?.title || "");
  const [description, setDescription] = useState(currQuiz?.description || "");
  const [quizType, setQuizType] = useState("");
  const [points, setPoints] = useState(currQuiz?.points || "100");
  const [assignmentGroup, setAssignmentGroup] = useState("");
  const [shuffleAnswers, setShuffleAnswers] = useState(true);
  const [timeLimit, setTimeLimit] = useState(20);
  const [multipleAttemptsEnabled, setMultipleAttemptsEnabled] = useState(false);
  const [multipleAttempts, setMultipleAttempts] = useState(2);
  const [showCorrectAnswers, setShowCorrectAnswers] = useState("");
  const [accessCode, setAccessCode] = useState("");
  const [oneQuestionAtATime, setOneQuestionAtATime] = useState(true);
  const [webcamRequired, setWebcamRequired] = useState(false);
  const [lockQuestionsAfterAnswering, setLockQuestionsAfterAnswering] =
    useState(false);
  const [dueDate, setDueDate] = useState(currQuiz?.dueDate || "");
  const [availableFrom, setAvailableFrom] = useState(
    currQuiz?.availableFrom || ""
  );
  const [availableUntil, setAvailableUntil] = useState(
    currQuiz?.availableUntil || ""
  );

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (currQuiz) {
      setTitle(currQuiz.title);
      setDescription(currQuiz.description);
      setQuizType(currQuiz.type);
      setPoints(currQuiz.points.toString());
      setAssignmentGroup(currQuiz.group);
      setShuffleAnswers(currQuiz.shuffle === "Yes" ? true : false);
      setTimeLimit(currQuiz.timeLimit);
      setMultipleAttemptsEnabled(Number(currQuiz.attempts) > 1 ? true : false);
      setMultipleAttempts(Number(currQuiz.attempts));
      setShowCorrectAnswers(currQuiz.showAnswers);
      setAccessCode(currQuiz.accessCode);
      setOneQuestionAtATime(currQuiz.oneQuestion === "Yes" ? true : false);
      setWebcamRequired(currQuiz.webcam === "Yes" ? true : false);
      setLockQuestionsAfterAnswering(currQuiz.lock === "Yes" ? true : false);
      setDueDate(currQuiz.dueDate);
      setAvailableFrom(currQuiz.availableFrom);
      setAvailableUntil(currQuiz.availableUntil);
      setLoaded(true);
      console.log(currQuiz);
    }
  }, [currQuiz]);

  const updatedQuiz: {
    _id: string | undefined;
    title: string;
    course: string | undefined;
    availableFrom: string;
    availableUntil: string;
    dueDate: string;
    points: string;
    numQuestions: string;
    score: string;
    published: string;
    description: string;
    type: string;
    group: string;
    shuffle: string;
    timeLimit: string;
    attempts: string;
    showAnswers: string;
    accessCode: string;
    oneQuestion: string;
    webcam: string;
    lock: string;
  } = {
    _id: qid,
    title: title,
    course: cid,
    availableFrom: availableFrom,
    availableUntil: availableUntil,
    dueDate: dueDate,
    points: points,
    numQuestions: currQuiz?.numQuestions,
    score: currQuiz?.score,
    published: currQuiz?.published,
    description: description,
    type: quizType,
    group: assignmentGroup,
    shuffle: shuffleAnswers ? "Yes" : "No",
    timeLimit: timeLimit?.toString(),
    attempts: multipleAttempts?.toString(),
    showAnswers: showCorrectAnswers,
    accessCode: accessCode,
    oneQuestion: oneQuestionAtATime ? "Yes" : "No",
    webcam: webcamRequired ? "Yes" : "No",
    lock: lockQuestionsAfterAnswering ? "Yes" : "No",
  };

  const handleSave = () => {
    quizzesClient.updateQuiz(updatedQuiz);
    fetchQuizzes();
  };

  const handleSavePublish = () => {
    quizzesClient.updateQuiz(updatedQuiz);
    quizzesClient.publishQuiz(qid);
    fetchQuizzes();
  };

  if (!loaded) {
    console.log(currQuiz);
    return null;
  }

  return (
    <div id="wd-assignments-editor">
      <text>Quiz Name</text>
      <br></br>
      <input
        id="wd-name"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />
      <br />
      <text>Quiz Instructions</text>
      <br></br>
      <textarea
        id="wd-description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{
          width: "550px",
          height: "110px",
          border: "1px solid",
          borderRadius: "2px",
          padding: "10px",
          textAlign: "start",
          verticalAlign: "top",
        }}
      />
      <br />
      <br />
      <table style={{ borderBottom: "1px solid grey" }}>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-points" style={{ paddingRight: "7px" }}>
              Points
            </label>
          </td>
          <td>
            <input
              type="number"
              id="wd-points"
              value={points}
              onChange={(e) => setPoints(e.target.value)}
              style={{ width: "315px" }}
            />
          </td>
        </tr>
        <br></br>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-points" style={{ paddingRight: "7px" }}>
              Quiz Type
            </label>
          </td>
          <td>
            <select
              id="wd-group"
              style={{ width: "315px", height: "28px" }}
              value={quizType}
              onChange={(e) => setQuizType(e.target.value)}
            >
              <option value="Graded Quiz">Graded Quiz</option>
              <option value="Practice Quiz">Practice Quiz</option>
              <option value="Graded Survey">Graded Survey</option>
              <option value="Ungraded Survey">Ungraded Survey</option>
            </select>
          </td>
        </tr>
        <br />
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-points" style={{ paddingRight: "7px" }}>
              Assignment Group
            </label>
          </td>
          <td>
            <select
              id="wd-group"
              style={{ width: "315px", height: "28px" }}
              value={assignmentGroup}
              onChange={(e) => setAssignmentGroup(e.target.value)}
            >
              <option value="QUIZZES">QUIZZES</option>
              <option value="ASSIGNMENTS">ASSIGNMENTS</option>
              <option value="PROJECT">PROJECT</option>
              <option value="EXAMS">EXAMS</option>
            </select>
          </td>
        </tr>
        <br />
        <tr>
          <td align="right" valign="top">
            <label style={{ paddingRight: "7px" }}>Shuffle Answers</label>
          </td>
          <td>
            <select
              value={shuffleAnswers ? "yes" : "no"}
              onChange={(e) => setShuffleAnswers(e.target.value === "yes")}
            >
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </td>
        </tr>
        <br></br>
        <tr>
          <td align="right" valign="top">
            <label style={{ paddingRight: "7px" }}>Time Limit (Minutes)</label>
          </td>
          <td>
            <input
              type="number"
              value={timeLimit}
              onChange={(e) => setTimeLimit(Number(e.target.value))}
              style={{ width: "315px" }}
            />
          </td>
        </tr>
        <br></br>
        <tr>
          <td align="right" valign="top">
            <label style={{ paddingRight: "7px" }}>Multiple Attempts</label>
          </td>
          <td>
            <select
              value={multipleAttemptsEnabled ? "yes" : "no"}
              onChange={(e) => {
                const enabled = e.target.value === "yes";
                setMultipleAttemptsEnabled(enabled);
                if (!enabled) {
                  setMultipleAttempts(1);
                }
              }}
            >
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
            {multipleAttemptsEnabled && (
              <div style={{ marginTop: "8px" }}>
                <label>Number of Attempts:</label>
                <input
                  type="number"
                  min="2"
                  value={multipleAttempts}
                  onChange={(e) => setMultipleAttempts(Number(e.target.value))}
                  style={{ width: "100px", marginLeft: "10px" }}
                />
              </div>
            )}
          </td>
        </tr>
        <br></br>
        <tr>
          <td align="right" valign="top">
            <label style={{ paddingRight: "7px" }}>Show Correct Answers</label>
          </td>
          <td>
            <input
              type="text"
              value={showCorrectAnswers}
              onChange={(e) => setShowCorrectAnswers(e.target.value)}
              style={{ width: "315px" }}
            />
          </td>
        </tr>
        <br></br>
        <tr>
          <td align="right" valign="top">
            <label style={{ paddingRight: "7px" }}>Access Code</label>
          </td>
          <td>
            <input
              type="text"
              value={accessCode}
              onChange={(e) => setAccessCode(e.target.value)}
              style={{ width: "315px" }}
            />
          </td>
        </tr>
        <br></br>
        <tr>
          <td align="right" valign="top">
            <label style={{ paddingRight: "7px" }}>
              One Question at a Time
            </label>
          </td>
          <td>
            <select
              value={oneQuestionAtATime ? "yes" : "no"}
              onChange={(e) => setOneQuestionAtATime(e.target.value === "yes")}
            >
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </td>
        </tr>
        <br></br>
        <tr>
          <td align="right" valign="top">
            <label style={{ paddingRight: "7px" }}>Webcam Required</label>
          </td>
          <td>
            <select
              value={webcamRequired ? "yes" : "no"}
              onChange={(e) => setWebcamRequired(e.target.value === "yes")}
            >
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
          </td>
        </tr>
        <br></br>
        <tr>
          <td align="right" valign="top">
            <label style={{ paddingRight: "7px" }}>
              Lock Questions After Answering
            </label>
          </td>
          <td>
            <select
              value={lockQuestionsAfterAnswering ? "yes" : "no"}
              onChange={(e) =>
                setLockQuestionsAfterAnswering(e.target.value === "yes")
              }
            >
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
          </td>
        </tr>
        <br></br>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-assign" style={{ paddingRight: "7px" }}>
              Assign
            </label>
          </td>
          <div
            style={{
              border: "1px solid",
              borderRadius: "2px",
              padding: "10px",
            }}
          >
            <td align="left" valign="top">
              <label htmlFor="wd-assign-to">
                <b>Assign to</b>
              </label>
            </td>
            <tr>
              <td>
                <div
                  style={{
                    display: "inline-flex",
                    padding: "5px 5px",
                    borderRadius: "2px",
                    fontSize: "14px",
                    color: "#555",
                    border: "1px solid",
                    width: "290px",
                  }}
                >
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      backgroundColor: "#f0f0f0",
                      padding: "5px 10px",
                      borderRadius: "2px",
                      fontSize: "14px",
                      color: "#555",
                    }}
                  >
                    <span>Everyone</span>
                    <button
                      style={{
                        background: "none",
                        border: "none",
                        color: "#888",
                        fontSize: "13px",
                        marginLeft: "8px",
                        cursor: "pointer",
                      }}
                    >
                      X
                    </button>
                  </div>
                </div>
              </td>
            </tr>
            <br></br>
            <tr>
              <td></td>
              <td align="left" valign="top">
                <label htmlFor="wd-due-date">
                  <b>Due</b>
                </label>
              </td>
            </tr>
            <tr>
              <td></td>
              <td>
                <input
                  defaultValue="2025-05-03"
                  type="date"
                  id="wd-due-date"
                  style={{ width: "290px" }}
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
              </td>
            </tr>
            <br></br>
            <tr>
              <td></td>
              <td align="left" valign="top">
                <label htmlFor="wd-available-from">
                  <b>Available from</b>
                </label>
              </td>
              <td align="left" valign="top">
                <label htmlFor="wd-available-until">
                  <b>Until</b>
                </label>
              </td>
              <br />
            </tr>
            <tr>
              <td></td>
              <td>
                <input
                  defaultValue="2025-05-06"
                  type="date"
                  id="wd-available-from"
                  style={{ width: "145px" }}
                  value={availableFrom}
                  onChange={(e) => setAvailableFrom(e.target.value)}
                />
              </td>
              <td>
                <input
                  defaultValue="2025-05-20"
                  type="date"
                  id="wd-available-until"
                  style={{ width: "145px" }}
                  value={availableUntil}
                  onChange={(e) => setAvailableUntil(e.target.value)}
                />
              </td>
              <br />
            </tr>
          </div>
          <br></br>
        </tr>
      </table>
      {currentUser.role === "FACULTY" && (
        <div style={{ paddingLeft: "255npx", paddingTop: "10px" }}>
          <Link to={`/Kambaz/Courses/${cid}/Quizzes`}>
            <Button
              id="wd-cancel-button"
              variant="secondary"
              style={{ marginRight: "5px" }}
            >
              Cancel
            </Button>
          </Link>
          <Link to={`/Kambaz/Courses/${cid}/Quizzes/${qid}`}>
            <Button
              id="wd-save-button"
              variant="danger"
              style={{ marginRight: "5px" }}
              onClick={handleSave}
            >
              Save
            </Button>
          </Link>
          <Link to={`/Kambaz/Courses/${cid}/Quizzes`}>
            <Button
              id="wd-save-button"
              variant="danger"
              onClick={handleSavePublish}
            >
              Save and Publish
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
