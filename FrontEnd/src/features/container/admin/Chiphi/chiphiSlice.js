import chiphiApi from "../../../../api/chiphiApi";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const chiphiData = createAsyncThunk('chiphis/chiphiData', async () => {
    const chiphi = await chiphiApi.getAll();
    return chiphi;
})
const Chiphi = createSlice({
    name: "chiphis",
    initialState: {
        chiphi: [],
        loading: true,
        error: ''
    },
    reducers: {
        addchiphi: (state, action) => {
            chiphiApi.postchiphi(action.payload);
        },
        removechiphi: (state, action) => {
            chiphiApi.deletechiphi(action.payload);
        },
        updatechiphi: (state, action) => {
            chiphiApi.editchiphi(action.payload);
        }
    },
    extraReducers: {
        [chiphiData.pending]: (state) => {
            state.loading = true;
        },
        [chiphiData.rejected]: (state, action) => {
            state.loading = true;
            state.error = action.error;
        },
        [chiphiData.fulfilled]: (state, action) => {
            state.loading = false;
            state.chiphi = action.payload;
        }
    }
});
const { reducer, actions } = Chiphi;
export const { addchiphi, removechiphi, updatechiphi } = actions;

export default reducer;
