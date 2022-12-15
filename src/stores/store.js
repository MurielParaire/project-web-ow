import { reactive } from 'vue'

export const store = reactive({
  user: '',
  teamA: [],
  teamB: [],
  character: {'name': 'test'},
  setTeamA(team) {
    for (let counter = 0; counter < team.length; counter++) {
        let char = {'name': team[counter], alive: true}
        this.teamA.push(char)
    }
  },
  setTeamB(team) {
    for (let counter = 0; counter < team.length; counter++) {
        let char = {'name': team[counter], alive: true}
        this.teamB.push(char)
    }
  }
})