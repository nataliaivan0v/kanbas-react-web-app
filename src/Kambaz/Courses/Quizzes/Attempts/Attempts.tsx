import { useEffect, useState } from "react";
import { getStudentAttempts } from "./client"; // adjust this import if needed
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  return `${mins} minute${mins !== 1 ? "s" : ""}`;
};


export default function Attempts({
  quizId,
  studentId,
}: {
  quizId: string;
  studentId: string;
}) {
  const [attempts, setAttempts] = useState<any[]>([]);
  const navigate = useNavigate();


  useEffect(() => {
    const loadAttempts = async () => {
      try {
        const data = await getStudentAttempts(quizId, studentId);
        setAttempts(data);
      } catch (err) {
        console.error("Failed to load attempts", err);
      }
    };
    console.log("attempts", attempts)


    if (quizId && studentId) loadAttempts();
  }, [quizId, studentId]);

  return (
    <div className="mt-5">
      <h3 className="fw-bold mb-4">Attempt History</h3>

      <Table bordered hover responsive>
        <thead className="table-light">
          <tr>
            <th></th>
            <th>Attempt</th>
            <th>Time</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
                {attempts.map((attempt, index) => (
                    <tr
                    key={index}
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                        navigate(`/Kambaz/Courses/${attempt.courseId}/Quizzes/${attempt.quizId}/Answers`, {
                        state: { answers: attempt.answers, timeTaken: attempt.timeTaken }
                        })
                    }
                    >
                    <td className="fw-bold text-danger">
                        {index === 0 ? "LATEST" : ""}
                    </td>
                    <td>{`Attempt ${attempts.length - index}`}</td>
                    <td>{attempt.duration || formatTime(attempt.timeTaken)}</td>
                    <td>{`${attempt.score} out of ${attempt.total}`}</td>
                    </tr>
                ))}
                </tbody>
      </Table>
    </div>
  );
}
