import { Button } from "react-bootstrap";

interface QuizScoreFooterProps {
  score: number;
  maxScore:number;
  questionsRight: number;
  numOfQuestions: number
  onNext: () => void;
}

export default function QuizScoreFooter({ score, maxScore, questionsRight, numOfQuestions, onNext }: QuizScoreFooterProps) {
  return (
    <div className="mt-5">
      <div className="d-flex justify-content-end align-items-center">
        <h5 className="fw-bold me-3">Score: {score}/{maxScore} points | {questionsRight}/{numOfQuestions} questions. </h5>
        <Button variant="secondary" onClick={onNext}>
          Next
        </Button>
      </div>
      <hr style={{ borderTop: "1px solid #ccc" }} />
    </div>
  );
}
