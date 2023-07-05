import thongbaoApi from "../../../../api/thongbaoApi";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const thongbaoData = createAsyncThunk('thongbaos/thongbaoData', async () => {
    const thongbao = await thongbaoApi.getAll();
    return thongbao;
})
const Thongbao = createSlice({
    name: "thongbaos",
    initialState: {
        thongbao: [],
        loading: true,
        error: ''
    },
    reducers: {
        addthongbao: (state, action) => {
            thongbaoApi.postthongbao(action.payload);
        },
        removethongbao: (state, action) => {
            thongbaoApi.deletethongbao(action.payload);
        },
        updatethongbao: (state, action) => {
            thongbaoApi.editthongbao(action.payload);
        }
    },
    extraReducers: {
        [thongbaoData.pending]: (state) => {
            state.loading = true;
        },
        [thongbaoData.rejected]: (state, action) => {
            state.loading = true;
            state.error = action.error;
        },
        [thongbaoData.fulfilled]: (state, action) => {
            state.loading = false;
            state.thongbao = action.payload;
        }
    }
});
const { reducer, actions } = Thongbao;
export const { addthongbao, removethongbao, updatethongbao } = actions;

export default reducer;
