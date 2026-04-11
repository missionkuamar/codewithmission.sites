import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  darkMode: localStorage.getItem('darkMode') === 'true',
  sidebarOpen: false,
  loading: false,
  notification: null,
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode
      localStorage.setItem('darkMode', state.darkMode)
      if (state.darkMode) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    },
    setSidebarOpen: (state, action) => {
      state.sidebarOpen = action.payload
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    showNotification: (state, action) => {
      state.notification = action.payload
    },
    clearNotification: (state) => {
      state.notification = null
    },
  },
})

export const {
  toggleDarkMode,
  setSidebarOpen,
  setLoading,
  showNotification,
  clearNotification,
} = uiSlice.actions

export default uiSlice.reducer