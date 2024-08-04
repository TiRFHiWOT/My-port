import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "@/app/firebaseConfig";
import { getDocs, collection } from "firebase/firestore";

const skillsCollectionRef = collection(db, "skills");

export const fetchSkills = createAsyncThunk("skills/fetchSkills", async () => {
  const data = await getDocs(skillsCollectionRef);
  return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
});

const skillsSlice = createSlice({
  name: "skills",
  initialState: {
    skills: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSkills.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSkills.fulfilled, (state, action) => {
        state.skills = action.payload;
        state.loading = false;
      })
      .addCase(fetchSkills.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default skillsSlice.reducer;
