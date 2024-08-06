import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchTestimonials } from "@/components/Testimonials/Firebase/Firebase";

interface Testimonial {
  id: string;
  comment: string;
  userName: string;
  address: string;
  profilePictures?: string[];
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

export const fetchTestimonialsAsync = createAsyncThunk(
  "testimonials/fetchTestimonials",
  async () => {
    const testimonialsData = await fetchTestimonials();
    return testimonialsData;
  }
);

const testimonialsSlice = createSlice({
  name: "testimonials",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTestimonialsAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTestimonialsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.testimonials = action.payload;
      })
      .addCase(fetchTestimonialsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch testimonials";
      });
  },
});

export default testimonialsSlice.reducer;
