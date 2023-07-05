import hoadonApi from "../../../../api/hoadonApi";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const hoadonData = createAsyncThunk('hoadons/hoadonData', async () => {
    const hoadon = await hoadonApi.getAll();
    return hoadon;
})
const Hoadon = createSlice({
    name: "hoadons",
    initialState: {
        hoadon: [],
        loading: true,
        error: ''
    },
    reducers: {
        addhoadon: (state, action) => {
            hoadonApi.posthoadon(action.payload);
        },
        removehoadon: (state, action) => {
            hoadonApi.deletehoadon(action.payload);
        },
        updatehoadon: (state, action) => {
            hoadonApi.edithoadon(action.payload);
        }
    },
    extraReducers: {
        [hoadonData.pending]: (state) => {
            state.loading = true;
        },
        [hoadonData.rejected]: (state, action) => {
            state.loading = true;
            state.error = action.error;
        },
        [hoadonData.fulfilled]: (state, action) => {
            state.loading = false;
            state.hoadon = action.payload;
        }
    }
});
const { reducer, actions } = Hoadon;
export const { addhoadon, removehoadon, updatehoadon } = actions;

export default reducer;
