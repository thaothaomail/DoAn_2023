import userroleApi from "../../../../api/userroleApi";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const userroleData = createAsyncThunk('userroles/userroleData', async () => {
    const userrole = await userroleApi.getAll();
    return userrole;
})
const Userrole = createSlice({
    name: "userroles",
    initialState: {
        userrole: [],
        loading: true,
        error: ''
    },
    reducers: {
        adduserrole: (state, action) => {
            userroleApi.postuserrole(action.payload);
        },
        removeuserrole: (state, action) => {
            userroleApi.deleteuserrole(action.payload);
        },
        updateuserrole: (state, action) => {
            userroleApi.edituserrole(action.payload);
        }
    },
    extraReducers: {
        [userroleData.pending]: (state) => {
            state.loading = true;
        },
        [userroleData.rejected]: (state, action) => {
            state.loading = true;
            state.error = action.error;
        },
        [userroleData.fulfilled]: (state, action) => {
            state.loading = false;
            state.userrole = action.payload;
        }
    }
});
const { reducer, actions } = Userrole;
export const { adduserrole, removeuserrole, updateuserrole } = actions;

export default reducer;
