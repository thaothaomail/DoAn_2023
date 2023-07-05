import tagApi from "../../../../api/tagApi";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const tagData = createAsyncThunk('tags/tagData', async () => {
    const tag = await tagApi.getAll();
    return tag;
})
const Tag = createSlice({
    name: "tags",
    initialState: {
        tag: [],
        loading: true,
        error: ''
    },
    reducers: {
        addtag: (state, action) => {
            tagApi.posttag(action.payload);
        },
        removetag: (state, action) => {
            tagApi.deletetag(action.payload);
        },
        updatetag: (state, action) => {
            tagApi.edittag(action.payload);
        }
    },
    extraReducers: {
        [tagData.pending]: (state) => {
            state.loading = true;
        },
        [tagData.rejected]: (state, action) => {
            state.loading = true;
            state.error = action.error;
        },
        [tagData.fulfilled]: (state, action) => {
            state.loading = false;
            state.tag = action.payload;
        }
    }
});
const { reducer, actions } = Tag;
export const { addtag, removetag, updatetag } = actions;

export default reducer;
