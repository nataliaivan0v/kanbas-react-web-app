import { useState, useEffect } from "react";
import { Button, Container, Alert } from "react-bootstrap";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { FaPencilAlt } from "react-icons/fa";
import * as client from "../client";
import { fetchQuestionsForQuiz } from "../quizQuestionsClient";
import QuizQuestion from "./QuizQuestion";
import { updateQuizResults } from "./quizResultsClient";
import { useSelector } from "react-redux";

export default function QuizPreview() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { cid, qid } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const isPreview = location.state?.isPreview ?? true;
  const [quiz, setQuiz] = useState<any>(null);
  const [answers, setAnswers] = useState<any>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState<any[]>([]);
  const [startTime, setStartTime] = useState<string>("");

  if (qid == null) return;
  useEffect(() => {
    setAnswers({});
    setSubmitted(false);
    setScore(0);
    setStartTime(new Date().toLocaleString());

    const fetchQuizQs = async () => {
      const q = await client.fetchQuizById(qid);
      const quiz = Array.isArray(q) ? q[0] : q;
      setQuiz(quiz);

      const qs = await fetchQuestionsForQuiz(qid);
      setQuestions(qs);
    };

    if (qid) fetchQuizQs();
  }, [qid]);

  const handleAnswer = (qid: string, choice: string) => {
    setAnswers({ ...answers, [qid]: choice });
  };

  const handleSubmit = () => {
    let correct = 0;
    questions.forEach((q: any) => {
      if (answers[q._id] === q.correctAnswer) correct++;
    });
    if (!isPreview) {
      if (qid) {
        const finalAnswers = Object.fromEntries(
          questions.map((q: any) => [q._id, answers[q._id]])
        );
        const results = {
          lastAnswers: finalAnswers,
          lastScore: correct,
        }
        updateQuizResults(qid, currentUser._id, results) 
      }
    }
    setScore(correct);
    setSubmitted(true);
    navigate(`/Kambaz/Courses/${cid}/Quizzes/${qid}/Answers`, {

      state: { answers },
    });
  };

  const scrollToQuestion = (index: number) => {
    const el = document.getElementById(`question-${index}`);
    el?.scrollIntoView({ behavior: "smooth" });
  };
  console.log("Question", questions);

  return (
    <Container fluid className="d-flex justify-content-center">
      <div style={{ maxWidth: "800px", width: "100%" }}>
        {/* Title */}
        <h3 className="fw-bold">{quiz?.title}</h3>

        {isPreview ?? <h6 style={{ color: 'red' }}><b>This is a preview of the published version of this quiz.</b></h6>}


        {/* Started Time */}
        <div className="text-muted mb-2">Started: {startTime}</div>

        {/* Instructions */}
        <h3>
          <strong>Quiz Instructions</strong>
        </h3>
        <p className="fw-bold">{quiz?.description}</p>
        <hr />

        {submitted && (
          <Alert variant="info">
            You scored {score} out of {questions.length}
          </Alert>
        )}

        {questions?.map((q, index) => (
          <QuizQuestion
            key={q._id}
            q={q}
            index={index}
            answers={answers}
            submitted={false}
            handleAnswer={handleAnswer}
          />
        ))}
        <div
          className="d-flex justify-content-between align-items-center px-3 py-2 mt-4"
          style={{
            border: "1px solid #ccc",
            borderRadius: "2px",
            backgroundColor: "#fff",
          }}
        >
          <div className="text-muted">
            Quiz saved at {startTime.split(",")[1]?.trim()}
          </div>
          {!submitted && (
            <Button variant="secondary" onClick={handleSubmit}>
              Submit Quiz
            </Button>
          )}
        </div>

        <div
          className="d-flex align-items-center mt-3 px-3 py-2"
          style={{
            backgroundColor: "#f5f5f5",
            border: "1px solid #ddd",
            borderRadius: "3px",
            cursor: "pointer",
          }}
          onClick={() =>
            navigate(`/Kambaz/Courses/${cid}/Quizzes/${qid}/Edit`)
          }
        >
          <FaPencilAlt className="me-2 d-flex " style={{ color: "#555" }} />
          <span style={{ fontWeight: 500 }}>Keep Editing This Quiz</span>
        </div>

        <hr />
        <div className="mt-4 mb-5">
          <p className="fw-bold">Questions</p>
          <div className="d-flex flex-column gap-2">
            {questions.map((_, index) => (
              <div
                key={index}
                className="d-flex align-items-center"
                style={{ cursor: "pointer" }}
                onClick={() => scrollToQuestion(index)}
              >
                <div
                  style={{
                    width: "24px",
                    height: "24px",
                    borderRadius: "50%",
                    backgroundColor: "#ccc",
                    color: "white",
                    fontSize: "16px",
                    fontWeight: "bold",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: "10px",
                  }}
                >
                  ?
                </div>

            
                <span style={{ color: "red", fontWeight: "bold" }}>
                  Question {index + 1}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
}
