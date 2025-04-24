import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import * as client from "../client";
import QuizQuestion from "./QuizQuestion";
import QuizScoreFooter from "./QuizFooter";
import Attempts from "../Attempts/Attempts"; 
import * as clientAttempts from "../Attempts/client";
import { useSelector } from "react-redux"; 
import { fetchQuestionsForQuiz } from "../quizQuestionsClient";

export default function QuizAnswerPage() {
  const { cid, qid } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const [quiz, setQuiz] = useState<any>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const correctCount = questions.filter((q) => {
    const userAnswer = answers[q._id];
    const correctAnswer = q.choices[q.correct_answer_index];
    return userAnswer === correctAnswer;
  }).length;

  const [hasAttempt, setHasAttempt] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      if (!qid || !currentUser?._id) return;
  
      const quizData = await client.fetchQuizById(qid);
      const actualQuiz = Array.isArray(quizData) ? quizData[0] : quizData;
      setQuiz(actualQuiz);
  
      const qs = await fetchQuestionsForQuiz(qid);
      setQuestions(qs);
  
      const allAttempts = await clientAttempts.getStudentAttempts(qid, currentUser._id);
      const latest = allAttempts?.[0];
  
      if (latest) {
        setHasAttempt(true);
  
        const mapped = latest.answers.reduce((acc: any, curr: any) => {
          acc[curr.questionId] = curr.selectedAnswer;
          return acc;
        }, {});
        setAnswers(mapped);
      } else {
        setHasAttempt(false);
      }
    };
  
    fetchData(); 
  }, [qid, currentUser]);
  
  return (
    <Container className="mt-4">
      <h3 className="fw-bold">{quiz?.title}</h3>
      <h5 className="text-muted">Quiz Instructions</h5>
      <p className="fw-bold">{quiz?.description}</p>
      <hr />

      {/* Show attempt history */}
      {qid && currentUser?._id && (
        <div className="mt-5">
          <Attempts quizId={qid} studentId={currentUser._id} />
        </div>
      )}

      {/* Show questions with answers */}
      {hasAttempt && questions.map((q: any, index: number) => (
          <QuizQuestion
            key={q._id}
            q={q}
            index={index}
            answers={answers}
            submitted={true}
            handleAnswer={() => {}}
          />
        ))}

      {/* Score footer */}
      {hasAttempt && (
        <QuizScoreFooter
          score={correctCount}
          total={questions.length}
          onNext={() => navigate(`/Kambaz/Courses/${cid}`)}
        />
      )}

      {!hasAttempt && (
        <div className="text-muted mt-4">
          No attempts yet. Try taking the quiz to see your answers here!
        </div>
      )}
    </Container>
  );
}
