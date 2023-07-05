import tintuctagApi from "../../../../api/tintuctagApi";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const tintuctagData = createAsyncThunk('tintuctags/tintuctagData', async () => {
    const tintuctag = await tintuctagApi.getAll();
    return tintuctag;
})
const Tintuctag = createSlice({
    name: "tintuctags",
    initialState: {
        tintuctag: [],
        Loading: true,
        error: ''
    },
    reducers: {
        addtintuctag: (state, action) => {
            tintuctagApi.posttintuctag(action.payload);
        },
        removetintuctag: (state, action) => {
            tintuctagApi.deletetintuctag(action.payload);
        },
        updatetintuctag: (state, action) => {
            tintuctagApi.edittintuctag(action.payload);
        }
    },
    extraReducers: {
        [tintuctagData.pending]: (state) => {
            state.Loading = true;
        },
        [tintuctagData.rejected]: (state, action) => {
            state.Loading = true;
            state.error = action.error;
        },
        [tintuctagData.fulfilled]: (state, action) => {
            state.Loading = false;
            state.tintuctag = action.payload;
        }
    }
});
const { reducer, actions } = Tintuctag;
export const { addtintuctag, removetintuctag, updatetintuctag } = actions;

export default reducer;
