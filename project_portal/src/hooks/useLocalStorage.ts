import { useEffect, useState } from "react";
import { safeGetItem, safeParseJson, safeSetItem } from "../lib/safeStorage";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }

    return safeParseJson<T>(safeGetItem(key), initialValue);
  });

  useEffect(() => {
    safeSetItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}
