import { createSlice } from '@reduxjs/toolkit'

export const modalSlice = createSlice({
    name: 'modal',
    initialState: {
        value: false,
    },
    reducers: {
        showModal: (state, action) => {
            state.value = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { showModal } = modalSlice.actions

export default modalSlice.reducer