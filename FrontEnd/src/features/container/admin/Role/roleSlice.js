import roleApi from "../../../../api/roleApi";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const roleData = createAsyncThunk('roles/roleData', async () => {
    const role = await roleApi.getAll();
    return role;
})
const Role = createSlice({
    name: "roles",
    initialState: {
        role: [],
        loading: true,
        error: ''
    },
    reducers: {
        addrole: (state, action) => {
            roleApi.postrole(action.payload);
        },
        removerole: (state, action) => {
            roleApi.deleterole(action.payload);
        },
        updaterole: (state, action) => {
            roleApi.editrole(action.payload);
        }
    },
    extraReducers: {
        [roleData.pending]: (state) => {
            state.loading = true;
        },
        [roleData.rejected]: (state, action) => {
            state.loading = true;
            state.error = action.error;
        },
        [roleData.fulfilled]: (state, action) => {
            state.loading = false;
            state.role = action.payload;
        }
    }
});
const { reducer, actions } = Role;
export const { addrole, removerole, updaterole } = actions;

export default reducer;
