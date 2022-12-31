export default class Team {
    constructor(team) {
        this.team = team;
        this.countAlive = team.length;
        this.initTeam();
    }

    initTeam() {
        for (let counter = 0; counter < this.team.length; counter++) {
            this.team[counter].immobile = false;
            this.team[counter].protected = false;
            this.team[counter].atCombat = true;
            this.team[counter].alive = true;
            if (counter < 2) {
                this.team[counter].role = 0;
            }
            else if (counter === 4) {
                this.team[counter].role = 2;
            }
            else {
                this.team[counter].role = 1;
            }
        }
    }
}