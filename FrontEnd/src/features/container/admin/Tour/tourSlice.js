import tourApi from "../../../../api/tourApi";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const tourData = createAsyncThunk('tours/tourData', async () => {
    const tour = await tourApi.getAll();
    return tour;
})
var datatour = [];
const Tour = createSlice({
    name: "tours",
    initialState: {
        tour: [],
        Loading: true,
        error: ''
    },
    reducers: {

        addtour: (state, action) => {
            tourApi.posttour(action.payload);
        },
        removetour: (state, action) => {
            tourApi.deletetour(action.payload);
        },
        updatetour: (state, action) => {
            tourApi.edittour(action.payload);
        }
    },
    extraReducers: {
        [tourData.pending]: (state) => {
            state.Loading = true;
        },
        [tourData.rejected]: (state, action) => {
            state.Loading = true;
            state.error = action.error;
        },
        [tourData.fulfilled]: (state, action) => {
            state.Loading = false;
            state.tour = action.payload;
        }
    }
});
const { reducer, actions } = Tour;
export const { addtour, removetour, updatetour } = actions;

export default reducer;
