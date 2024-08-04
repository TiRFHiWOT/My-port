import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchTestimonials } from "@/components/Testimonials/Firebase/Firebase";

interface Testimonial {
  id: string;
  userName: string;
  position: string;
  comment: string;
  profilePicture: string;
}

interface TestimonialState {
  testimonials: Testimonial[];
  loading: boolean;
  error: string | null;
}

const initialState: TestimonialState = {
  testimonials: [],
  loading: false,
  error: null,
};

export const fetchTestimonialsAsync = createAsyncThunk(
  "testimonials/fetchTestimonials",
  async () => {
    const testimonials = await fetchTestimonials();
    return testimonials;
  }
);

const testimonialSlice = createSlice({
  name: "testimonials",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTestimonialsAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTestimonialsAsync.fulfilled, (state, action) => {
        state.testimonials = action.payload;
        state.loading = false;
      })
      .addCase(fetchTestimonialsAsync.rejected, (state, action) => {
        state.error = action.error.message || "Failed to fetch testimonials";
        state.loading = false;
      });
  },
});

export default testimonialSlice.reducer;
