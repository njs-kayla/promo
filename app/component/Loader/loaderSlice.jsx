'use client'
import { createSlice } from '@reduxjs/toolkit'

export const loaderSlice = createSlice({
    name: 'loader',
    initialState: {
        value: true,
    },
    reducers: {
        setLoading: (state, action) => {
            state.value = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { setLoading } = loaderSlice.actions

export default loaderSlice.reducer