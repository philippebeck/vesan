import { defineStore } from 'pinia'

export const userStore = (app) => defineStore("user", {
  state: () => ({
    users: []
  }),

  getters: {
    getUsers(state){
        return state.users
      }
  },

  actions: {
    async fetchUsers() {
      try {
        app.config.globalProperties.$serve.getData("/api/users/check")
          .then(res => { 
            this.users = res;
            console.log(this.users);
          })
          .catch(err => { console.log(err) });

      } catch (error) {
        alert(error)
        console.log(error)
      }
    }
  }
})
