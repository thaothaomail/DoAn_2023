import chitieuApi from "../../../../api/chitieuApi";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const chitieuData = createAsyncThunk('chitieus/chitieuData', async () => {
    const chitieu = await chitieuApi.getAll();
    return chitieu;
})
const Chitieu = createSlice({
    name: "chitieus",
    initialState: {
        chitieu: [],
        loading: true,
        error: ''
    },
    reducers: {
        addchitieu: (state, action) => {
            chitieuApi.postchitieu(action.payload);
        },
        removechitieu: (state, action) => {
            chitieuApi.deletechitieu(action.payload);
        },
        updatechitieu: (state, action) => {
            chitieuApi.editchitieu(action.payload);
        }
    },
    extraReducers: {
        [chitieuData.pending]: (state) => {
            state.loading = true;
        },
        [chitieuData.rejected]: (state, action) => {
            state.loading = true;
            state.error = action.error;
        },
        [chitieuData.fulfilled]: (state, action) => {
            state.loading = false;
            state.chitieu = action.payload;
        }
    }
});
const { reducer, actions } = Chitieu;
export const { addchitieu, removechitieu, updatechitieu } = actions;

export default reducer;
