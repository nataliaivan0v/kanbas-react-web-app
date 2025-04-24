import axios from "axios";
const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const QUIZZES_API = `${REMOTE_SERVER}/api/quizzes`;
// const ATTEMPTS_API = "https://web-app-cs4550-sp25-a6.onrender.com/api/quizzes";

export const submitQuizAttempt = async (
  quizId: string,
  attempt: {
    studentId: string;
    answers: { questionId: string; selectedAnswer: string; isCorrect: boolean }[];
    score: number;
    total: number;
    timeTaken: number;
  }
) => {
  const response = await axios.post(`${QUIZZES_API}/${quizId}/attempts`, attempt, {
    withCredentials: true,
  });
  return response.data;
};

export const getStudentAttempts = async (quizId: string, studentId: string) => {
    const response = await axios.get(`${QUIZZES_API}/${quizId}/attempts/${studentId}`, {
      withCredentials: true,
    });
    return response.data;
  };
