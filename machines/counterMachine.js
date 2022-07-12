import { assign, Machine } from "xstate";

const increment = context => context.count + 1;
const decrement = context => context.count - 1;
const isNotMax = max => context => context.count < max;
const isNotMin = min => context => context.count > min;

const counterMachine = Machine({
  id: "counter",
  initial: "active",
  context: {
    count: 0
  },
  states: {
    active: {
      on: {
        INC: {
          actions: assign({ count: increment })
        },
        DEC: {
          actions: assign({ count: decrement })
        }
      }
    }
  }
});

export { counterMachine };
