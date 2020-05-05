export const addMeds = (med) => {
    console.log("New meds added: " + med.name);

    return {
        type: "NEW_MEDICATION",
        payload: med
    };
}