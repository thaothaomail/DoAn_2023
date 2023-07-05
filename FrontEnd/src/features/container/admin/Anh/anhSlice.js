import anhApi from "../../../../api/anhApi";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const anhData = createAsyncThunk('anhs/anhData', async () => {
    const anh = await anhApi.getAll();
    return anh;
})
const Anh = createSlice({
    name: "anhs",
    initialState: {
        anh: [],
        loading: true,
        error: ''
    },
    reducers: {
        addanh: (state, action) => {
            anhApi.postanh(action.payload);
        },
        removeanh: (state, action) => {
            anhApi.deleteanh(action.payload);
        },
        updateanh: (state, action) => {
            anhApi.editanh(action.payload);
        }
    },
    extraReducers: {
        [anhData.pending]: (state) => {
            state.loading = true;
        },
        [anhData.rejected]: (state, action) => {
            state.loading = true;
            state.error = action.error;
        },
        [anhData.fulfilled]: (state, action) => {
            state.loading = false;
            state.anh = action.payload;
        }
    }
});
const { reducer, actions } = Anh;
export const { addanh, removeanh, updateanh } = actions;

export default reducer;
