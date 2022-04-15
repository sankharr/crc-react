import { createSlice } from '@reduxjs/toolkit'

export const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState: {
    headerTitle: 'Reservation Calendar',
    navigatePath: '/reservationCalendar'
  },
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
    updateHeaderTitle: (state, action) => {
      state.headerTitle = action.payload;
    },
    updateNavigatePath: (state, action) => {
      state.navigatePath = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount, updateHeaderTitle, updateNavigatePath } = sidebarSlice.actions

export const getMenuTitle = (state) => state.sidebar.headerTitle;

export default sidebarSlice.reducer