import { reactive } from 'vue'

export const store = reactive({
  user: '',
  teamA: [],
  teamB: [],
  character: { 'name': 'test' },
  async setTeamA(team) {
    this.teamA = [];
    for (let counter = 0; counter < team.length; counter++) {
      let char = { name: team[counter], alive: true };
      char.event = await this.getImageAndEvent(char.name);
      console.log('char')
      console.log(char)
      char.image = char.event[0].image;
      this.teamA.push(char);
    }    
    console.log('TEAM 1')
    console.log(this.teamA)

  },
  async setTeamB(team) {
    this.teamB = [];
    for (let counter = 0; counter < team.length; counter++) {
      let char = { 'name': team[counter], alive: true };
      char.event = await this.getImageAndEvent(char.name);
      console.log('char')
      console.log(char)
      char.image = char.event[0].image;
      this.teamB.push(char);
    }    
    console.log('TEAM 2')
    console.log(this.teamB)

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
    return image;
  }
})