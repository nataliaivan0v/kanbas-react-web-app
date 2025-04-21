// import { useEffect, useState } from "react";
// import { useLocation, useParams } from "react-router-dom";
// import { Container, Card, Row, Col } from "react-bootstrap";
// import { FaArrowRight, FaTimesCircle } from "react-icons/fa";
// import * as client from "../client";

// export default function QuizAnswerPage() {
//   const { quizId } = useParams();
//   const { state } = useLocation();
//   const [quiz, setQuiz] = useState<any>(null);
//   const [questions, setQuestions] = useState<any[]>([]);
//   const answers = state?.answers || {};

//   useEffect(() => {
//      if (!quizId) return;
//     const fetchData = async () => {
//       const q = await client.fetchQuizById(quizId);
//       const actualQuiz = Array.isArray(q) ? q[0] : q;
//       setQuiz(actualQuiz);

//       const qs = await client.getQuizQuestions(quizId);
//       setQuestions(qs);
//     };
//     fetchData();
//   }, [quizId]);

//   const getStatus = (q: any) => {
//     const userAnswer = answers[q._id];
//     if (!userAnswer) return "unanswered";
//     return userAnswer === q.correctAnswer ? "correct" : "incorrect";
//   };

//   return (
//     <Container className="mt-4">
//       <h3 className="fw-bold">{quiz?.title}</h3>
//       <h5 className="text-muted">Quiz Instructions</h5>
//       <p className="fw-bold">{quiz?.description}</p>
//       <hr />
  
//       {questions.map((q: any, index: number) => {
//         const status = getStatus(q);
//         const userAnswer = answers[q._id];
//         console.log("Questions", q)
  
//         return (
//           <div key={q._id} className="mb-4">
//             {/* Light gray header */}
//             <div
//               className="px-3 py-2"
//               style={{
//                 backgroundColor: "#f5f5f5",
//                 border: "1px solid #ddd",
//                 borderBottom: "none",
//                 borderTopLeftRadius: "4px",
//                 borderTopRightRadius: "4px",
//                 fontWeight: "bold",
//               }}
//             >
//               Question {index + 1}
//             </div>
  
//             {/* White question box */}
//             <Card style={{ borderTopLeftRadius: "0", borderTopRightRadius: "0" }}>
//               <Card.Body>
//                 <Row>
//                   <Col xs="auto" className="d-flex align-items-start pe-3 pt-1">
//                     {status === "correct" && (
//                       <FaArrowRight style={{ color: "green", fontSize: "20px" }} />
//                     )}
//                     {status === "incorrect" && (
//                       <FaArrowRight style={{ color: "red", fontSize: "20px" }} />
//                     )}
//                     {status === "unanswered" && (
//                       <FaTimesCircle style={{ color: "red", fontSize: "20px" }} />
//                     )}
//                   </Col>
//                   <Col>
//                     <p className="mb-3">{q.text}</p>
  
//                     {status === "unanswered" ? (
//                       <p style={{ color: "red", fontWeight: "bold" }}>Unanswered</p>

//                     ) : (
//                       <>
//                         <p>
//                           <strong>Your answer:</strong>{" "}
//                           <span
//                             style={{
//                               color: status === "correct" ? "green" : "red",
//                               fontWeight: "bold",
//                             }}
//                           >
//                             {userAnswer}
//                           </span>
//                         </p>
//                         {status === "incorrect" && (
//                           <p>
//                             <strong>Correct answer:</strong>{" "}
//                             <span style={{ fontWeight: "bold" }}>{q.correctAnswer}</span>
//                           </p>
//                         )}
//                       </>
//                     )}
//                   </Col>
//                 </Row>
//               </Card.Body>
//             </Card>
//           </div>
//         );
//       })}
//     </Container>
//   );}
  
  
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
          submitted={true} // ✅ always true for answer page
          handleAnswer={() => {}} // ✅ no-op
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
