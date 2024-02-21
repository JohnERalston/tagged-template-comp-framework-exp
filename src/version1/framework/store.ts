export function __createStore() {
  const stateMap = new Map<string, Set<Function>>();

  function ensureSet(item: string) {
    if (!stateMap.has(item)) {
      stateMap.set(item, new Set());
    }
  }

  function register(fn: Function, keys: string[]) {
    keys.forEach((key) => {
      ensureSet(key);
      stateMap.get(key)!.add(fn);
    });
  }

  function unregister(fn: Function) {
    stateMap.forEach((set) => set.delete(fn));
  }

  function setUpdated(keys: string[]) {
    const callbacks = new Set<Function>();
    keys.forEach((key) => {
      ensureSet(key);
      const functions = Array.from<Function>(stateMap.get(key)!);
      functions.forEach((fn) => callbacks.add(fn));
    });
    Array.from<Function>(callbacks).forEach((cb) => cb());
  }

  return {
    register,
    unregister,
    setUpdated,
  };
}
