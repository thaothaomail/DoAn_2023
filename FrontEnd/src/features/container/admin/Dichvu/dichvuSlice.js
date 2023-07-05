import dichvuApi from "../../../../api/dichvuApi";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const dichvuData = createAsyncThunk('dichvus/dichvuData', async () => {
    const dichvu = await dichvuApi.getAll();
    return dichvu;
})
const Dichvu = createSlice({
    name: "dichvus",
    initialState: {
        dichvu: [],
        loading: true,
        error: ''
    },
    reducers: {
        adddichvu: (state, action) => {
            dichvuApi.postdichvu(action.payload);
        },
        removedichvu: (state, action) => {
            dichvuApi.deletedichvu(action.payload);
        },
        updatedichvu: (state, action) => {
            dichvuApi.editdichvu(action.payload);
        }
    },
    extraReducers: {
        [dichvuData.pending]: (state) => {
            state.loading = true;
        },
        [dichvuData.rejected]: (state, action) => {
            state.loading = true;
            state.error = action.error;
        },
        [dichvuData.fulfilled]: (state, action) => {
            state.loading = false;
            state.dichvu = action.payload;
        }
    }
});
const { reducer, actions } = Dichvu;
export const { adddichvu, removedichvu, updatedichvu } = actions;

export default reducer;
