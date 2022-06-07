import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {  
    userInfo:{
      user_type:'1'
    }
  },
  mutations: {
    //用户信息
    setUserInfo (state, info) {  
      state.userInfo = info;
    },
  },
  actions: {
    
  }

})
export default store;

