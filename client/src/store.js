import { configureStore } from '@reduxjs/toolkit'
import sidebarReducer from "./shared/sidebar/sidebarSlice";

export default configureStore({
  reducer: {
      sidebar: sidebarReducer,
  },
})