export default (state=[], action) => {
    let state_copy = JSON.parse(JSON.stringify(state));

    switch(action.type) {
        case "NEW_MEDICATION":
            state_copy.push(action.payload);
            break;
        case "EDIT_MEDICATION":
            state_copy[action.payload.index].doses = action.payload.med.doses;
            break;
        case "DELETE_MEDICATION":
            state_copy.splice(action.payload,1);
            break;
        default: break;
    }

    return(state_copy);
}