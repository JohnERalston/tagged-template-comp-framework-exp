# Messing about trying to develop a new JS library

- Tenets of the library:
- Small
- No compiler. Works from a script tag.
- Would be ideal to serve HTMX like apps.
- Pushes all logic out of components and up into a mothership type structure without saturating that mothership with too much junk. I.e promote a mothership per feature.
- The UI responds to model changes similar to react but the floating mothership is key to it all to avoid bespoke state management solutions.

- Version 1 is an intro
- Version 2 has it's own readme
- It introduces reactivity.
- but it needs fixing up and some bug fixes.

- const [count, setCount] = useState(0);
- Version 3
- Will accept that setCount is essentially an instruction to redraw. As much as we're immune to it, useState is very different from simply having random object updates regenerating the UI.
- Is it much different to a framework.redraw() function each time we might want to redraw?
- Would such a concept allow more freedom?
- e.g. would it be possible to know what had been 'get' knowing parent,propertyName, old value. Then on redraw() compare old values with new to invoke the reactive container functions
