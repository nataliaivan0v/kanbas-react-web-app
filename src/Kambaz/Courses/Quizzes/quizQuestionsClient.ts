import axios from "axios";

const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const QUIZZES_API = `${REMOTE_SERVER}/api/quizzes`;

const axiosWithCredentials = axios.create({ withCredentials: true });

export const fetchQuestionsForQuiz = async (quizId: string): Promise<any[]> => {
  const { data } = await axiosWithCredentials.get(
    `${QUIZZES_API}/${quizId}/questions`
  );
  return data;
};

export const createQuestionForQuiz = async (
  quizId: string,
  question: any
): Promise<any> => {
  const { data } = await axiosWithCredentials.post(
    `${QUIZZES_API}/${quizId}/questions`,
    question
  );
  return data;
};

export const updateQuizQuestion = async (
  quizId: string,
  question: any
): Promise<any> => {
  const { data } = await axiosWithCredentials.put(
    `${QUIZZES_API}/${quizId}/questions/${question._id}`,
    question
  );
  return data;
};

export const deleteQuizQuestion = async (
  quizId: string,
  questionId: string
): Promise<any> => {
  const { data } = await axiosWithCredentials.delete(
    `${QUIZZES_API}/${quizId}/questions/${questionId}`
  );
  return data;
};
