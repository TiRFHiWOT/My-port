import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { fetchSkills } from "@/components/Skills/Firebase/Firebase";
import { fetchProjects } from "@/components/Projects/Firebase/Firebase";
import { fetchWorkExperience } from "@/components/Work/Firebase/Firbase";
import { fetchTestimonials } from "@/components/Testimonials/Firebase/Firebase";

interface DashboardState {
  totalSkills: number;
  totalProjects: number;
  totalWorkExperience: number;
  totalTestimonials: number;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: DashboardState = {
  totalSkills: 0,
  totalProjects: 0,
  totalWorkExperience: 0,
  totalTestimonials: 0,
  status: "idle",
  error: null,
};

export const fetchDashboardData = createAsyncThunk(
  "dashboard/fetchDashboardData",
  async () => {
    const [skills, projects, workExperience, testimonials] = await Promise.all([
      fetchSkills(),
      fetchProjects(),
      fetchWorkExperience(),
      fetchTestimonials(),
    ]);

    return {
      skills: skills.length,
      projects: projects.length,
      workExperience: workExperience.length,
      testimonials: testimonials.length,
    };
  }
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchDashboardData.fulfilled,
        (
          state,
          action: PayloadAction<{
            skills: number;
            projects: number;
            workExperience: number;
            testimonials: number;
          }>
        ) => {
          state.status = "succeeded";
          state.totalSkills = action.payload.skills;
          state.totalProjects = action.payload.projects;
          state.totalWorkExperience = action.payload.workExperience;
          state.totalTestimonials = action.payload.testimonials;
        }
      )
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Unknown error";
      });
  },
});

export default dashboardSlice.reducer;
