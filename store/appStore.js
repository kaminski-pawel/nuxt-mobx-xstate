import { interpret } from "xstate";
import { observable, runInAction } from "mobx";
import uuid from "uuid/v4";
// import { eventEmitter } from "../commons/eventEmitter";
import { counterMachine } from "../machines/counterMachine";

const defaultObservable = {
  name: "nuxt-mobx-xstate"
};

export class CounterStoreWithFSM {
  value = observable.box(0);

  constructor() {
    this.init();
  }

  init = () => {
    this.destroy();
    this.uuid = uuid();
    this.counterService = interpret(counterMachine).start();
    this.updateContext();
  };

  updateContext = () => {
    runInAction(() => {
      this.value = this.counterService.state.context.count;
    });
  };

  destroy = () => {
    if (this.counterService) {
      this.counterService.stop();
      this.updateContext();
    }
  };

  increase = () => {
    this.counterService.send("INC");
    this.updateContext();
  };
  decrease = () => {
    this.counterService.send("DEC");
    this.updateContext();
  };
}

export class CounterStore {
  value = observable.box(0);

  increase = () => {
    runInAction(() => {
      this.value = this.value + 1;
    });
  };
  decrease = () => {
    this.value = this.value - 1;
  };
}

export class AppStore {
  version = observable.box("1.0.0!!!");
  name = observable.box("nuxt-mobx-starter");
  date = observable.box(`${new Date()}`);

  onUpdateVersion = () => {
    runInAction(() => {
      this.version = `1.0.0-${+new Date()}`;
      this.name = `${defaultObservable.name}-${+new Date()}`;
      this.date = `${new Date()}`;
    });
  };
}

export const appStore = new AppStore();
export const counterStore = new CounterStore();
export const counterStoreWithFSM = new CounterStoreWithFSM();
