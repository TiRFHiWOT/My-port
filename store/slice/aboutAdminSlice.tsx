import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

interface AboutItem {
  id: string;
  description: string;
  image: string;
  cv: string;
}

interface AboutState {
  about: AboutItem | null;
  loading: boolean;
  error: string | null;
}

const initialState: AboutState = {
  about: null,
  loading: false,
  error: null,
};

export const fetchAbout = createAsyncThunk("about/fetchAbout", async () => {
  const db = getFirestore();
  const aboutRef = doc(db, "about", "aboutInfo");
  const aboutDoc = await getDoc(aboutRef);

  if (aboutDoc.exists()) {
    return { id: aboutDoc.id, ...aboutDoc.data() } as AboutItem;
  } else {
    throw new Error("About data not found");
  }
});

export const saveAbout = createAsyncThunk(
  "about/saveAbout",
  async (aboutData: Omit<AboutItem, "id">) => {
    const db = getFirestore();
    const aboutRef = doc(db, "about", "aboutInfo");
    await setDoc(aboutRef, aboutData, { merge: true });
    return { id: aboutRef.id, ...aboutData };
  }
);

const aboutSlice = createSlice({
  name: "about",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAbout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchAbout.fulfilled,
        (state, action: PayloadAction<AboutItem>) => {
          state.about = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchAbout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch About data";
      })
      .addCase(saveAbout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        saveAbout.fulfilled,
        (state, action: PayloadAction<AboutItem>) => {
          state.about = action.payload;
          state.loading = false;
        }
      )
      .addCase(saveAbout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to save About data";
      });
  },
});

export default aboutSlice.reducer;
