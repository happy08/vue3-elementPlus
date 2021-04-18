//import Vue from "vue";
import { createStore, Store, useStore as baseUseStore } from 'vuex'

//Vue.use(Vuex);
import user from "./modules/user";
import router from "./modules/router";
import app from "./modules/app";

export default createStore({
  modules: {
    user,
    router,
    app
  }
});

