import hoadoncanhanApi from "../../../../api/hoadoncanhanApi";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const hoadoncanhanData = createAsyncThunk('hoadoncanhans/hoadoncanhanData', async () => {
    const hoadoncanhan = await hoadoncanhanApi.getAll();
    return hoadoncanhan;
})
const Hoadoncanhan = createSlice({
    name: "hoadoncanhans",
    initialState: {
        hoadoncanhan: [],
        loading: true,
        error: ''
    },
    reducers: {
        addhoadoncanhan: (state, action) => {
            hoadoncanhanApi.posthoadoncanhan(action.payload);
        },
        removehoadoncanhan: (state, action) => {
            hoadoncanhanApi.deletehoadoncanhan(action.payload);
        },
        updatehoadoncanhan: (state, action) => {
            hoadoncanhanApi.edithoadoncanhan(action.payload);
        }
    },
    extraReducers: {
        [hoadoncanhanData.pending]: (state) => {
            state.loading = true;
        },
        [hoadoncanhanData.rejected]: (state, action) => {
            state.loading = true;
            state.error = action.error;
        },
        [hoadoncanhanData.fulfilled]: (state, action) => {
            state.loading = false;
            state.hoadoncanhan = action.payload;
        }
    }
});
const { reducer, actions } = Hoadoncanhan;
export const { addhoadoncanhan, removehoadoncanhan, updatehoadoncanhan } = actions;

export default reducer;
