import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchTestimonials,
  addTestimonial,
  updateTestimonial,
  deleteTestimonial,
  uploadImage,
} from "@/components/Testimonials/Firebase/Firebase";
import { RootState } from "../store";

interface Testimonial {
  comment: string;
  userName: string;
  position: string;
  profilePicture?: string;
  id?: string;
}

interface TestimonialsState {
  testimonials: Testimonial[];
  loading: boolean;
  error: string | null;
}

const initialState: TestimonialsState = {
  testimonials: [],
  loading: false,
  error: null,
};

export const getTestimonials = createAsyncThunk(
  "testimonialsAdmin/getTestimonials",
  async () => {
    const response = await fetchTestimonials();
    return response.reverse();
  }
);

export const createTestimonial = createAsyncThunk(
  "testimonialsAdmin/createTestimonial",
  async (testimonial: Testimonial) => {
    const profilePicture = testimonial.profilePicture
      ? await uploadImage(testimonial.profilePicture)
      : "";
    const response = await addTestimonial({ ...testimonial, profilePicture });
    return response;
  }
);

export const modifyTestimonial = createAsyncThunk(
  "testimonialsAdmin/modifyTestimonial",
  async (
    { id, testimonial }: { id: string; testimonial: Testimonial },
    { getState }
  ) => {
    const state = getState() as RootState;
    const existingTestimonial = state.testimonialsAdmin.testimonials.find(
      (t) => t.id === id
    );

    let profilePicture = existingTestimonial?.profilePicture || "";

    if (
      testimonial.profilePicture &&
      testimonial.profilePicture !== profilePicture
    ) {
    }

    const updatedTestimonial = { ...testimonial, profilePicture };

    await updateTestimonial(id, updatedTestimonial);
    return { id, testimonial: updatedTestimonial };
  }
);

export const removeTestimonial = createAsyncThunk(
  "testimonialsAdmin/removeTestimonial",
  async (id: string) => {
    await deleteTestimonial(id);
    return id;
  }
);

const testimonialsAdminSlice = createSlice({
  name: "testimonialsAdmin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTestimonials.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTestimonials.fulfilled, (state, action) => {
        state.loading = false;
        state.testimonials = action.payload;
      })
      .addCase(getTestimonials.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch testimonials";
      })
      .addCase(createTestimonial.fulfilled, (state, action) => {
        state.testimonials.unshift(action.payload);
      })
      .addCase(modifyTestimonial.fulfilled, (state, action) => {
        const index = state.testimonials.findIndex(
          (t) => t.id === action.payload.id
        );
        if (index !== -1) {
          state.testimonials[index] = action.payload.testimonial;
        }
      })
      .addCase(removeTestimonial.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeTestimonial.fulfilled, (state, action) => {
        state.loading = false;
        state.testimonials = state.testimonials.filter(
          (t) => t.id !== action.payload
        );
      });
  },
});

export default testimonialsAdminSlice.reducer;
