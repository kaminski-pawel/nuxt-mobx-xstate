import uuid from "uuid/v4";
import { view, lensPath, clone } from "ramda";
import { interpret } from "xstate";
import { observable, runInAction } from "mobx";
import { postMachine } from "../machines/postMachine";

export class PostStore {
  items = observable.box({});

  constructor() {
    this.init();
  }

  init = () => {
    this.destroy();
    this.uuid = uuid();
    this.postService = interpret(postMachine).start();
    this.postService.onTransition(() => {
      this.updateContext();
    });
  };

  destroy = () => {
    if (this.postService) {
      this.postService.stop();
      runInAction(() => {
        this.items.posts = [];
      });
    }
  };

  updateContext = () => {
    runInAction(() => {
      this.items = {
        ...clone(this.postService.state.context),
        value: this.postService.state.value
      };
      console.log(this.items);
    });
  };

  fetch = () => {
    this.postService.send("FETCH", { postId: this.items.postId });
  };

  retry = () => {
    this.postService.send("RETRY");
  };
}

export const postStore = new PostStore();
