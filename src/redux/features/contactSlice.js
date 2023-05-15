import { createSlice } from "@reduxjs/toolkit";

export const contactSlice = createSlice({
  name: "contact",
  initialState: {
    contacts: [],
    searchTerm: "",
  },
  reducers: {
    addContacts: (state, { payload }) => {
      console.log("from contactSlice", payload);
      state.contacts = payload;
    },
    setSearchTerm: (state, { payload }) => {
      state.searchTerm = payload;
      console.log(state.searchTerm);
    },
  },
});

export const { addContacts, setSearchTerm } = contactSlice.actions;
export default contactSlice.reducer;
