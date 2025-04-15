/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const QUIZZES_API = `${REMOTE_SERVER}/api/quizzes`;
const COURSES_API = `${REMOTE_SERVER}/api/courses`;

const axiosWithCredentials = axios.create({ withCredentials: true });

export const fetchQuizById = async (quizId: string) => {
  const { data } = await axiosWithCredentials.get(`${QUIZZES_API}/${quizId}`);
  return data;
};

export const fetchAllQuizzes = async () => {
  const { data } = await axiosWithCredentials.get(QUIZZES_API);
  return data;
};

export const findQuizzesForCourse = async (courseId: string) => {
  const { data } = await axiosWithCredentials.get(`${COURSES_API}/${courseId}/quizzes`);
  return data;
};

export const createQuizForCourse = async (courseId: string, quiz: any) => {
  const { data } = await axiosWithCredentials.post(`${COURSES_API}/${courseId}/quizzes`, quiz);
  return data;
};

export const updateQuiz = async (quiz: any) => {
  const { data } = await axiosWithCredentials.put(`${QUIZZES_API}/${quiz._id}`, quiz);
  return data;
};

export const deleteQuiz = async (id: string) => {
  const { data } = await axiosWithCredentials.delete(`${QUIZZES_API}/${id}`);
  return data;
};

export const publishQuiz = async (id: string) => {
  const { data } = await axiosWithCredentials.put(`${QUIZZES_API}/${id}/publish`, {
    published: "Published",
  });
  return data;
};

export const unpublishQuiz = async (id: string) => {
  const { data } = await axiosWithCredentials.put(`${QUIZZES_API}/${id}/unpublish`, {
    published: "Unpublished",
  });
  return data;
};

export const findQuizzesByPartialName = async (title: string) => {
  const response = await axios.get(`${QUIZZES_API}?title=${title}`);
  return response.data;
};