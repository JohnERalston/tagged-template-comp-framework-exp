import { $uidUnobserveFnMap } from "./garbageCollector";
import { rFunctionTracker } from "./reactiveFunctionTracker";
import { __createStore } from "./store";

export function createStore<Store>(initialValues: Store) {
  let initialPropsSet = false;
  let store = { ...initialValues };

  // TODO: - come back to the unregister re best way to do it
  const { setUpdated, register, unregister } = __createStore();

  return {
    useStore,
    updateStore,
    data: () => Object.freeze({ ...store }),
  };

  function updateStore(
    selector: Partial<Store> | ((store: Store) => Partial<Store>)
  ) {
    if (typeof selector === "function") {
      doUpdate(selector(store));
    } else {
      doUpdate(selector);
    }
  }

  function useStore(initialProps?: Partial<Store> | null | undefined): Store {
    const keySet = new Set<string>();

    if (initialProps && !initialPropsSet) {
      setStoreValues(initialProps);
    }
    initialPropsSet = true;

    const proxy = new Proxy(store as {}, {
      get(target: any, property: string) {
        const uid = rFunctionTracker.getCurrentRFn();
        if (!uid) {
          return target[property];
        }
        const reactive = $uidUnobserveFnMap.get(uid!)!;
        reactive.unobserveFn = () => unregister(reactive.reactiveKickerFn);
        register(reactive.reactiveKickerFn, [property]);
        keySet.add(property);
        return target[property];
      },
    });

    return proxy;
  }

  function doUpdate(partial: Partial<Store>) {
    setUpdated(setStoreValues(partial));
  }

  function setStoreValues(partial: Partial<Store>) {
    const keys = Object.keys(partial);
    keys.forEach((key) => {
      (store as any)[key] = (partial as any)[key];
    });
    store = { ...store };

    return keys;
  }
}
