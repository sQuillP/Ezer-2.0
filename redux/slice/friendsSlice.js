import { createSlice } from "@reduxjs/toolkit";
import { 
    getRelations, 
    friendAction,
} from "../thunk/friendsThunk";
import { 
    handleFulfilled, 
    handlePending, 
    handleRejected,
    setSentDisplayNotification as displayNotification
} from "../slice_helpers/friends";


/**
 * @description Ensure that initial state has default initial values.
 */
const initialState = {
    loadingRelations: false,
    relations:{
        friends: [],
        sent_invites:[],
        received_invites:[]
    },
    relationsError: false,
    displaySentNotification: false
};


/**
 * @description Manage state for CRUD when dealing with user's relations i.e (friends, invites, searching users).
 */
const friendsSlice = createSlice({
    name:"friends",
    initialState,
    reducers: {
        setSentDisplayNotification:displayNotification
    },
    extraReducers: (builder)=> {

        // For fetching friends
        builder.addCase(getRelations.fulfilled,handleFulfilled);
        builder.addCase(getRelations.pending, handlePending);
        builder.addCase(getRelations.rejected, handleRejected);

        // For making any updates to friends CRUD for invites.
        builder.addCase(friendAction.fulfilled, handleFulfilled);
        builder.addCase(friendAction.rejected, handleRejected);
        builder.addCase(friendAction.pending, handlePending);
    }
});
export const { setSentDisplayNotification } = friendsSlice.actions;
export default friendsSlice.reducer;