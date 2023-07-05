import taikhoanApi from "../../../../api/taikhoanApi";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const userData = createAsyncThunk('users/userData', async () => {
    const user = await taikhoanApi.getAll();
    return user;
})
const User = createSlice({
    name: "users",
    initialState: {
        user: [],
        loading: true,
        error: ''
    },
    reducers: {
        removeuser: (state, action) => {
            taikhoanApi.deleteuser(action.payload);
        },
        updateuser: (state, action) => {
            taikhoanApi.edituser(action.payload);
        }
    },
    extraReducers: {
        [userData.pending]: (state) => {
            state.loading = true;
        },
        [userData.rejected]: (state, action) => {
            state.loading = true;
            state.error = action.error;
        },
        [userData.fulfilled]: (state, action) => {
            state.loading = false;
            state.user = action.payload;
        }
    }
});
const { reducer, actions } = User;
export const { removeuser, updateuser } = actions;

export default reducer;
