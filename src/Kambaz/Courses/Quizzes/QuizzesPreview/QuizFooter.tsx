import { Button } from "react-bootstrap";

interface QuizScoreFooterProps {
  score: number;
  total: number;
  onNext: () => void;
}

export default function QuizScoreFooter({ score, total, onNext }: QuizScoreFooterProps) {
  return (
    <div className="mt-5">
      <div className="d-flex justify-content-end align-items-center">
        <h5 className="fw-bold me-3">Quiz Score: {score} out of {total}</h5>
        <Button variant="secondary" onClick={onNext}>
          Next
        </Button>
      </div>
      <hr style={{ borderTop: "1px solid #ccc" }} />
    </div>
  );
}
