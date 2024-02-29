# Messing about trying to develop a new JS library

- Tenets of the library:
- Small
- No compiler. Works from a script tag.
- Would be ideal to serve HTMX like apps.
- Pushes all logic out of components and up into a mothership type structure without saturating that mothership with too much junk. I.e promote a mothership per feature.
- The UI responds to model changes similar to react but the floating mothership is key to it all to avoid bespoke state management solutions.

## Version 1

- Version 1 is an intro

## Version 2

- Has it's own readme
- It introduces reactivity.
- but it needs fixing up and some bug fixes.
- Opinions in the individual readme

## Version 3

- Has it's own readme
- Takes on the outer-state paradigm (a floating mothership containing UI state)
- Feels far more natural to explicitly invoke UI updates
- i.e. store.updateStore({data: value});
- version 2 makes me nervous for random effects.
- It actually feels a little like framework built out of useEffect's yuck.

- Will accept that setCount is essentially an instruction to redraw. As much as we're immune to it, useState is very different from simply having random object updates regenerating the UI.
- Is it much different to a framework.redraw() function each time we might want to redraw?

Version 4 thoughts:

- Would such a concept (manual framework.redraw()) allow more freedom?
- e.g. would it be possible to know what had been 'get' knowing parent,propertyName, old value. Then on redraw() compare old values with new to invoke the reactive container functions
