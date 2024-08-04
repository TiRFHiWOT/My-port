import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "@/app/firebaseConfig";
import { getDocs, collection } from "firebase/firestore";

interface EducationItem {
  id: string;
  year: string;
}

interface EducationState {
  education: EducationItem[];
  loading: boolean;
  error: string | null;
}

const initialState: EducationState = {
  education: [],
  loading: false,
  error: null,
};

const educationCollectionRef = collection(db, "education");

export const fetchEducation = createAsyncThunk<
  EducationItem[],
  void,
  { rejectValue: string }
>("education/fetchEducation", async (_, thunkAPI) => {
  try {
    const data = await getDocs(educationCollectionRef);
    return data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    })) as EducationItem[];
  } catch (error) {
    const errorMessage =
      (error as Error).message || "Failed to fetch education data";
    return thunkAPI.rejectWithValue(errorMessage);
  }
});

const educationSlice = createSlice({
  name: "education",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEducation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEducation.fulfilled, (state, action) => {
        state.education = action.payload;
        state.loading = false;
      })
      .addCase(fetchEducation.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || action.error.message || "An unknown error occurred";
      });
  },
});

export default educationSlice.reducer;
