import quocgiaApi from "../../../../api/quocgiaApi";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const quocgiaData = createAsyncThunk('quocgias/quocgiaData', async () => {
    const quocgia = await quocgiaApi.getAll();
    return quocgia;
})
const Quocgia = createSlice({
    name: "quocgias",
    initialState: {
        quocgia: [],
        loading: true,
        error: ''
    },
    reducers: {
        addquocgia: (state, action) => {
            quocgiaApi.postquocgia(action.payload);
        },
        removequocgia: (state, action) => {
            quocgiaApi.deletequocgia(action.payload);
        },
        updatequocgia: (state, action) => {
            quocgiaApi.editquocgia(action.payload);
        }
    },
    extraReducers: {
        [quocgiaData.pending]: (state) => {
            state.loading = true;
        },
        [quocgiaData.rejected]: (state, action) => {
            state.loading = true;
            state.error = action.error;
        },
        [quocgiaData.fulfilled]: (state, action) => {
            state.loading = false;
            state.quocgia = action.payload;
        }
    }
});
const { reducer, actions } = Quocgia;
export const { addquocgia, removequocgia, updatequocgia } = actions;

export default reducer;
