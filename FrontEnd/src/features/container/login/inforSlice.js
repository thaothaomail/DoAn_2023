import inforApi from "../../../api/inforApi";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const inforData = createAsyncThunk('infors/inforData', async () => {
    const infor = await inforApi.infor();
    return infor;
})
const Infor = createSlice({
    name: "infors",
    initialState: {
        infor: [],
        loading: true,
        error: ''
    },
    reducers: {
        addinfor: (state, action) => {
            inforApi.postinfor(action.payload);
        },
        removeinfor: (state, action) => {
            inforApi.deleteinfor(action.payload);
        },
        updateinfor: (state, action) => {
            inforApi.editinfor(action.payload);
        }
    },
    extraReducers: {
        [inforData.pending]: (state) => {
            state.loading = true;
        },
        [inforData.rejected]: (state, action) => {
            state.loading = true;
            state.error = action.error;
        },
        [inforData.fulfilled]: (state, action) => {
            state.loading = false;
            state.infor = action.payload;
        }
    }
});
const { reducer, actions } = Infor;
export const { addinfor, removeinfor, updateinfor } = actions;

export default reducer;
