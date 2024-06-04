/**
 * @description remove any duplicated logic for handling friend actions.
 */

export function setSentDisplayNotification(state, action){
    console.log("setsentDisplayNotification", action)
    state.displaySentNotification = action.payload
}


export function handleFulfilled(state, {payload}){
    console.log("FULFILLED GET RELATIONS::: ", payload);
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
