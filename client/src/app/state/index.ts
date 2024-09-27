import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface InitialStateTypes {
  isSidebarCollapsed: boolean;
  isDarkMode: boolean;
};

const initialState: InitialStateTypes = {
  isSidebarCollapsed: false,
  isDarkMode: false,
};

// Separate these slices out later.
// Maybe remove both sidebar and dark mode from redux state??
export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    toggleSidebar: (state, action: PayloadAction<boolean>) => {
      state.isSidebarCollapsed = action.payload;
    },
    toggleDarkMode: (state, action: PayloadAction<boolean>) => {
      state.isDarkMode = action.payload;
    }
  },
})

export const { toggleSidebar, toggleDarkMode } = globalSlice.actions;
export default globalSlice.reducer;