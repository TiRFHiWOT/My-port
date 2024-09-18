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
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchProjects();
      return response.reverse();
    } catch (error) {
      return rejectWithValue("Failed to fetch projects");
    }
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
      return rejectWithValue("Failed to create project");
    }
  }
);

export const modifyProject = createAsyncThunk(
  "projectsAdmin/modifyProject",
  async (
    { id, project }: { id: string; project: Project },
    { getState, rejectWithValue }
  ) => {
    const state = getState() as RootState;
    const existingProject = state.projectsAdmin.projects.find(
      (p) => p.id === id
    );

    let images = existingProject?.images || [];

    if (project.images.length > 0) {
      const uploadedImages = await Promise.all(
        project.images.map(async (image) => {
          if (!images.includes(image)) {
            return await uploadImage(image);
          }
          return image;
        })
      );

      images = [...new Set([...images, ...uploadedImages])];
    }

    const updatedProject = { ...project, images };

    try {
      await updateProject(id, updatedProject);
      return { id, project: updatedProject };
    } catch (error) {
      return rejectWithValue("Failed to update project");
    }
  }
);

export const removeProject = createAsyncThunk(
  "projectsAdmin/removeProject",
  async (id: string, { rejectWithValue }) => {
    try {
      await deleteProject(id);
      return id;
    } catch (error) {
      return rejectWithValue("Failed to remove project");
    }
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
        state.error = null;
      })
      .addCase(getProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload;
      })
      .addCase(getProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to fetch projects";
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
      .addCase(removeProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeProject.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = state.projects.filter((p) => p.id !== action.payload);
      })
      .addCase(removeProject.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to remove project";
      });
  },
});

export default projectsAdminSlice.reducer;
