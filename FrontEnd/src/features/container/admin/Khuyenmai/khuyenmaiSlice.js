import khuyenmaiApi from "../../../../api/khuyenmaiApi";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const khuyenmaiData = createAsyncThunk('khuyenmais/khuyenmaiData', async () => {
    const khuyenmai = await khuyenmaiApi.getAll();
    return khuyenmai;
})
const Khuyenmai = createSlice({
    name: "khuyenmais",
    initialState: {
        khuyenmai: [],
        loading: true,
        error: ''
    },
    reducers: {
        addkhuyenmai: (state, action) => {
            khuyenmaiApi.postkhuyenmai(action.payload);
        },
        removekhuyenmai: (state, action) => {
            khuyenmaiApi.deletekhuyenmai(action.payload);
        },
        updatekhuyenmai: (state, action) => {
            khuyenmaiApi.editkhuyenmai(action.payload);
        }
    },
    extraReducers: {
        [khuyenmaiData.pending]: (state) => {
            state.loading = true;
        },
        [khuyenmaiData.rejected]: (state, action) => {
            state.loading = true;
            state.error = action.error;
        },
        [khuyenmaiData.fulfilled]: (state, action) => {
            state.loading = false;
            state.khuyenmai = action.payload;
        }
    }
});
const { reducer, actions } = Khuyenmai;
export const { addkhuyenmai, removekhuyenmai, updatekhuyenmai } = actions;

export default reducer;
