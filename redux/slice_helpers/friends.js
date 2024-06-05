/**
 * @description remove any duplicated logic for handling friend actions.
 */

export function setSentDisplayNotification(state, action){
    console.log("sentdisplaynotification", action);
    state.displaySentNotification = action.payload;
    console.log("finished sentdisplaynotification");
}


export function syncFriends(state, action) {
    state.relations = action.payload;
}

export function handleFulfilled(state, {payload}){
    state.loadingRelations = false;
    state.relations = payload;
    state.relationsError = false;
}

export function handlePending(state, {payload}) {
    state.loadingRelations = true;
    state.relationsError = false;
}

export function handleRejected(state, {payload}) {
    state.loadingRelations = false;
    state.relationsError = false;
}
