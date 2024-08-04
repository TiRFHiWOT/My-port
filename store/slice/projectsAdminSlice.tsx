import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchProjects,
  addProject,
  updateProject,
  deleteProject,
  uploadImage,
} from "@/components/Projects/Firebase/Firebase";

interface Project {
  title: string;
  description: string;
  gitUrl?: string;
  previewUrl?: string;
  images: string[];
  id?: string;
}

interface ProjectsState {
  projects: Project[];
  loading: boolean;
  error: string | null;
}

const initialState: ProjectsState = {
  projects: [],
  loading: false,
  error: null,
};

export const getProjects = createAsyncThunk(
  "projectsAdmin/getProjects",
  async () => {
    const response = await fetchProjects();
    return response.reverse();
  }
);

export const createProject = createAsyncThunk(
  "projectsAdmin/createProject",
  async (project: Project, { rejectWithValue }) => {
    try {
      const uploadedImages = project.images.length
        ? await Promise.all(project.images.map((image) => uploadImage(image)))
        : [];
      const response = await addProject({ ...project, images: uploadedImages });
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const modifyProject = createAsyncThunk(
  "projectsAdmin/modifyProject",
  async (
    { id, project }: { id: string; project: Project },
    { rejectWithValue }
  ) => {
    try {
      const uploadedImages = project.images.length
        ? await Promise.all(project.images.map((image) => uploadImage(image)))
        : [];
      await updateProject(id, { ...project, images: uploadedImages });
      return { id, project: { ...project, images: uploadedImages } };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const removeProject = createAsyncThunk(
  "projectsAdmin/removeProject",
  async (id: string) => {
    await deleteProject(id);
    return id;
  }
);

const projectsAdminSlice = createSlice({
  name: "projectsAdmin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProjects.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload;
      })
      .addCase(getProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch projects";
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.projects.unshift(action.payload);
      })
      .addCase(modifyProject.fulfilled, (state, action) => {
        const index = state.projects.findIndex(
          (p) => p.id === action.payload.id
        );
        if (index !== -1) {
          state.projects[index] = action.payload.project;
        }
      })
      .addCase(removeProject.fulfilled, (state, action) => {
        state.projects = state.projects.filter((p) => p.id !== action.payload);
      });
  },
});

export default projectsAdminSlice.reducer;
