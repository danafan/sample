import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {  
    userInfo:{
      user_type:'1'
    },
    unreturnnum:0
  },
  mutations: {
    //用户信息
    setUserInfo (state, info) {  
      state.userInfo = info;
    },
    //待借用数量
    setUnReturnNum (state, num) {  
      state.unreturnnum = num;
    },
  },
  actions: {
    
  }

})
export default store;

