import { configureStore } from "@reduxjs/toolkit";
import dashboardReducer from "./slice/dashboardSlice";
import educationReducer from "./slice/educationSlice";
import educationAdminReducer from "./slice/educationAdminSlice";
import skillsReducer from "./slice/skillsSlice";
import tabReducer from "./slice/aboutTabSlice";
import workExperienceReducer from "./slice/workSlice";
import workExperienceAdminReducer from "./slice/workAdminSlice";
import testimonialReducer from "./slice/testimonialSlice";
import testimonialsAdminReducer from "./slice/testimonialAdminSlice";
import projectsReducer from "./slice/projectsSlice";
import projectsAdminReducer from "./slice/projectsAdminSlice";
import skillsAdminReducer from "./slice/skillsAdminSlice";

export const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
    education: educationReducer,
    educationAdmin: educationAdminReducer,
    skills: skillsReducer,
    skillsAdmin: skillsAdminReducer,
    tab: tabReducer,
    workExperience: workExperienceReducer,
    workExperienceAdmin: workExperienceAdminReducer,
    testimonials: testimonialReducer,
    testimonialsAdmin: testimonialsAdminReducer,
    projects: projectsReducer,
    projectsAdmin: projectsAdminReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
