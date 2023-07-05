import mangxahoiApi from "../../../../api/mangxahoiApi";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const mangxahoiData = createAsyncThunk('mangxahois/mangxahoiData', async () => {
    const mangxahoi = await mangxahoiApi.getAll();
    return mangxahoi;
})
const Mangxahoi = createSlice({
    name: "mangxahois",
    initialState: {
        mangxahoi: [],
        loading: true,
        error: ''
    },
    reducers: {
        addmangxahoi: (state, action) => {
            mangxahoiApi.postmangxahoi(action.payload);
        },
        removemangxahoi: (state, action) => {
            mangxahoiApi.deletemangxahoi(action.payload);
        },
        updatemangxahoi: (state, action) => {
            mangxahoiApi.editmangxahoi(action.payload);
        }
    },
    extraReducers: {
        [mangxahoiData.pending]: (state) => {
            state.loading = true;
        },
        [mangxahoiData.rejected]: (state, action) => {
            state.loading = true;
            state.error = action.error;
        },
        [mangxahoiData.fulfilled]: (state, action) => {
            state.loading = false;
            state.mangxahoi = action.payload;
        }
    }
});
const { reducer, actions } = Mangxahoi;
export const { addmangxahoi, removemangxahoi, updatemangxahoi } = actions;

export default reducer;
