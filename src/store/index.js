import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: { token: '' },
  getters: {
    getToken: (state) => {
      return state.token
    }
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    }
  },
  actions: {
    async Login(context, body) {
      const res = await fetch("http://lifestealer86.ru/api-cafe/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(body)
      })
        .then(res => res.json())
        .then(res => res.data.user_token)
        .catch(err => err)
      context.commit("setToken", res);
    }
  },
  modules: {},
});
