import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "@/app/firebaseConfig";
import { RootState } from "@/store/store";

interface Contact {
  id?: string;
  description: string;
  email: string;
  phone: string;
  telegram: string;
  linkedin: string;
  github: string;
}

interface ContactState {
  contacts: Contact[];
  loading: boolean;
  error: string | null;
}

const initialState: ContactState = {
  contacts: [],
  loading: false,
  error: null,
};

export const fetchContacts = createAsyncThunk(
  "contact/fetchContacts",
  async () => {
    const querySnapshot = await getDocs(collection(db, "contacts"));
    const contacts: Contact[] = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Contact[];
    return contacts;
  }
);

export const saveContact = createAsyncThunk(
  "contact/saveContact",
  async (contact: Contact) => {
    if (contact.id) {
      await setDoc(doc(db, "contacts", contact.id), contact);
      return contact;
    } else {
      const docRef = await addDoc(collection(db, "contacts"), contact);
      return { id: docRef.id, ...contact };
    }
  }
);

export const removeContact = createAsyncThunk(
  "contact/removeContact",
  async (id: string) => {
    await deleteDoc(doc(db, "contacts", id));
    return id;
  }
);

const contactAdminSlice = createSlice({
  name: "contactAdmin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.contacts = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch contacts";
      })
      .addCase(saveContact.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveContact.fulfilled, (state, action) => {
        state.loading = false;
        // Update the state to add or update a contact in the list
        const existingContactIndex = state.contacts.findIndex(
          (c) => c.id === action.payload.id
        );
        if (existingContactIndex !== -1) {
          state.contacts[existingContactIndex] = action.payload;
        } else {
          state.contacts.push(action.payload);
        }
      })
      .addCase(saveContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to save contact";
      })
      .addCase(removeContact.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeContact.fulfilled, (state, action) => {
        state.loading = false;
        state.contacts = state.contacts.filter(
          (contact) => contact.id !== action.payload
        );
      })
      .addCase(removeContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to remove contact";
      });
  },
});

export default contactAdminSlice.reducer;
export const selectContacts = (state: RootState) => state.contactAdmin.contacts;
export const selectLoading = (state: RootState) => state.contactAdmin.loading;
export const selectError = (state: RootState) => state.contactAdmin.error;
