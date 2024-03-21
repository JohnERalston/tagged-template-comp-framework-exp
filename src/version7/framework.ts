export function on(type: keyof DocumentEventMap, fn: Function) {
  const id = crypto.randomUUID();
  document.addEventListener(type, (event: Event) => {
    const evt = event.target as HTMLElement;
    if (evt.getAttribute("on") === id) {
      fn(event);
    }
  });
  return `on="${id}"`;
}
const slot = "slot";
const valuable = "valuable";

// todo garbage collect these as elements exit the page
const slotMap = new Map<string, string>();

export const euid = () => `a${crypto.randomUUID()}`;
export const makeSlot = (externalId: string = ""): string => {
  const slotAttr = `${slot}="${euid()}"`;
  if (externalId) {
    slotMap.set(externalId, slotAttr);
  }
  return slotAttr;
};
export const findSlot = (slotAttr: string): HTMLElement =>
  document.querySelector(`[${slotAttr}]`)!;

export const getSlotFromKey = (externalId: string): string => {
  return slotMap.get(externalId)!;
};

export const replaceSlot = (
  slotAttr: string,
  replacementValue: string
): void => {
  const elem = findSlot(slotAttr);
  const div = document.createElement("div");
  elem.appendChild(div);
  elem.outerHTML = replacementValue;
};
export const appendToSlot = (slotAttr: string, value: string) => {
  const div = document.createElement("div");
  findSlot(slotAttr).appendChild(div);
  div.outerHTML = value;
};
export const removeSlot = (slotAttr: string) => findSlot(slotAttr).remove();

export const makeValuable = (): string => `${valuable}="${euid()}"`;
export const getValue = (valueAttr: string): string =>
  document.querySelector<HTMLInputElement>(`[${valueAttr}]`)?.value || "";
export const getValueElem = (valueAttr: string): HTMLInputElement =>
  document.querySelector<HTMLInputElement>(`[${valueAttr}]`)!;

export function promoteSlot(key: string, slotId: string) {
  slotMap.set(key, slotId);
}
