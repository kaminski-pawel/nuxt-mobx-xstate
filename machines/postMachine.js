import axios from "axios";
import { assign, Machine } from "xstate";

function getPostsByUser(context, event) {
  context.postId = event.postId || context.postId;
  const url = "https://jsonplaceholder.typicode.com/posts";
  return axios
    .request(context.postId ? `${url}/${context.postId}` : url)
    .then(response => {
      return context.postId ? [response.data] : response.data;
    });
}

const postMachine = Machine({
  id: "postMachine",
  context: { postId: 1, posts: [], comments: [] },
  initial: "idle",
  states: {
    idle: {
      on: {
        FETCH: "loading",
        DONE: "done"
      }
    },
    loading: {
      invoke: {
        id: "getPostsByUser",
        src: getPostsByUser,
        onDone: {
          target: "idle",
          actions: assign({
            posts: (context, event) => event.data
          })
        },
        onError: {
          target: "failure",
          actions: assign({
            error: (context, event) => event.data
          })
        }
      }
    },
    done: {
      on: {
        RETRY: "loading"
      }
    },
    success: {
      type: "final"
    },
    failure: {
      on: {
        RETRY: "loading"
      }
    }
  }
});

export { postMachine };
