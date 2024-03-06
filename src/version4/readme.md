## Version 4

- Needs lots of work. Specifically, it's massively inefficient to simply iterate over all the map keys. We need to start at the top of the hierarchy and dismiss any children if a delta is found.
- Maintaining this hierarchy may be expensive
- Attribute updates need to be implemented
- There always needs to be a parent object, e.g. `todoList.items` because we need a handle on `todoList`. If it were `let` and were dereferenced it would break the reactivity.
- It feels a bit loose because any dereferencing of objects causes reactivity to break e.g. `todoList.items[2].rename = true` works but `todoList.items[2] = {...todoList.items[2], rename: true}` does not

- It's really nice that the only boiler plate is a few extra characters when getting values within the reactive function e.g. normal would be `${item.name}` this requires `${v(id, item, "name")}`. No store either global or local is required.
- It allows the JS to be anything. Completely vanilla with no opinions whatsoever. The reactivity is established right at the very granular thing that needs to be reactive which feels very correct.

- Again, as with all of these, casting a net too wide is problematic, e.g. is possible to have just one reactive function for the entire app which would obviously make the app unusable. Developer responsibility required.
