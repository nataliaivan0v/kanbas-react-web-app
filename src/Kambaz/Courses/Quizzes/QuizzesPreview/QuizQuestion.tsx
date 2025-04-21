import { Form, Card } from "react-bootstrap";

interface QuizQuestionProps {
  q: any;
  index: number;
  answers: Record<string, string>;
  submitted: boolean;
  handleAnswer: (qid: string, choice: string) => void;
}

export default function QuizQuestion({ q, index, answers, submitted, handleAnswer }: QuizQuestionProps) {
  const userAnswer = answers[q._id];
  const correctAnswer = q.choices[q.correct_answer_index];
  const status = !userAnswer
    ? "unanswered"
    : userAnswer === correctAnswer
    ? "correct"
    : "incorrect";

  return (
    <Card className="mb-3" id={`question-${index}`} style={{ borderRadius: "8px", overflow: "hidden" }}>
      {/* Header inside Card */}
      <Card.Body
        className="py-2 px-3"
        style={{
          backgroundColor: "#f5f5f5",
          borderBottom: "1px solid #ddd",
        }}
      >
        <strong>
          Question {index + 1}{" "}
          {submitted && status === "correct" && <span style={{ color: "green" }}>(Correct)</span>}
          {submitted && status === "incorrect" && <span style={{ color: "red" }}>(Incorrect)</span>}
          {submitted && status === "unanswered" && <span style={{ color: "red" }}>(Unanswered)</span>}
        </strong>
      </Card.Body>

      {/* Main content */}
      <Card.Body className="pt-3">
        <p className="mb-3">{q.text}</p>
        <Form>
          {q.type === "multiple_choice" && q.choices?.map((choice: string) => (
            <Form.Check
              key={choice}
              type="radio"
              name={`q-${q._id}`}
              label={choice}
              disabled={submitted}
              checked={answers[q._id] === choice}
              onChange={() => handleAnswer(q._id, choice)}
              isInvalid={submitted && userAnswer !== correctAnswer && choice === userAnswer}
              isValid={submitted && choice === correctAnswer}
            />
          ))}

          {q.type === "true_false" && ["True", "False"].map((choice: string) => (
            <Form.Check
              key={choice}
              type="radio"
              name={`q-${q._id}`}
              label={choice}
              disabled={submitted}
              checked={answers[q._id] === choice}
              onChange={() => handleAnswer(q._id, choice)}
              isInvalid={submitted && userAnswer !== correctAnswer && choice === userAnswer}
              isValid={submitted && choice === correctAnswer}
            />
          ))}

          {q.type === "fill_blank" && (
            <Form.Control
              type="text"
              placeholder="Type your answer..."
              disabled={submitted}
              value={answers[q._id] || ""}
              onChange={(e) => handleAnswer(q._id, e.target.value)}
              isInvalid={submitted && userAnswer !== correctAnswer}
              isValid={submitted && userAnswer === correctAnswer}
            />
          )}
        </Form>

        {/* Show answers only if submitted */}
        {submitted && (
          <div className="mt-3">
            {status !== "unanswered" && (
              <p>
                <strong>Your answer:</strong>{" "}
                <span
                  style={{
                    color: status === "correct" ? "green" : "red",
                    fontWeight: "bold",
                  }}
                >
                  {userAnswer}
                </span>
              </p>
            )}
            {status === "incorrect" && (
              <p>
                <strong>Correct answer:</strong>{" "}
                <span style={{ fontWeight: "bold" }}>{correctAnswer}</span>
              </p>
            )}
          </div>
        )}
      </Card.Body>
    </Card>
  );
}
