// wait - Adds a wait time for form submissions
export const wait = () => new Promise(res => setTimeout(res, Math.random() * 800));

// fetchData - Fetches an item from localStorage
export const fetchData = (key) => {
    return JSON.parse(localStorage.getItem(key));
};

// formatDateToLocaleString - Formats a date to a string
export const formatDateToLocaleString = (epoch) => new Date(epoch).toLocaleDateString();

// deleteItem - Deletes an item from localStorage
export const deleteItem = ({key, id}) => {
    const existingData = fetchData(key);
    if(id){
        const newData = existingData.filter((item) => item.id !== id)
        return localStorage.setItem(key, JSON.stringify(newData));
    }
    return localStorage.removeItem(key);
}

// formatDateInput - Formats the date input from the AddWeightForm component
function formatDateInput(inputDate) {
    const [year, month, day] = inputDate.split('-').map(Number);
    const formattedDate = `${month}/${day}/${year}`;
    return formattedDate
}

// getDate - Gets the date input value from the AddWeightForm component
function getDate() {
    const dateInput = document.getElementById('dateInput');
    return dateInput.value;
}

// addNewWeightEntry - Adds a new weight entry to the list of weights stored in localStorage 
export const addNewWeightEntry = ({ amount, date }) => {
    date = getDate();
    const formattedDate = formatDateInput(date)
    const now = new Date(Date.now());
    const formattedAmount = (+amount).toFixed(2);
    const newWeight = {
        id: crypto.randomUUID(),
        date: formattedDate,
        createdAt: now.toLocaleString(),
        weight: formattedAmount,
    }
    const existingWeights = fetchData("weights") ?? [];
    localStorage.setItem("weights", JSON.stringify([...existingWeights,newWeight]));
}

// lbsToKgs - Converts lbs to kgs
export const lbsToKgs = (lbs) => {
    return (lbs * 0.453592).toFixed(2);
};
  
// kgsToLbs - Converts kgs to lbs
export const kgsToLbs = (kgs) => {
    return (kgs * 2.20462).toFixed(2);
};

// convertWeightUnits - Converts the existingWeights to kgs or lbs based on the unit
export const convertWeightUnits = (existingWeights, unit) => {
    var newWeights = structuredClone(existingWeights);
    for (let i = 0; i < existingWeights.length; i++) {
        if (unit == "kgs") {
            newWeights[i].weight = kgsToLbs(existingWeights[i].weight);
        } else {
            newWeights[i].weight = lbsToKgs(existingWeights[i].weight);
        }
    }
    localStorage.setItem("weights", JSON.stringify(newWeights));
    return newWeights;
}

// convertGoalWeight - Converts the goalWeight to kgs or lbs based on the unit
export const convertGoalWeight = (goalWeight, unit) => {
    var newGoalWeight = 0;
    if (unit == "kgs") {
        newGoalWeight = kgsToLbs(goalWeight);
    } else {
        newGoalWeight = lbsToKgs(goalWeight);
    }
    localStorage.setItem("goalWeight", JSON.stringify(newGoalWeight));
    return newGoalWeight;
}

// updateGoalWeight - Updates the goal weight stored in localStorage 
export const updateGoalWeight = ( weight ) => {
    localStorage.setItem("goalWeight", weight);
}

