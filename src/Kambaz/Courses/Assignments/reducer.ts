import { createSlice } from "@reduxjs/toolkit";
import { assignments } from "../../Database";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  assignments: assignments,
};

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    addAssignment: (state, { payload: assignment }) => {
      const newAssignment: any = { // eslint-disable-line @typescript-eslint/no-explicit-any
        _id: uuidv4(),
        title: assignment.title,
        course: assignment.course,
        description: assignment.description,
        dueDate: assignment.dueDate,
        availableFrom: assignment.availableFrom,
        availableUntil: assignment.availableUntil,
        points: assignment.points,
      };
      state.assignments = [...state.assignments, newAssignment] as any; // eslint-disable-line @typescript-eslint/no-explicit-any
    },
    deleteAssignment: (state, { payload: assignmentId }) => {
      state.assignments = state.assignments.filter(
        (a: any) => a._id !== assignmentId // eslint-disable-line @typescript-eslint/no-explicit-any
      );
    },
    updateAssignment: (state, { payload: assignment }) => {
      state.assignments = state.assignments.map((a: any) => // eslint-disable-line @typescript-eslint/no-explicit-any
        a._id === assignment._id ? assignment : a
      ) as any; // eslint-disable-line @typescript-eslint/no-explicit-any
    },
  },
});

export const { addAssignment, deleteAssignment, updateAssignment } =
  assignmentsSlice.actions;
export default assignmentsSlice.reducer;