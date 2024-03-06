export function html(strings: TemplateStringsArray, ...values: any[]) {
  const sanitizedValues = values; // getSanitizedValues(values);

  let container = "";

  strings.forEach((str, index) => {
    container += str; // Append the static string part

    if (index < sanitizedValues.length) {
      container += sanitizedValues[index];
    }
  });

  return container;
}

// TODO: - This guy has to watch for the element appearing and mount it when it does
export function mount(selector: string, element: string) {
  const mountTo = document.querySelector(selector);
  if (mountTo) {
    mountTo.innerHTML = element;
  } else {
    console.warn(`Not mounted, unable to find selector: ${selector}`);
  }
}
