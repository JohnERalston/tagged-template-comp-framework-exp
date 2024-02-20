import { stateful } from "../framework/stateful";
import { eid } from "../framework/tag";

export interface ITodoItem {
  id: string;
  name: string;
  done: boolean;
  renaming: boolean;
}

export type ObservableTodoItem = ReturnType<typeof stateful<ITodoItem>>;

const tsMs = stateful<{ todoItems: ObservableTodoItem[] }>({ todoItems: [] });
const { state: todoState, observe: observeTodo } = tsMs;
// const { todoItems } = todoState;

const todoApi = todoApiFn();

export { todoState, observeTodo, todoApi };

function todoApiFn() {
  return {
    addTodo,
    removeTodo,
  };

  function addTodo(name: string) {
    const todo: ITodoItem = {
      done: false,
      id: eid(),
      name,
      renaming: false,
    };
    todoState.todoItems.push(stateful(todo));
    tsMs.state.todoItems = todoState.todoItems.slice();
  }

  function removeTodo(id: string) {
    tsMs.state.todoItems = todoState.todoItems.filter(
      (elem) => elem.state.id !== id
    );
  }
}
