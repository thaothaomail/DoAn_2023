const { createSlice } = require("@reduxjs/toolkit");

const Thanhtoan = createSlice({
    name: "thanhtoans",
    initialState: [],
    reducers: {
        addthanhtoan: (state, action) => {
            state.push(action.payload)
        }
    },
});
const { reducer, actions } = Thanhtoan;
export const { addthanhtoan } = actions;

export default reducer;
