import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        catalog:'',
        contentOffset:''
    },
    mutations:{
        setCatalog(state,value){
            console.log(value)
            state.catalog=value
        },
        setContentOffset(state,value){
            console.log(value)
            state.contentOffset=value
        }
    }
}) 