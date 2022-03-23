import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: null,
    errors: null,
    data: null,
    role: null,
    modal: null,
    host: process.env.HOST || "http://127.0.0.1:8000/api-cafe"
  },
  getters: {
    getData: (state) =>
      state.data?.data
    ,
  },
  mutations: {
    setToken: (state, token) => {
      localStorage.setItem('userToken', token)
      state.token = token
    },
    setRole: (state, role) => {
      localStorage.setItem('userRole', role)
      state.role = role;
    },
    setErrors: (state, error) => state.errors = error,
    setModal: (state, modal) => state.modal = modal,
    setData: (state, data) => {
      return state.data = data;
    },

    clearUser: state => {
      localStorage.clear();
      return state.token = state.role = null
    },
    clearErrors: state => state.errors = null,
    clearModal: state => state.modal = null,
    clearData: state => state.data = null,

  },
  actions: {
    test() {
      console.log(process.env.HOST);
    },
    async f({ commit, state }, { path, method = 'get', data = [], useToken = true, form = false }) {
      commit("clearData");
      commit("clearErrors");
      method = method.toUpperCase();
      let options = {
        method: method,
        headers: {},
      }
      if (useToken) {
        options.headers['Authorization'] = `Bearer ${state.token}`;
      }
      if (!form) {
        options.headers['Content-Type'] = 'application/json';
        if (["POST", "PATCH"].includes(method)) {
          options.body = JSON.stringify(data)
        }
      } else {
        let formData = new FormData();
        for (let name in data) {
          formData.append(name, data[name])
        }
        options.body = formData
      }
      await fetch(`${state.host}/${path}`, options)
        .then(res => res.json())
        .then(result => result.error ? commit("setErrors", result.error) : commit("setData", result))
        .catch(err => err);
    },
    async getUserRole({ state, dispatch, commit }) {
      await dispatch('f', { path: "user" });
      if (state.data) return commit("setRole", "admin")
      await dispatch('f', {
        path: "work-shift/1/order"
      })
      if (state.data || state.errors.message != "Forbidden for you") return commit("setRole", "waiter")
      return commit("setRole", "cook")
    },
    async Login(context, body) {
      await fetch("http://127.0.0.1:8000/api-cafe/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(body)
      })
        .then(response => response.json())
        .then(res => res.error ? context.commit("setToken", res.data.user_token) : context.commit("setError", res.error))
        .catch(err => err)
      context.dispatch("getUserRole");
    },
    async Logout(context) {
      await fetch("http://127.0.0.1:8000/api-cafe/logout", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          "Authorization": `Bearer ${this.getters.getToken}`
        },
      })
      context.commit("clearUser")
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
      const user = await fetch(`http://127.0.0.1:8000/api-cafe/${id}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          "Authorization": `Bearer ${this.getters.getToken}`
        },
      })
        .then(res => res.json()).catch(e => console.log(e))
      return user.data;
    },

    async dismiss(context, id) {
      const user = await fetch(`http://127.0.0.1:8000/api-cafe/user/${id}/to-dismiss`, {
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
    async GetWokrerOnShift(context, id) {
      const workShifts = await fetch(`http://127.0.0.1:8000/api-cafe/work-shift/${id}`, {
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
    async CheckUser({ getters, commit }) {
      const token = localStorage.getItem('userToken')
      const role = localStorage.getItem("userRole");
      if (token) commit('setToken', token)
      if (role) commit('setRole', role)
      return { token: getters.getToken, role: getters.getRole }
    },
    async OpenShift(context, id) {
      const shift = await fetch(`http://127.0.0.1:8000/api-cafe/work-shift/${id}/open`, {
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
      const shift = await fetch(`http://127.0.0.1:8000/api-cafe/work-shift/${id}}/close`, {
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
      const shift = await fetch(`http://127.0.0.1:8000/api-cafe/work-shift/${body.id}/user`, {
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
      const shift = await fetch(`http://127.0.0.1:8000/api-cafe/work-shift/${body.id}/user/${body.user_id}`, {
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
      const shift = await fetch(`http://127.0.0.1:8000/api-cafe/work-shift`, {
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
    async createOrder(context, body) {
      const shift = await fetch(`http://127.0.0.1:8000/api-cafe/order`, {
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
    async createPosition(context, body) {
      const shift = await fetch(`http://127.0.0.1:8000/api-cafe/order/${body.id}/position`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          "Authorization": `Bearer ${this.getters.getToken}`
        },
        body: JSON.stringify({ menu_id: body.menu_id, count: body.count })
      })
        .then(res => res.json())
        .then(res => res.error ? context.commit("setError", res.error) : res)
        .catch(e => console.log(e))
      return shift;
    },
    async WaiterGetOrders(context, id) {
      const shift = await fetch(`http://127.0.0.1:8000/api-cafe/work-shift/${id}/order`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${this.getters.getToken}`
        },
      })
        .then(res => res.json())
        .catch(e => console.log(e))
      return shift;
    },

    async active(context) {
      const res = await fetch(`http://127.0.0.1:8000/api-cafe/work-shift/active/get`, {
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
      const res = await fetch(`http://127.0.0.1:8000/api-cafe/order/${body.id}/change-status`, {
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
      const res = await fetch(`http://127.0.0.1:8000/api-cafe/order/${id}`, {
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
    async getMenu(context) {
      const res = await fetch(`http://127.0.0.1:8000/api-cafe/menu`, {
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
    async getOrdersCook(context) {
      const res = await fetch(`http://127.0.0.1:8000/api-cafe/order/taken/get`, {
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
      const res = await fetch(`http://127.0.0.1:8000/api-cafe/order/${body.order_id}/position/${body.position_id}`, {
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
