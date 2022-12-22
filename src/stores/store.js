import { reactive } from 'vue'

export const store = reactive({
  user: '',
  teamA: [],
  teamB: [],
  character: { 'name': 'test' },
  async setTeamA(team) {
    for (let counter = 0; counter < team.length; counter++) {
      let char = { name: team[counter], alive: true };
      char.event = await this.getImageAndEvent(char.name);
      char.image = char.event[0].image;
      this.teamA.push(char);
    }
  },
  async setTeamB(team) {
    for (let counter = 0; counter < team.length; counter++) {
      let char = { 'name': team[counter], alive: true };
      char.event = await this.getImageAndEvent(char.name);
      char.image = char.event[0].image;
      this.teamB.push(char);
    }
  },
  async getImageAndEvent(name) {
    if (name === 'Lucio') {
      name = 'Lúcio';
    }
    else if (name === 'Torbjorn') {
      name = 'Torbjörn';
    }
    else if (name === 'Junker-Queen') {
      name = 'Junker Queen';
    }
    else if (name === 'Soldier-76') {
      name = 'Soldier: 76';
    }
    else if (name === 'wrecking-ball') {
      name = 'Wrecking Ball';
    }
    else {
      name = name.charAt(0).toUpperCase() + name.slice(1);
    }
    let url = 'http://localhost:3000/owapi/heroes/event/' + name;
    let data = await fetch(url).catch((err) => console.log(err));
    let image = await data.json();
    console.log(image)
    return image;
  }
})