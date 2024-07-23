// wait - Adds a wait time for form submissions
export const wait = () => new Promise(res => setTimeout(res, Math.random() * 800));

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

