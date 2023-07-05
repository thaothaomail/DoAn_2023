import diadiemApi from "../../../../api/diadiemApi";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const diadiemData = createAsyncThunk('diadiems/diadiemData', async () => {
    const diadiem = await diadiemApi.getAll();
    return diadiem;
})
const Diadiem = createSlice({
    name: "diadiems",
    initialState: {
        diadiem: [],
        loading: true,
        error: ''
    },
    reducers: {
        adddiadiem: (state, action) => {
            diadiemApi.postdiadiem(action.payload);
        },
        removediadiem: (state, action) => {
            diadiemApi.deletediadiem(action.payload);
        },
        updatediadiem: (state, action) => {
            diadiemApi.editdiadiem(action.payload);
        }
    },
    extraReducers: {
        [diadiemData.pending]: (state) => {
            state.loading = true;
        },
        [diadiemData.rejected]: (state, action) => {
            state.loading = true;
            state.error = action.error;
        },
        [diadiemData.fulfilled]: (state, action) => {
            state.loading = false;
            state.diadiem = action.payload;
        }
    }
});
const { reducer, actions } = Diadiem;
export const { adddiadiem, removediadiem, updatediadiem } = actions;

export default reducer;
