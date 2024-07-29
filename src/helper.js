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
export const addNewWeightEntry = ({ amount, date, height, weightUnit }) => {
    date = getDate();
    const formattedDate = formatDateInput(date)
    const now = new Date(Date.now());
    const formattedAmount = (+amount).toFixed(2);
    console.log(height);
    console.log(weightUnit);
    const BMI = calculateBMI(formattedAmount, height, weightUnit)
    const newWeight = {
        id: crypto.randomUUID(),
        date: formattedDate,
        createdAt: now.toLocaleString(),
        weight: formattedAmount,
        bmi: BMI,
    }
    const existingWeights = fetchData("weights") ?? [];
    localStorage.setItem("weights", JSON.stringify([...existingWeights,newWeight]));
}

// lbsTokg - Converts lbs to kg
export const lbsTokg = (lbs) => {
    return (lbs * 0.453592).toFixed(2);
};
  
// kgToLbs - Converts kg to lbs
export const kgToLbs = (kg) => {
    return (kg * 2.20462).toFixed(2);
};

// convertweightUnit - Converts the existingWeights to kg or lbs based on the unit
export const convertweightUnit = (existingWeights, weightUnit) => {
    var newWeights = structuredClone(existingWeights);
    for (let i = 0; i < existingWeights.length; i++) {
        if (weightUnit == "kg") {
            newWeights[i].weight = kgToLbs(existingWeights[i].weight);
        } else {
            newWeights[i].weight = lbsTokg(existingWeights[i].weight);
        }
    }
    localStorage.setItem("weights", JSON.stringify(newWeights));
    return newWeights;
}

// convertGoalWeight - Converts the goalWeight to kg or lbs based on the unit
export const convertGoalWeight = (goalWeight, weightUnit) => {
    var newGoalWeight = 0;
    if (weightUnit == "kg") {
        newGoalWeight = kgToLbs(goalWeight);
    } else {
        newGoalWeight = lbsTokg(goalWeight);
    }
    localStorage.setItem("goalWeight", JSON.stringify(newGoalWeight));
    return newGoalWeight;
}

// updateGoalWeight - Updates the goal weight stored in localStorage 
export const updateGoalWeight = ( weight ) => {
    localStorage.setItem("goalWeight", weight);
}

// calculateBMI - Calculates the BMI based on the unit
function calculateBMI(weight, height, weightUnit) {
  if (weight <= 0 || height <= 0) {
    throw new Error("Weight and height must be greater than zero");
  }
  let bmi;
  if (weightUnit === 'lbs') {
    bmi = (weight / (height * height)) * 703;
  } else if (weightUnit === 'kg') {
    bmi = weight / (height * height);
  } else {
    throw new Error("Invalid unit. Use 'kg' or 'lbs'.");
  }
  console.log(bmi);
  return bmi.toFixed(2);
}

