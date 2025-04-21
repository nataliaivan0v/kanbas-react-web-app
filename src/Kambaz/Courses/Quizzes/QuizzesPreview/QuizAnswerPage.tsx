import { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import * as client from "../client";
import QuizQuestion from "./QuizQuestion";
import QuizScoreFooter from "./QuizFooter";


export default function QuizAnswerPage() {
  const { cid, quizId } = useParams();
  const { state } = useLocation();
  const [quiz, setQuiz] = useState<any>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const answers = state?.answers || {};
  const navigate = useNavigate();
  const correctCount = questions.filter(q =>
    answers[q._id] === q.choices[q.correct_answer_index]
  ).length;

  useEffect(() => {
    if (!quizId) return;
    const fetchData = async () => {
      const q = await client.fetchQuizById(quizId);
      const actualQuiz = Array.isArray(q) ? q[0] : q;
      setQuiz(actualQuiz);

      const qs = await client.getQuizQuestions(quizId);
      setQuestions(qs);
    };
    fetchData();
  }, [quizId]);

  return (
    <Container className="mt-4">
      <h3 className="fw-bold">{quiz?.title}</h3>
      <h5 className="text-muted">Quiz Instructions</h5>
      <p className="fw-bold">{quiz?.description}</p>
      <hr />

      {questions.map((q: any, index: number) => (
        <QuizQuestion
          key={q._id}
          q={q}
          index={index}
          answers={answers}
          submitted={true} 
          handleAnswer={() => {}} 
        />
      ))}
      <QuizScoreFooter
  score={correctCount}
  total={questions.length}
  onNext={() => navigate(`/Kambaz/Courses/${cid}`)}
/>
    </Container>
    
  );
}
