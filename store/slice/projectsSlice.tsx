import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { db } from "@/app/firebaseConfig";
import { getDocs, collection, query, limit } from "firebase/firestore";

interface Project {
  id: string;
  gitUrl?: string;
  previewUrl?: string;
}

interface ProjectsState {
  allProjects: Project[];
  loading: boolean;
  tag: string;
}

export const fetchProjects = createAsyncThunk(
  "projects/fetchProjects",
  async () => {
    const projectsCollectionRef = collection(db, "projects");
    const data = await getDocs(query(projectsCollectionRef, limit(6)));
    return data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
  }
);

const initialState: ProjectsState = {
  allProjects: [],
  loading: false,
  tag: "ALL",
};

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    setTag: (state, action: PayloadAction<string>) => {
      state.tag = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchProjects.fulfilled,
        (state, action: PayloadAction<Project[]>) => {
          state.loading = false;
          state.allProjects = action.payload;
        }
      )
      .addCase(fetchProjects.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setTag } = projectsSlice.actions;

export default projectsSlice.reducer;
