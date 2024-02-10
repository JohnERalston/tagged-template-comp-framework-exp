//WORKING
export function tag(strings: TemplateStringsArray, ...values: any[]) {
  const container = document.createElement("taggedElement");
  const elementHash: any = {};

  strings.forEach((str, index) => {
    container.innerHTML += str; // Append the static string part

    if (index < values.length) {
      const value = values[index];

      // If the value is a DOM element, replace the placeholder with the element
      if (value instanceof Element) {
        container.innerHTML += `<div xe-${index}></div>`;
        elementHash[`[xe-${index}]`] = value;
      } else {
        container.innerHTML += value; // If not a DOM element, treat as string
      }
    }
  });

  Object.keys(elementHash).forEach((key) => {
    container.querySelector(key)?.replaceWith(elementHash[key]);
  });

  return container;
}

export function getE<T extends HTMLElement>(
  element: HTMLElement,
  e: string
): T {
  return element.querySelector(`[e="${e}"]`) as T;
}

export function bind<T extends { init: (elem: HTMLElement) => void }>(
  api: T,
  comp: (api: T) => string
): HTMLElement {
  const elem = tag`${comp(api)}`;
  api.init(elem);
  return elem;
}
