/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const ASSIGNMENTS_API = `${REMOTE_SERVER}/api/assignments`;
const COURSES_API = `${REMOTE_SERVER}/api/courses`;

export const fetchAllAssignments = async () => {
  const { data } = await axios.get(ASSIGNMENTS_API);
  return data;
};

export const findAssignmentsForCourse = async (courseId: string) => {
  const { data } = await axios.get(`${COURSES_API}/${courseId}/assignments`);
  return data;
};

export const createAssignmentForCourse = async (courseId: string, assignment: any) => {
  const { data } = await axios.post(`${COURSES_API}/${courseId}/assignments`, assignment);
  return data;
};

export const updateAssignment = async (assignment: any) => {
  const { data } = await axios.put(`${ASSIGNMENTS_API}/${assignment._id}`, assignment);
  return data;
};

export const deleteAssignment = async (id: string) => {
  const { data } = await axios.delete(`${ASSIGNMENTS_API}/${id}`);
  return data;
};
