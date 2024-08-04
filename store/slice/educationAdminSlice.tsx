import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchEducation,
  addEducation,
  updateEducationItem,
  deleteEducation,
} from "@/components/Education/Firebase/Firebase";

interface EducationItem {
  id: string;
  name: string;
  institution: string;
  year: string;
}

interface EducationState {
  educations: EducationItem[];
  loading: boolean;
  error: string | null;
}

const initialState: EducationState = {
  educations: [],
  loading: false,
  error: null,
};

export const fetchEducations = createAsyncThunk<EducationItem[]>(
  "education/fetchEducations",
  async () => {
    const response = await fetchEducation();
    return response;
  }
);

export const addEducationItem = createAsyncThunk<EducationItem, EducationItem>(
  "education/addEducationItem",
  async (education) => {
    const response = await addEducation(education);
    return response;
  }
);

export const updateEducation = createAsyncThunk<
  { id: string; education: EducationItem },
  { id: string; education: EducationItem }
>("education/updateEducation", async ({ id, education }) => {
  await updateEducationItem(id, education);
  return { id, education };
});

export const removeEducation = createAsyncThunk<string, string>(
  "education/removeEducation",
  async (id) => {
    await deleteEducation(id);
    return id;
  }
);

const educationSlice = createSlice({
  name: "educationAdmin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEducations.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchEducations.fulfilled,
        (state, action: PayloadAction<EducationItem[]>) => {
          state.loading = false;
          state.educations = action.payload.reverse();
        }
      )
      .addCase(fetchEducations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch educations.";
      })
      .addCase(
        addEducationItem.fulfilled,
        (state, action: PayloadAction<EducationItem>) => {
          state.educations.unshift(action.payload);
        }
      )
      .addCase(
        updateEducation.fulfilled,
        (
          state,
          action: PayloadAction<{ id: string; education: EducationItem }>
        ) => {
          const { id, education } = action.payload;
          const index = state.educations.findIndex((edu) => edu.id === id);
          if (index !== -1) {
            state.educations[index] = { ...education, id };
          }
        }
      )
      .addCase(
        removeEducation.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.educations = state.educations.filter(
            (edu) => edu.id !== action.payload
          );
        }
      );
  },
});

export default educationSlice.reducer;
