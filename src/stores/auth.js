import Vuex from 'vuex'

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
        },
        setConnected(state) {
            state.connected = true;
        }
    }
    
});