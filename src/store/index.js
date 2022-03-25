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
        .then(result => {
          console.log(result)
          return result.error ? commit("setErrors", result.error) : commit("setData", result)
        })
        .catch(err => err);
    },
    async getUserRole({ state, dispatch, commit }) {
      await dispatch('f', { path: "user" });
      if (state.data) return commit("setRole", "admin")
      await dispatch('f', {
        path: "work-shift/1/order"
      })
      if (state.data || state.errors.message != "Forbidden for you") return commit("setRole", "waiter")
      commit('clearErrors')
      return commit("setRole", "cook")
    },
    async CheckUser({ getters, commit }) {
      const token = localStorage.getItem('userToken')
      const role = localStorage.getItem("userRole");
      if (token) commit('setToken', token)
      if (role) commit('setRole', role)
      return { token: getters.getToken, role: getters.getRole }
    },

  },
  modules: {},
})
