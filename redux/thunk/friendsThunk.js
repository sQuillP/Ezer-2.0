import { createAsyncThunk } from "@reduxjs/toolkit";
import { Ezer } from "../../http/Ezer";


export const getRelations = createAsyncThunk(
    'friends/getRelations',
    async (payload,{rejectWithValue,getState})=> {
        try {
            console.log("GRABBING RELATIONS")
            const relationsResponse = await Ezer.get('/friends');
            const relations = relationsResponse.data.data;
            return relations;
        } catch(error) {
            console.log("Error fetching relations", error, error.message);
            return rejectWithValue(error.response.status);
        }
    }
);