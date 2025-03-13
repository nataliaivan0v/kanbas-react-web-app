import { createSlice } from "@reduxjs/toolkit";
import { enrollments } from "./Database";

const initialState = {
  enrollments: enrollments,
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    enrollInCourse: (state, { payload: { userId, courseId } }) => {
      const isAlreadyEnrolled = state.enrollments.some(
        (e: any) => e.user === userId && e.course === courseId // eslint-disable-line @typescript-eslint/no-explicit-any
      );

      if (!isAlreadyEnrolled) {
        const newEnrollment: any = { // eslint-disable-line @typescript-eslint/no-explicit-any
          _id: `${state.enrollments.length + 1}`,
          user: userId,
          course: courseId,
        };
        state.enrollments = [...state.enrollments, newEnrollment] as any; // eslint-disable-line @typescript-eslint/no-explicit-any
      }
    },
    unenrollFromCourse: (state, { payload: { userId, courseId } }) => {
      state.enrollments = state.enrollments.filter(
        (e: any) => !(e.user === userId && e.course === courseId) // eslint-disable-line @typescript-eslint/no-explicit-any
      );
    },
  },
});

export const { enrollInCourse, unenrollFromCourse } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;
