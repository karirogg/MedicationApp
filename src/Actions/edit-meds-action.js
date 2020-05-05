export const editMeds = (med, index) => {
    console.log("Medication edited at index " + index);
    return {
        type: "EDIT_MEDICATION", 
        payload: {
            med:med,
            index:index
        }
    };
}