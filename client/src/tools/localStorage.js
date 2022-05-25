export const getStorage = (key) => {
    const item = window.localStorage.getItem(key);
    try {
        return item ? JSON.parse(item) : item
    } catch (error) {
        // If error also return initialValue
        return item;
    }
}

export const setStorage = (key, value) => {
    if(typeof value === "undefined")
        return console.error("Try to save undefined value in local storage", key)
    try {
        window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        window.localStorage.setItem(key, value);
    }
}
