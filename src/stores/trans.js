import Vuex from 'vuex'
import { getImageAndEvent } from '../database/Character.js';


//the store containing all the information relative to the two teams that fight
export const matchstore = Vuex.createStore({
    state() {
        return {
            teamA: [],
            teamB: []
        }
    },
    getters: {
        getTeamA(state) {
            return state.teamA;
        },
        getTeamB(state) {
            return state.teamB;
        },
        getNames(state) {
            let TA = '';
            let TB = '';
            if (state.teamA.length === state.teamA.length) {
                for (let counter = 0; counter < state.teamA.length; counter++) {
                    TA = TA + state.teamA[counter].name;
                    TB = TB + state.teamB[counter].name;
                }
            }
        }
    },
    mutations: {
        setTeamAMutation(store, team) {
            store.teamA = team;
        },
        setTeamBMutation(store, team) {
            store.teamB = team;
        }
    },
    actions: {
        async setTeamA(store, team) {
            let ta = [];
            for (let counter = 0; counter < team.length; counter++) {
                let char = { name: team[counter], alive: true };
                char.event = await getImageAndEvent(char.name);
                char.image = char.event[0].image;
                ta.push(char);
            }
            store.commit('setTeamAMutation', ta)
        },
        async setTeamB({commit}, team) {
            let tb = [];
            for (let counter = 0; counter < team.length; counter++) {
                let char = { 'name': team[counter], alive: true };
                char.event = await getImageAndEvent(char.name);
                char.image = char.event[0].image;
                tb.push(char);
            }
            commit('setTeamBMutation', tb)
        },

    }
});