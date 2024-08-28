import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchWorkExperience,
  addWorkExperience,
  updateWorkExperience,
  deleteWorkExperience,
} from "@/components/Work/Firebase/Firbase";

const initialState = {
  workExperiences: [],
  currentWorkExperience: {
    position: "",
    place: "",
    year: "",
    skillsUsed: "",
    pointOne: "",
    pointTwo: "",
    pointThree: "",
  },
  loading: false,
  isUpdating: false,
  currentWorkExperienceId: null,
  error: null,
};

export const getWorkExperiences = createAsyncThunk(
  "workExperienceAdmin/getWorkExperiences",
  async () => {
    const workExperienceList = await fetchWorkExperience();
    return workExperienceList.reverse();
  }
);

export const createWorkExperience = createAsyncThunk(
  "workExperienceAdmin/createWorkExperience",
  async (workExperience) => {
    const newWorkExperience = await addWorkExperience(workExperience);
    return newWorkExperience;
  }
);

export const modifyWorkExperience = createAsyncThunk(
  "workExperienceAdmin/modifyWorkExperience",
  async ({ id, workExperience }: any) => {
    await updateWorkExperience(id, workExperience);
    return { id, workExperience };
  }
);

export const removeWorkExperience = createAsyncThunk(
  "workExperienceAdmin/removeWorkExperience",
  async (id) => {
    await deleteWorkExperience(id);
    return id;
  }
);

const workExperienceAdminSlice = createSlice({
  name: "workExperienceAdmin",
  initialState,
  reducers: {
    setCurrentWorkExperience(state, action) {
      state.currentWorkExperience = action.payload;
    },
    setUpdating(state, action) {
      state.isUpdating = action.payload;
    },
    setCurrentWorkExperienceId(state, action) {
      state.currentWorkExperienceId = action.payload;
    },
    resetCurrentWorkExperience(state) {
      state.currentWorkExperience = initialState.currentWorkExperience;
      state.isUpdating = false;
      state.currentWorkExperienceId = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getWorkExperiences.pending, (state) => {
        state.loading = true;
      })
      .addCase(getWorkExperiences.fulfilled, (state, action) => {
        state.loading = false;
        state.workExperiences = action.payload;
      })
      .addCase(getWorkExperiences.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createWorkExperience.fulfilled, (state, action) => {
        state.workExperiences = [action.payload, ...state.workExperiences];
      })
      .addCase(modifyWorkExperience.fulfilled, (state, action) => {
        const index = state.workExperiences.findIndex(
          (w) => w.id === action.payload.id
        );
        if (index !== -1) {
          state.workExperiences[index] = {
            ...action.payload.workExperience,
            id: action.payload.id,
          };
        }
      })
      .addCase(removeWorkExperience.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeWorkExperience.fulfilled, (state, action) => {
        state.loading = false;
        state.workExperiences = state.workExperiences.filter(
          (w) => w.id !== action.payload
        );
      });
  },
});

export const {
  setCurrentWorkExperience,
  setUpdating,
  setCurrentWorkExperienceId,
  resetCurrentWorkExperience,
} = workExperienceAdminSlice.actions;

export default workExperienceAdminSlice.reducer;
