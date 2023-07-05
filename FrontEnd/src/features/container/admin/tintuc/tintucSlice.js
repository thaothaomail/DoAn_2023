import tintucApi from "../../../../api/tintucApi";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const tintucData = createAsyncThunk('tintucs/tintucData', async () => {
    const tintuc = await tintucApi.getAll();
    return tintuc;
})
const Tintuc = createSlice({
    name: "tintucs",
    initialState: {
        tintuc: [],
        Loading: true,
        error: ''
    },
    reducers: {

        addtintuc: (state, action) => {
            tintucApi.posttintuc(action.payload);
        },
        removetintuc: (state, action) => {
            tintucApi.deletetintuc(action.payload);
        },
        updatetintuc: (state, action) => {
            tintucApi.edittintuc(action.payload);
        }
    },
    extraReducers: {
        [tintucData.pending]: (state) => {
            state.Loading = true;
        },
        [tintucData.rejected]: (state, action) => {
            state.Loading = true;
            state.error = action.error;
        },
        [tintucData.fulfilled]: (state, action) => {
            state.Loading = false;
            state.tintuc = action.payload;
        }
    }
});
const { reducer, actions } = Tintuc;
export const { addtintuc, removetintuc, updatetintuc } = actions;

export default reducer;
