import { ReactiveFn, Renderable } from "./types";

export const renderEngine = renderEngineFn();

function renderEngineFn() {
  const renderFnMap = new Map<string, Renderable>();
  const valueMap = new Map();

  return {
    setValue,
    getValue,
    setThenGetValue,
    hasChanged,
    setReactiveFn,
    removeReactiveFn,
    forceRender,
    renderIfChanged,
    renderIfChangedAll,
  };

  function renderIfChangedAll() {
    for (const key of renderFnMap.keys()) {
      renderIfChanged(key);
    }
  }

  function renderIfChanged(id: string) {
    if (hasChanged(id)) {
      renderFnMap.get(id)?.fn();
    }
  }

  function forceRender(id: string) {
    renderFnMap.get(id)?.fn();
  }

  function setReactiveFn(id: string, reactiveFn: ReactiveFn) {
    renderFnMap.set(id, { fn: reactiveFn, ran: false });
  }

  function removeReactiveFn(id: string) {
    renderFnMap.delete(id);
  }

  function hasChanged(id: string) {
    const objectMap = valueMap.get(id);
    if (!objectMap) {
      return false;
    }
    const objects = Array.from(objectMap.keys()) as object[];
    for (const obj of objects) {
      const keyMap = objectMap.get(obj);
      const keys = Array.from(keyMap.keys());
      for (const key of keys) {
        const renderedValue = keyMap.get(key);
        const currentValue = obj[key];
        if (key === "renaming") {
          console.log({ id, renderedValue, currentValue });
        }
        if (renderedValue !== currentValue) {
          return true;
        }
      }
    }
    return false;
  }

  function setThenGetValue<T extends object, K extends keyof T>(
    id: string,
    obj: T,
    key: K
  ) {
    console.log("setValue ", id, obj[key]);
    setValue(id, obj, key);
    return obj[key];
  }

  function getValue<T extends object, K extends keyof T>(
    id: string,
    obj: T,
    key: K
  ) {
    return valueMap.get(id).get(obj).get(key);
  }

  function setValue<T extends object, K extends keyof T>(
    id: string,
    obj: T,
    key: K
  ) {
    ensureValue(id, obj, key, obj[key]);
  }

  function ensureValue(id: string, obj: any, key: any, value: any) {
    const objMap = getObjMapForId(valueMap, id);
    const keyMap = getKeyMapForObj(objMap, obj);
    keyMap.set(key, value);
  }

  function getObjMapForId(valueMap: any, id: string) {
    if (!valueMap.has(id)) {
      valueMap.set(id, new Map());
    }
    return valueMap.get(id);
  }

  function getKeyMapForObj(objMap: any, obj: any) {
    if (!objMap.has(obj)) {
      objMap.set(obj, new Map());
    }
    return objMap.get(obj);
  }
}
