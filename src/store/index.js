import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: { token: "", error: new Map(), role: "" },
  getters: {
    getToken: (state) => state.token,
    getRole: (state) => state.role,
    getErrors: (state) => state.error,
  },
  mutations: {
    setToken(state, token) {
      localStorage.setItem('userToken', token)
      state.token = token;
    },
    setRole(state, role) {
      localStorage.setItem('userRole', role)
      state.role = role;
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
      context.dispatch("getRole");
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
    async GetWokrerOnShift(context, id) {
      const workShifts = await fetch(`http://localhost/api-cafe/work-shift/${id}`, {
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
    async CheckUser({ getters, commit }) {
      const token = localStorage.getItem('userToken')
      const role = localStorage.getItem("userRole");
      if (token) commit('setToken', token)
      if (role) commit('setRole', role)
      return { token: getters.getToken, role: getters.getRole }
    },
    async OpenShift(context, id) {
      const shift = await fetch(`http://localhost/api-cafe/work-shift/${id}/open`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${this.getters.getToken}`
        },
      })
        .then(res => res.json())
        .then(res => res.data ? res : context.commit("setError", res.error))
        .catch(e => console.log(e))
      return shift;
    },
    async CloseShift(context, id) {
      const shift = await fetch(`http://localhost/api-cafe/work-shift/${id}}/close`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${this.getters.getToken}`
        },
      })
        .then(res => res.json())
        .then(res => res.data ? res : context.commit("setError", res.error))
        .catch(e => console.log(e))
      return shift;
    },
    async addUserToShift(context, body) {
      const shift = await fetch(`http://localhost/api-cafe/work-shift/${body.id}/user`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          "Authorization": `Bearer ${this.getters.getToken}`
        },
        body: JSON.stringify({ user_id: body.user_id })
      })
        .then(res => res.json())
        .then(res => res.data ? res : context.commit("setError", res.error))
        .catch(e => console.log(e))
      return shift;
    },
    async delUserToShift(context, body) {
      const shift = await fetch(`http://localhost/api-cafe/work-shift/${body.id}/user/${body.user_id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${this.getters.getToken}`
        },
      })
        .then(res => res.json())
        .then(res => res.data ? res : context.commit("setError", res.error))
        .catch(e => console.log(e))
      return shift;
    },
    async CreateWorkShift(context, body) {
      const shift = await fetch(`http://localhost/api-cafe/work-shift`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          "Authorization": `Bearer ${this.getters.getToken}`
        },
        body: JSON.stringify(body)
      })
        .then(res => res.json())
        .then(res => res.error ? context.commit("setError", res.error) : res)
        .catch(e => console.log(e))
      return shift;
    },
    async WaiterGetOrders(context, id) {
      const shift = await fetch(`http://localhost/api-cafe/work-shift/${id}/order`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${this.getters.getToken}`
        },
      })
        .then(res => res.json())
        .then(res => res.error ? context.commit("setError", res.error) : res)
        .catch(e => console.log(e))
      return shift;
    },
    async getRole(context) {
      if (await context.dispatch('GetUsers')) return context.commit("setRole", "admin")
      const res = await context.dispatch('WaiterGetOrders', 1)
      if (res.data || res.error.message == "Forbidden. You didn't work this shift!") return context.commit("setRole", "waiter")
      return context.commit("setRole", "cook")
    },
    async active(context) {
      const res = await fetch(`http://localhost/api-cafe/work-shift/active/get`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${this.getters.getToken}`
        },
      })
        .then(res => res.json())
        .then(res => res.error ? context.commit("setError", res.error) : res)
        .catch(e => console.log(e))
      return res
    },
    async changeStatus(context, body) {
      const res = await fetch(`http://localhost/api-cafe/order/${body.id}/change-status`, {
        method: "PATCH",
        headers: {
          "Authorization": `Bearer ${this.getters.getToken}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify({ status: body.status })
      })
        .then(res => res.json())
        .then(res => res.error ? context.commit("setError", res.error) : res)
        .catch(e => console.log(e))
      return res
    },
    async getOrder(context, id) {
      const res = await fetch(`http://localhost/api-cafe/order/${id}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${this.getters.getToken}`,
        },
      })
        .then(res => res.json())
        .then(res => res.error ? context.commit("setError", res.error) : res)
        .catch(e => console.log(e))
      return res
    },
    async delPosition(context, body) {
      const res = await fetch(`http://localhost/api-cafe/order/${body.order_id}/position/${body.position_id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${this.getters.getToken}`,
        },
      })
        .then(res => res.json())
        .then(res => res.error ? context.commit("setError", res.error) : res)
        .catch(e => console.log(e))

      return res
    },
  },
  modules: {},
})
