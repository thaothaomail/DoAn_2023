import ngaydiApi from "../../../../api/ngaydiApi";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const ngaydiData = createAsyncThunk('ngaydis/ngaydiData', async () => {
    const ngaydi = await ngaydiApi.getAll();
    return ngaydi;
})
const Ngaydi = createSlice({
    name: "ngaydis",
    initialState: {
        ngaydi: [],
        loading: true,
        error: ''
    },
    reducers: {
        addngaydi: (state, action) => {
            ngaydiApi.postngaydi(action.payload);
        },
        removengaydi: (state, action) => {
            ngaydiApi.deletengaydi(action.payload);
        },
        updatengaydi: (state, action) => {
            ngaydiApi.editngaydi(action.payload);
        }
    },
    extraReducers: {
        [ngaydiData.pending]: (state) => {
            state.loading = true;
        },
        [ngaydiData.rejected]: (state, action) => {
            state.loading = true;
            state.error = action.error;
        },
        [ngaydiData.fulfilled]: (state, action) => {
            state.loading = false;
            state.ngaydi = action.payload;
        }
    }
});
const { reducer, actions } = Ngaydi;
export const { addngaydi, removengaydi, updatengaydi } = actions;

export default reducer;
