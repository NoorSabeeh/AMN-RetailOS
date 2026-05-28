type StorageKind = "localStorage" | "sessionStorage";

function resolveStorage(kind: StorageKind) {
  if (typeof window === "undefined") return null;

  try {
    const storage = window[kind];
    const probeKey = "__amn_storage_probe__";
    storage.setItem(probeKey, "1");
    storage.removeItem(probeKey);
    return storage;
  } catch {
    return null;
  }
}

export function safeGetItem(key: string, kind: StorageKind = "localStorage") {
  const storage = resolveStorage(kind);
  if (!storage) return null;

  try {
    return storage.getItem(key);
  } catch {
    return null;
  }
}

export function safeSetItem(key: string, value: string, kind: StorageKind = "localStorage") {
  const storage = resolveStorage(kind);
  if (!storage) return false;

  try {
    storage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
}

export function safeRemoveItem(key: string, kind: StorageKind = "localStorage") {
  const storage = resolveStorage(kind);
  if (!storage) return false;

  try {
    storage.removeItem(key);
    return true;
  } catch {
    return false;
  }
}

export function safeParseJson<T>(value: string | null, fallback: T): T {
  if (!value) return fallback;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}
