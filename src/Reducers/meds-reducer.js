export default (state=[], action) => {
    let state_copy = JSON.parse(JSON.stringify(state));

    if(action.type === "NEW_MEDICATION") {
        state_copy.push(action.payload);
    }

    return(state_copy);
}