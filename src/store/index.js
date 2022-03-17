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
      for (let i in error) {
        state.error.set(i, error[i]);
      }
    },
    clearToken(state) {
      state.token = ""
    }
  },
  actions: {
    async Login(context, body) {
      await fetch("http://localhost/api-cafe/login", {
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
      await fetch("http://localhost/api-cafe/logout", {
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
      const users = await fetch("http://localhost/api-cafe/user", {
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
      const user = await fetch(`http://localhost/api-cafe/user/${id}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          "Authorization": `Bearer ${this.getters.getToken}`
        },
      })
        .then(res => res.json()).catch(e => console.log(e))
      return user.data;
    },
    async CreateUser(context, body) {
      let formData = new FormData();
      for (let i in body) {
        formData.append(i, body[i]);
      }
      const user = await fetch(`http://localhost/api-cafe/user`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${this.getters.getToken}`
        },
        body: formData
      })
        .then(res => res.json())
        .then(res => res.data ? res : context.commit("setError", res.error))
        .catch(e => console.log(e))
      return user;
    },
    async dismiss(context, id) {
      const user = await fetch(`http://localhost/api-cafe/user/${id}/to-dismiss`, {
        method: "get",
        headers: {
          "Authorization": `Bearer ${this.getters.getToken}`
        },
      })
        .then(res => res.json())
        .catch(e => console.log(e))
      return user;
    },
    async GetWorkShifts() {
      const workShifts = await fetch("http://localhost/api-cafe/work-shift", {
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
      const orders = await fetch(`http://localhost/api-cafe/work-shift/${id}/order`, {
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
