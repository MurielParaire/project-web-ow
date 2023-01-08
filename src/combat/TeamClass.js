/**
 * description : this class initialisez a Team
 */
export default class Team {
    constructor(team) {
        this.team = team;
        this.countAlive = team.length;
        this.initTeam();
    }

    /**
     * Description: Initialise the teams
     * */
    initTeam() {
        for (let counter = 0; counter < this.team.length; counter++) {
            this.team[counter].immobile = false;
            this.team[counter].protected = false;
            this.team[counter].atCombat = true;
            this.team[counter].alive = true;
            //first two characters are support
            if (counter < 2) {
                this.team[counter].role = 0;
            }
            //last character is tank
            else if (counter === 4) {
                this.team[counter].role = 2;
            }
            //others are DPS
            else {
                this.team[counter].role = 1;
            }
        }
    }
}