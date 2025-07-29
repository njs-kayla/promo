'use client';
import { configureStore } from '@reduxjs/toolkit'
import modalReducer from '@/component/Modal/modalSlice'
import loaderReducer from '@/component/Loader/loaderSlice'

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    loading: loaderReducer,
  },
})