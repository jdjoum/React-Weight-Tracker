// Local Storage
export const fetchData = (key) => {
    return JSON.parse(localStorage.getItem(key));
};

// Format Date
export const formatDateToLocaleString = (epoch) => new Date(epoch).toLocaleDateString();

// Delete item
export const deleteItem = ({key}) => {
    return localStorage.removeItem(key);
}
