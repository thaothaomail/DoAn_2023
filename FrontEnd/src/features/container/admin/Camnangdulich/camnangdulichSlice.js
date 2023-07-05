import camnangdulichApi from "../../../../api/camnangdulichApi";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const camnangdulichData = createAsyncThunk('camnangdulichs/camnangdulichData', async () => {
    const camnangdulich = await camnangdulichApi.getAll();
    return camnangdulich;
})
const Camnangdulich = createSlice({
    name: "camnangdulichs",
    initialState: {
        camnangdulich: [],
        loading: true,
        error: ''
    },
    reducers: {
        addcamnangdulich: (state, action) => {
            camnangdulichApi.postcamnangdulich(action.payload);
        },
        removecamnangdulich: (state, action) => {
            camnangdulichApi.deletecamnangdulich(action.payload);
        },
        updatecamnangdulich: (state, action) => {
            camnangdulichApi.editcamnangdulich(action.payload);
        }
    },
    extraReducers: {
        [camnangdulichData.pending]: (state) => {
            state.loading = true;
        },
        [camnangdulichData.rejected]: (state, action) => {
            state.loading = true;
            state.error = action.error;
        },
        [camnangdulichData.fulfilled]: (state, action) => {
            state.loading = false;
            state.camnangdulich = action.payload;
        }
    }
});
const { reducer, actions } = Camnangdulich;
export const { addcamnangdulich, removecamnangdulich, updatecamnangdulich } = actions;

export default reducer;
