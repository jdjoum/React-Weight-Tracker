// fetchData - Fetches an item from localStorage
export const fetchData = (key) => {
    return JSON.parse(localStorage.getItem(key));
};

// formatDateToLocaleString - Formats a date to a string
export const formatDateToLocaleString = (epoch) => new Date(epoch).toLocaleDateString();

// deleteItem - Deletes an item from localStorage
export const deleteItem = ({key}) => {
    return localStorage.removeItem(key);
}

// retrieveDate - Retrieves the date input value from the AddWeightForm component
function retrieveDate() {
    // Get the input element by its ID
    const dateInput = document.getElementById('dateInput');
    // Get the value of the input field (in YYYY-MM-DD format)
    console.log(dateInput.value);
    return dateInput.value;
}

// addNewWeightEntry - Adds a new weight entry to the list of weights stored in localStorage 
export const addNewWeightEntry = ({ amount, date }) => {
    var entryNum = 1;
    if (fetchData("weights") != null) {
        entryNum = fetchData("weights").length + 1;
    }
    date = retrieveDate();
    const newWeight = {
        id: crypto.randomUUID(),
        entryNum: entryNum,
        date: date,
        createdAt: Date.now(),
        weight: +amount,
    }
    const existingWeights = fetchData("weights") ?? [];
    localStorage.setItem("weights", JSON.stringify([...existingWeights,newWeight]));
    entryNum++;
}

