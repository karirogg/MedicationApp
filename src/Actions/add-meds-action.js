export const addMeds = (med) => {
    console.log("New meds added: " + med.name + ", " + med.amount);
    console.log("Times: " + med.times)

    return {
        type: "NEW_MEDICATION",
        payload: med
    };
}