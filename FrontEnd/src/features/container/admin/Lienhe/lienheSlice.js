import lienheApi from "../../../../api/lienheApi";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const lienheData = createAsyncThunk('lienhes/lienheData', async () => {
    const lienhe = await lienheApi.getAll();
    return lienhe;
})
const Lienhe = createSlice({
    name: "lienhes",
    initialState: {
        lienhe: [],
        loading: true,
        error: ''
    },
    reducers: {
        addlienhe: (state, action) => {
            lienheApi.postlienhe(action.payload);
        },
        removelienhe: (state, action) => {
            lienheApi.deletelienhe(action.payload);
        },
        updatelienhe: (state, action) => {
            lienheApi.editlienhe(action.payload);
        }
    },
    extraReducers: {
        [lienheData.pending]: (state) => {
            state.loading = true;
        },
        [lienheData.rejected]: (state, action) => {
            state.loading = true;
            state.error = action.error;
        },
        [lienheData.fulfilled]: (state, action) => {
            state.loading = false;
            state.lienhe = action.payload;
        }
    }
});
const { reducer, actions } = Lienhe;
export const { addlienhe, removelienhe, updatelienhe } = actions;

export default reducer;
