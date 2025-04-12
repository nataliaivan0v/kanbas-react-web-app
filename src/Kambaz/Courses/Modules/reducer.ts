import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  modules: [],
};
const modulesSlice = createSlice({
  name: "modules",
  initialState,
  reducers: {
    setModules: (state, { payload: modules }) => {
      state.modules = modules;
    }, 
    addModule: (state, { payload: module }) => {
      const newModule: any = { // eslint-disable-line @typescript-eslint/no-explicit-any
        _id: uuidv4(),
        lessons: [],
        name: module.name,
        course: module.course,
      };
      state.modules = [...state.modules, newModule] as any; // eslint-disable-line @typescript-eslint/no-explicit-any
    },
    deleteModule: (state, { payload: moduleId }) => {
      state.modules = state.modules.filter(
        (m: any) => m._id !== moduleId); // eslint-disable-line @typescript-eslint/no-explicit-any
    },
    updateModule: (state, { payload: module }) => {
      state.modules = state .modules.map((m: any) => // eslint-disable-line @typescript-eslint/no-explicit-any
        m._id === module._id ? module : m
      ) as any; // eslint-disable-line @typescript-eslint/no-explicit-any
    },
    editModule: (state, { payload: moduleId }) => {
      state.modules = state.modules.map((m: any) => // eslint-disable-line @typescript-eslint/no-explicit-any
        m._id === moduleId ? { ...m, editing: true } : m
      ) as any; // eslint-disable-line @typescript-eslint/no-explicit-any
    },
  },
});
export const { addModule, deleteModule, updateModule, editModule, setModules } = modulesSlice.actions;
export default modulesSlice.reducer;