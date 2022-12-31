import Vuex from 'vuex'
import {router} from '../router/router.js'

export const authstore = Vuex.createStore ({
    state() {
        return {
            connected : false
        }
    },
    getters: {
        isConnected(state) {
            return state.connected;
        }
    },
    mutations: {
        logout(state) {
            sessionStorage.removeItem('token');
            state.connected = false;
            router.push({
                name: 'Login'
            });
        },
        setConnected(state) {
            state.connected = true;
        }
    }
    
});