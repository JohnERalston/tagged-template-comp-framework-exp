import { __createStore } from "./store";

interface Stateful<T> {
  state: T;
  observe: (keys: (keyof T)[], fn: Function) => void;
  unObserve: (fn: Function) => void;
}

export function stateful<T extends object>(state: T): Stateful<T> {
  const { setUpdated, register, unregister } = __createStore();
  return {
    state: new Proxy<T>(state, {
      set(target: any, property: string, newValue: any) {
        target[property] = newValue;
        setUpdated([property]);
        return true;
      },
    }),
    observe: (keys: (keyof T)[], fn: Function) =>
      register(
        fn,
        keys.map((key) => String(key))
      ),
    unObserve: unregister,
  };
}
