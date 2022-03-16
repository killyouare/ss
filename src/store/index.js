import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: { token: "", error: new Map(), role: "" },
  getters: {
    getToken: (state) => state.token,
    getErrors: (state) => state.error,
  },
  mutations: {
    setToken(state, token) {
      localStorage.setItem('userToken', token)
      state.token = token;
    },
    setError(state, error) {
      if (error.errors) state.error.set("errors", error.errors);
      state.error.set("message", error.message);
    },
    clearToken(state) {
      state.token = ""
    }
  },
  actions: {
    async Login(context, body) {
      await fetch("http://127.0.0.1:8000/api-cafe/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(body)
      })
        .then(response => response.json())
        .then(res => res.data ? context.commit("setToken", res.data.user_token) : context.commit("setError", res.error)
        )
        .catch(err => err)
    },
    async Logout(context) {
      await fetch("http://127.0.0.1:8000/api-cafe/logout", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          "Authorization": `Bearer ${this.getters.getToken}`
        },
      })
      localStorage.clear()
      context.commit("clearToken")
    },
    async GetUsers() {
      const users = await fetch("http://127.0.0.1:8000/api-cafe/user", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          "Authorization": `Bearer ${this.getters.getToken}`
        },
      })
        .then(res => res.json()).catch(e => console.log(e))
      return users.data;
    },
    async GetUser(context, id) {
      const user = await fetch(`http://127.0.0.1:8000/api-cafe/user/${id}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          "Authorization": `Bearer ${this.getters.getToken}`
        },
      })
        .then(res => res.json()).catch(e => console.log(e))
      return user.data;
    },
    async GetWorkShifts() {
      const workShifts = await fetch("http://127.0.0.1:8000/api-cafe/work-shift", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          "Authorization": `Bearer ${this.getters.getToken}`
        },
      })
        .then(res => res.json()).catch(e => console.log(e))
      return workShifts;
    },
    async GetOrders(context, id) {
      const orders = await fetch(`http://127.0.0.1:8000/api-cafe/work-shift/${id}/order`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          "Authorization": `Bearer ${this.getters.getToken}`
        },
      })
        .then(res => res.json()).catch(e => console.log(e))
      return orders.data;
    },
    async CheckUser(context) {
      const token = localStorage.getItem('userToken')
      if (token) context.commit('setToken', token)
    }
  },
  modules: {},
})
