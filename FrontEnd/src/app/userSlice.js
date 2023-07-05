import userApi from "../api/userApi"
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const getMe = createAsyncThunk('user/getMe', async (params, thunkAPI) => {
    const currentUser = await userApi.getMe();
    return currentUser;
})

const userSlice = createSlice({
    name: "user",
    initialState: {
        curent: {},
        loading: false,
        error: ''
    },
    reducers: {},
    extraReducers: {
        [getMe.pending]: (state) => {
            state.loading = true;
        },
        [getMe.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },
        [getMe.fulfilled]: (state, action) => {
            state.loading = false;
            state.curent = action.payload;
        }

    }
});
const { reducer: userReducer } = userSlice;
export default userReducer