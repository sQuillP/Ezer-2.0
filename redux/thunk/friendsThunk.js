import { createAsyncThunk } from "@reduxjs/toolkit";
import { Ezer } from "../../http/Ezer";
import { setSentDisplayNotification } from "../slice_helpers/friends";


export const getRelations = createAsyncThunk(
    'friends/getRelations',
    async (payload,{rejectWithValue,getState})=> {
        try {
            console.log('fetching relations')
            const relationsResponse = await Ezer.get('/friends');
            const relations = relationsResponse.data.data;
            return relations;
        } catch(error) {
            console.log("Error fetching relations", error, error.message);
            return rejectWithValue(error.response.status);
        }
    }
);



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
                friendActionResponse = await Ezer.post('/friends',
                    {username:payload.username},
                    {params:{action: payload.action}}
                );
                dispatch(setSentDisplayNotification(true));
                console.log("SUCCESSFULLY SENT INVITE");
            } else if(payload.delete_type === 'invite' || payload.delete_type === 'friend') {
                friendActionResponse = await Ezer.delete('/friends',
                    {data:{username: payload.username}, params:{delete_type: payload.action}}
                );
            } else {
                return rejectWithValue(null);
            }
            const updatedFriends = friendActionResponse.data.data;
            return updatedFriends;
        } catch(error) {
            console.log(error, error.message);
            return rejectWithValue(error.response.status);
        }
    }
)