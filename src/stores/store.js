import { reactive } from 'vue'

export const store = reactive({
  user: '',
  teamA: [],
  teamB: [],
  character: {'name': 'test'},
  async setTeamA(team) {
    for (let counter = 0; counter < team.length; counter++) {
        let char = {name: team[counter], alive: true};
        char.event = await this.getImageAndEvent(char.name);
        char.image = char.event[0].image;
        this.teamA.push(char);
    }
  },
  async setTeamB(team) {
    for (let counter = 0; counter < team.length; counter++) {
        let char = {'name': team[counter], alive: true};
        char.event = await this.getImageAndEvent(char.name);
        char.image = char.event[0].image;
        this.teamB.push(char);
    }
  },
  async getImageAndEvent(name) {
    let url = 'http://localhost:3000/owapi/heroes/event/' + name;
    let data = await fetch(url).catch((err) => console.log(err));
    let image = await data.json();
    return image;
  }
})