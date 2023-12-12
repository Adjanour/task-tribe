import { useState } from 'react';
import {LocalStorageProps} from "@/app/(main)/task/_lib/definitions";


export function useLocalStorage<T>({key, initialValue}:LocalStorageProps<T>)  {
    // Retrieve the stored value from local storage on component mount
    const storedValue = localStorage.getItem(key);
    const initial = storedValue ? JSON.parse(storedValue) : initialValue;

    // State to track the current value
    const [value, setValue] = useState<T>(initial);

    // Function to update the local storage and the state with a new value
    const setStoredValue = (newValue:T) => {
        setValue(newValue);
        localStorage.setItem(key, JSON.stringify(newValue));
    };

    return {value, setStoredValue};
};

export default useLocalStorage;
