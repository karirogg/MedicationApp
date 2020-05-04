export const addMeds = (med) => {
    console.log("New meds added: " + med.name);
    console.log("Doses: " + med.doses)

    return {
        type: "NEW_MEDICATION",
        payload: med
    };
}