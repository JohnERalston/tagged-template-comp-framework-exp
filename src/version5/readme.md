# Version 5

Version 4 had a nice idea in that the reactivity was defined in the markup itself leaving the remaining code uninfluenced by a framework or a state manager but, it was technically a little unstable and (if finished) expensive in terms of perf and complexity overhead.

Version 3 was probably the most promising
It was technically sound and free from weird effects b/c updating the ui was done via explicit updateStore() calls.
But having stores in stores certainly isn't ideal.

So.... is it possible to have a store where every property and child property can be reactive.

const store = createStore({todoList: [{name: "one"}, {name: "two"}]});

const todoItem = store.useStore().todoList[1];

store.updateStore(todoItem, {...todoItem, name: "updatedName"}); /// can we do that?

The todoList item isn't a proxy. Can we simply make it a proxy?
