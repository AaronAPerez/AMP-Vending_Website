import { useState, useEffect } from "react";

// Safe localStorage/sessionStorage access
function useLocalStorage(key: string, defaultValue: any) {
  const [value, setValue] = useState(defaultValue);
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(key);
      if (stored) {
        setValue(JSON.parse(stored));
      }
    }
  }, [key]);
  
  const setStoredValue = (newValue: any) => {
    setValue(newValue);
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(newValue));
    }
  };
  
  return [value, setStoredValue];
}