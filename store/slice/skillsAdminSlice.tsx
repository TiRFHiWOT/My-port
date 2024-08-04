import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchSkills as fetchSkillsFromFirebase,
  addSkill as addSkillToFirebase,
  updateSkillItem as updateSkillItemInFirebase,
  deleteSkill as deleteSkillFromFirebase,
} from "@/components/Skills/Firebase/Firebase";

type Skill = {
  id: string;
  name: string;
  image: string;
};

type SkillsState = {
  skills: Skill[];
  loading: boolean;
  error: string | null;
};

const initialState: SkillsState = {
  skills: [],
  loading: false,
  error: null,
};

export const fetchSkills = createAsyncThunk("skills/fetchSkills", async () => {
  const skills = await fetchSkillsFromFirebase();
  return skills.reverse();
});

export const addSkill = createAsyncThunk(
  "skills/addSkill",
  async (skillData: { name: string; image: string }) => {
    const newSkill = await addSkillToFirebase(skillData);
    return newSkill;
  }
);

export const updateSkill = createAsyncThunk(
  "skills/updateSkill",
  async ({
    id,
    skill,
  }: {
    id: string;
    skill: { name: string; image: string };
  }) => {
    await updateSkillItemInFirebase(id, skill);
    return { id, skill };
  }
);

export const deleteSkill = createAsyncThunk(
  "skills/deleteSkill",
  async (id: string) => {
    await deleteSkillFromFirebase(id);
    return id;
  }
);

const skillsAdminSlice = createSlice({
  name: "skillsAdmin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSkills.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchSkills.fulfilled,
        (state, action: PayloadAction<Skill[]>) => {
          state.loading = false;
          state.skills = action.payload;
        }
      )
      .addCase(fetchSkills.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch skills";
      })
      .addCase(addSkill.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addSkill.fulfilled, (state, action: PayloadAction<Skill>) => {
        state.loading = false;
        state.skills.unshift(action.payload);
      })
      .addCase(addSkill.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to add skill";
      })
      .addCase(updateSkill.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateSkill.fulfilled,
        (state, action: PayloadAction<{ id: string; skill: Skill }>) => {
          state.loading = false;
          const index = state.skills.findIndex(
            (skill) => skill.id === action.payload.id
          );
          if (index !== -1) {
            state.skills[index] = {
              ...state.skills[index],
              ...action.payload.skill,
            };
          }
        }
      )
      .addCase(updateSkill.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update skill";
      })
      .addCase(deleteSkill.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        deleteSkill.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.loading = false;
          state.skills = state.skills.filter(
            (skill) => skill.id !== action.payload
          );
        }
      )
      .addCase(deleteSkill.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to delete skill";
      });
  },
});

export default skillsAdminSlice.reducer;
