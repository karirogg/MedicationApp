export const deleteMeds = (index) => {
    console.log("Medication deleted on index: " + index);
    return{
        type: "DELETE_MEDICATION",
        payload: index
    };
}