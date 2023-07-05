import loaitourApi from "../../../../api/loaitourApi";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const loaitourData = createAsyncThunk('loaitours/loaitourData', async () => {
    const loaitour = await loaitourApi.getAll();
    return loaitour;
})
const Loaitour = createSlice({
    name: "loaitours",
    initialState: {
        loaitour: [],
        loading: true,
        error: ''
    },
    reducers: {
        addloaitour: (state, action) => {
            loaitourApi.postloaitour(action.payload);
        },
        removeloaitour: (state, action) => {
            loaitourApi.deleteLoaitour(action.payload);
        },
        updateloaitour: (state, action) => {
            loaitourApi.editLoaitour(action.payload);
        }
    },
    extraReducers: {
        [loaitourData.pending]: (state) => {
            state.loading = true;
        },
        [loaitourData.rejected]: (state, action) => {
            state.loading = true;
            state.error = action.error;
        },
        [loaitourData.fulfilled]: (state, action) => {
            state.loading = false;
            state.loaitour = action.payload;
        }
    }
});
const { reducer, actions } = Loaitour;
export const { addloaitour, removeloaitour, updateloaitour } = actions;

export default reducer;
