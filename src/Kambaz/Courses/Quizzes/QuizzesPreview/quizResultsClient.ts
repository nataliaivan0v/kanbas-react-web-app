import axios from "axios";

const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const QUIZRESULTS_API = `${REMOTE_SERVER}/api/quizresults`;

const axiosWithCredentials = axios.create({ withCredentials: true });

export const fetchQuizResults = async (
  quizId: string,
  userId: string
) => {
  const { data } = await axiosWithCredentials.get(
    `${QUIZRESULTS_API}/${quizId}/users/${userId}`
  );
  console.log(data)
  return data;
};

export const updateQuizResults = async (quizId: String, userId: string, results: any) => {
    console.log("UPDATING QUIZ RESULTS")
    console.log(results)
    const { data } = await axiosWithCredentials.put(`${QUIZRESULTS_API}/${quizId}/users/${userId}`, results);
    return data
}