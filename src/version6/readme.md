# version 6

Takes a totally different approach.
Dispenses with the notion of global state.
Has a function for each state of the app, ReadTodo or EditTodo etc
Just calling those functions sets innerHtml on the element
Not a bad idea
but
it proved (impossible?) hard to actually switch from a ReadTodo to an Edit todo from outside the component.
Having logic inside a component is not in keeping with the tenets of this endeavor.
