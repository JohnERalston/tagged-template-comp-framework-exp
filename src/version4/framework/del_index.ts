// The idea here is that we will have a map of before set and after set
// if we can associate these map items with $f functons t
// then when we diff the objects keys we can execute all $f's where the keys are different
// avoid running the same $f twice
// we prob need to avoid running children after a parent hs been run, it's wasteful
// oh wait, if we can only a $f once, then when the parent is run, the children wil run too once, wink
// but if we run the children first, then it'sa  bit wasteful
// ideally, start at the upper $f's if somehow possible

// const got = new Map<any, typeof Map<string, any>>();

// interface KeyValue = {
//     [key: string]
// }

//type ObjKeys<T extends object> = Map<T, { [K in keyof T]: string | number }[]>;
type MapOfObjectToKeyValues<T extends object> = Map<
  T,
  { [K in keyof T]: string | number }
>;

// interface Comp<T extends object> {
//   origObject: ObjKeys<T>;
//   origKey: keyof T;
//   renderedValue: any;
// }

const attrIdCompMap = new Map<string, MapOfObjectToKeyValues<object>>();

export function r<T extends object>(
  attrId: string,
  obj: T,
  key: keyof T,
  value: string | number
) {
  const objKeysMap = getObjkeys(attrId, obj, key, value);
  objKeysMap.objKeysMap.push({
    key,
    value,
  });
  Reflect.set(obj, key, value);
}

function applyValueToObjectKey<T extends object>(
  uid: string,
  obj: T,
  key: keyof T,
  value: string | number
): MapOfObjectToKeyValues<T> {
  const attrIdCompMap: Map<string, MapOfObjectToKeyValues<T>> = new Map();

  let map: MapOfObjectToKeyValues<T>;

  if (!attrIdCompMap.has(uid)) {
    map = new Map<T, { [K in keyof T]: string | number }>();
    map.set(obj, { [key]: value } as { [K in keyof T]: string | number });
    attrIdCompMap.set(uid, map);
  } else {
    map = attrIdCompMap.get(uid)!;
    map.set(obj, { ...map.get(obj)!, [key]: value });
  }

  return map;
}
