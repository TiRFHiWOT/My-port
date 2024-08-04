import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "@/app/firebaseConfig";
import { getDocs, collection } from "firebase/firestore";

export const fetchExperience = createAsyncThunk(
  "workExperience/fetchExperience",
  async () => {
    const experienceCollectionRef = collection(db, "experience");
    const data = await getDocs(experienceCollectionRef);
    return data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
  }
);

const workExperienceSlice = createSlice({
  name: "workExperience",
  initialState: {
    experience: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExperience.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchExperience.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.experience = action.payload;
      })
      .addCase(fetchExperience.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default workExperienceSlice.reducer;
