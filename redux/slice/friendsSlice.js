import { createSlice } from "@reduxjs/toolkit";
import { 
    getRelations, 
} from "../thunk/friendsThunk";
import { 
    handleFulfilled, 
    handlePending, 
    handleRejected,
    setSentDisplayNotification as displayNotification,
    syncFriends,
} from "../slice_helpers/friends";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Ezer } from "../../http/Ezer";

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
        setSentDisplayNotification:displayNotification,
        syncRelations: syncFriends
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
export const { setSentDisplayNotification, syncRelations } = friendsSlice.actions;



/**
 * @description send a POST or DELETE to either add a friend, accept an invite, delete a friend, or delete
 * an invite.
 */
export const friendAction = createAsyncThunk(
    "friends/addFriend",
    async (payload, {rejectWithValue, getState, dispatch})=> {
        let friendActionResponse = null;
        try {
            console.log(payload, payload.action);
            if(payload.action === 'accept' || payload.action === 'create') {
                console.log('sending friend request');
                friendActionResponse = await Ezer.post('/friends',
                    {username:payload.username},
                    {params:{action: payload.action}}
                );
                dispatch(setSentDisplayNotification(true));
                console.log("SUCCESSFULLY SENT INVITE");
            } else if(payload.delete_type === 'invite' || payload.delete_type === 'friend') {
                console.log("DELETING FRIEND REQUEST");
                // console.log({params:{delete_type: payload.delete_type}})
                friendActionResponse = await Ezer.delete('/friends',{
                    data:{username: payload.username}, 
                    params:{delete_type: payload.delete_type}
                });
            } else {
                return rejectWithValue(null);
            }
            const updatedFriends = friendActionResponse.data.data;
            return updatedFriends;
        } catch(error) {
            console.log("Error in friend action")
            console.log(error, error.message);
            return rejectWithValue(error.response.data.data);
        }
    }
)
export default friendsSlice.reducer;