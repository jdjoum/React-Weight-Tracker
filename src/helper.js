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

// formatDateInput - Formats the date input from the AddWeightForm component
function formatDateInput(inputDate) {
    // Create a Date object from the input value
    const date = new Date(inputDate);

    // Get the month, day, and year
    const month = date.getMonth() + 1; // Months are zero-indexed, so add 1
    const day = date.getDate();
    const year = date.getFullYear();

    // Format the date as "M/D/YYYY"
    const formattedDate = `${month}/${day}/${year}`;
    console.log(formattedDate); // Outputs: "7/21/2024"
    return formattedDate
}

// getDate - Gets the date input value from the AddWeightForm component
function getDate() {
    // Get the date input element by its ID
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
    date = getDate();
    const formattedDate = formatDateInput(date)
    const now = new Date(Date.now());
    const newWeight = {
        id: crypto.randomUUID(),
        entryNum: entryNum,
        date: formattedDate,
        createdAt: now.toLocaleString(),
        weight: +amount,
    }
    const existingWeights = fetchData("weights") ?? [];
    localStorage.setItem("weights", JSON.stringify([...existingWeights,newWeight]));
    entryNum++;
}

