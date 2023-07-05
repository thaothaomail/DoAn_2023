import binhluanApi from "../../../../api/binhluanApi";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const binhluanData = createAsyncThunk('binhluans/binhluanData', async () => {
    const binhluan = await binhluanApi.getAll();
    return binhluan;
})
const Binhluan = createSlice({
    name: "binhluans",
    initialState: {
        binhluan: [],
        loading: true,
        error: ''
    },
    reducers: {
        addbinhluan: (state, action) => {
            binhluanApi.postbinhluan(action.payload);
        },
        removebinhluan: (state, action) => {
            binhluanApi.deletebinhluan(action.payload);
        },
        updatebinhluan: (state, action) => {
            binhluanApi.editbinhluan(action.payload);
        }
    },
    extraReducers: {
        [binhluanData.pending]: (state) => {
            state.loading = true;
        },
        [binhluanData.rejected]: (state, action) => {
            state.loading = true;
            state.error = action.error;
        },
        [binhluanData.fulfilled]: (state, action) => {
            state.loading = false;
            state.binhluan = action.payload;
        }
    }
});
const { reducer, actions } = Binhluan;
export const { addbinhluan, removebinhluan, updatebinhluan } = actions;

export default reducer;
