<template>
  <section>
    <h2>nuxt-mobx-xstate</h2>
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">
                {{ store.appStore.name }}
                <small>{{ store.appStore.version }}</small>
              </h5>
              <p class="card-text">{{ store.appStore.date }}</p>
              <button class="btn btn-sm" v-on:click="store.appStore.onUpdateVersion">🔄</button>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-6">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Counter</h5>
              <p class="card-text">Value: {{ store.counterStore.value }}</p>
              <div class="btn-group" role="group" aria-label="Basic example">
                <button class="btn btn-sm" v-on:click="store.counterStore.increase">🔼</button>
                <button class="btn btn-sm" v-on:click="store.counterStore.decrease">🔽</button>
              </div>
            </div>
          </div>
        </div>
        <div class="col-6">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">
                <a
                  target="_blank"
                  href="https://xstate.js.org/viz/?gist=https://gist.github.com/azamara/f3091af109d9f423d02d09b944d69573"
                >CounterMachine</a>
              </h5>
              <p class="card-text">Value: {{ store.counterStoreWithFSM.value }}</p>
              <div class="btn-group" role="group" aria-label="Basic example">
                <button class="btn btn-sm" v-on:click="store.counterStoreWithFSM.increase">🔼</button>
                <button class="btn btn-sm" v-on:click="store.counterStoreWithFSM.decrease">🔽</button>
                <button class="btn btn-sm" v-on:click="store.counterStoreWithFSM.init">♻️</button>
                <button class="btn btn-sm" v-on:click="store.counterStoreWithFSM.destroy">🗑️</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">
                <a
                  target="_blank"
                  href="https://xstate.js.org/viz/?gist=https://gist.github.com/azamara/a213740d94d7d23aa510154f5d1cb5e4"
                >PostMachine</a>
              </h5>
              <div class="form-group">
                <label for="exampleFormControlSelect1">Post ID: {{store.postStore.items.postId}}</label>
                <select
                  class="form-control"
                  id="exampleFormControlSelect1"
                  v-model="store.postStore.items.postId"
                >
                  <option value>-</option>
                  <option value="1">1</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="30">30</option>
                  <option value="40">40</option>
                </select>
              </div>
              <p class="card-text">Posts Length: {{ store.postStore.items.posts.length }}</p>
              <div class="btn-group" role="group" aria-label="Basic example">
                <button type="button" class="btn btn-sm" v-on:click="store.postStore.fetch">Fetch</button>
                <button
                  type="button"
                  class="btn btn-sm"
                  v-on:click="store.postStore.retry"
                  v-if="store.postStore.items.value === 'failure'"
                >Retry</button>
                <button type="button" class="btn btn-sm" v-on:click="store.postStore.init">♻️</button>
                <button type="button" class="btn btn-sm" v-on:click="store.postStore.destroy">🗑️</button>
              </div>
            </div>
          </div>

          <hr>
          <ul class="list-group">
            <li
              class="list-group-item"
              v-for="item in store.postStore.items.posts"
              v-bind:key="item.id"
            >{{ item.id }}. {{ item.title }}</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Logo from "~/components/Logo.vue";
import IconLink from "~/components/IconLink.vue";
import { appStore, counterStore, counterStoreWithFSM } from "../store/appStore";
import { postStore } from "../store/postStore";

export default {
  components: {
    Logo,
    IconLink
  },
  data() {
    return {
      store: { appStore, counterStore, counterStoreWithFSM, postStore }
    };
  }
};
</script>

<style scoped>
.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 400;
  font-size: 100px;
  color: #2E495E;
  letter-spacing: 1px;
  font-size: 6em;
}
.green {
  color: #00C48D;
}

.subtitle {
  font-weight: 300;
  font-size: 3em;
  color: #2E495E;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
