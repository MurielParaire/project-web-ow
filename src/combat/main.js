import Team from './TeamClass.js'

/**
 * description : this class calculates a random elimination combat between two teams of 5 players each.
 */
export default class Combat {
    /**
     * Description: create a new instance of combat
     * Arguments: 
     *      - ta (required) : team A
     *      - tb (required) : team B
     *      - events (required) : a list of all events without any hero connected to them
     * */
    constructor(ta, tb, events) {
        let teamA = new Team(ta);
        let teamB = new Team(tb)
        //this.teams will safe both of the teams that are fighting
        this.teams = [teamA, teamB]
        //this.events contains all normal events (no character associated)
        this.events = events;
        //this.combat contains all the combat information, so the images of the two heroes, their teams and the event description
        this.combat = []
        //while at least one character in both teams is alive
        while (this.teams[0].countAlive > 0 && this.teams[1].countAlive > 0) {
            //cleanse the characters of all effects (immobile, protected, fled)
            this.initCharactersRound();
            //play a new round of the game
            this.playRound()
        }
        //defining the winner
        if (this.teams[0].countAlive === 0) {
            this.winner = 'B';
        }
        else {
            this.winner = 'A';
        }
    }

    /**
     * Description: play a round of the combat
     * */
    playRound() {
        //I defined a round to last for 4 events to happen.
        //During these 4 events, heroes who have been immobilized, fled the scene or were protected keep those effects
        for (let counter = 0; counter < 4; counter++) {
            //if at least one character in each of the teams is alive we continue
            if (this.teams[0].countAlive > 0 && this.teams[1].countAlive > 0) {
                //get a random number which will define if we play a normal or a special event
                //normal event => has no hero associated
                //special event => an event of a specific hero
                let rand = this.getRandom();
                if (rand === 0) {
                    this.playNormalEvent();
                }
                else {
                    this.playSpecialEvent();
                }
            }
        }
    }

    /**
     * Description: cleanse the characters of both teams of all effects (immobile, protected, fled)
     * */
    initCharactersRound() {
        (this.teams[0].team).forEach(hero => {
            hero.immobile = false;
            hero.protected = false;
            hero.atCombat = true;
        });
        (this.teams[1].team).forEach(hero => {
            hero.immobile = false;
            hero.protected = false;
            hero.atCombat = true;
        });
    }

    /**
     * Description: gets the team colour (like in the real game I used blue and red)
     * Returns: string, either red or blue
     * */
    getColour(Team) {
        if (Team === 1) {
            return 'red';
        }
        return 'blue'
    }

    /**
     * Description: play a normal event
     * */
    playNormalEvent() {
        //choose a random events off all the normal events there are
        let counter = Math.floor(Math.random() * this.events.length);
        let normalevent = this.events[counter];
        let event = {};
        //choose a random team to set as our active team this round
        let Iteam = this.getRandom()
        let OTeam = 0;
        if (Iteam === 0) {
            OTeam = 1;
        }
        event.img = [];
        event.chars = [];
        event.colour = [];
        event.type = normalevent.type;
        event.description = normalevent.description;
        //get our first character
        let charIndex = this.getCharacter(Iteam, '', false, false, false, false);
        if (charIndex === -1) {
            return 0;
        }
        let char = this.teams[Iteam].team[charIndex];
        event.img.push(char.image);
        event.colour.push(this.getColour(Iteam));
        let index = event.description.indexOf('$');
        event.description = event.description.substring(0, index) + char.name + event.description.substring(index + 2);
        if (normalevent.type === 'kill') {
            index = event.description.indexOf('$');
            charIndex = this.getCharacter(OTeam, '', true, false, false, false);
            if (charIndex === -1) {
                return 0;
            }
            char = this.teams[OTeam].team[charIndex];
            if (char.protected === false && char.atCombat === true) {
                event.img.push(char.image)
                event.colour.push(this.getColour(OTeam));
                event.description = event.description.substring(0, index) + char.name + event.description.substring(index + 2);
            }
        }
        else if (normalevent.type === 'protect' || normalevent.type === 'help' || normalevent.type === 'heal') {
            index = event.description.indexOf('$');
            charIndex = this.getCharacter(Iteam, char.name, false, true, false, false);
            if (charIndex === -1) {
                return 0;
            }
            let char2 = this.teams[Iteam].team[charIndex];
            if (char.role === 1 || (normalevent.type === 'heal' && char.role !== 0)) {
                return 0;
            }
            if (char2.atCombat === true) {
                event.img.push(char2.image)
                event.colour.push(this.getColour(Iteam));
                event.description = event.description.substring(0, index) + char2.name + event.description.substring(index + 2);
            }
            else {
                return 0;
            }
        }
        else if (normalevent.type === 'flee') {
            this.teams[Iteam].team[normalevent.counter].atCombat = false;
        }
        //push this combat to our combat history if it isn't null
        if (this.combat.length > 0 && event.description !== this.combat[this.combat.length - 1].description && event.description !== '' && event.description.indexOf('$') < 0) {
            this.combat.push(event);
        }
        else if (event.description !== '' && event.description.indexOf('$') < 0) {
            this.combat.push(event);
        }
    }

    /**
     * Description: gets the names off all heroes of a team
     * Arguments:
     *      - team : the team
     * Returns: a string with all the names of the heroes
     * */
    namesToString(team) {
        let names = '';
        for (let counter = 0; counter < team.length; counter++) {
            names = names + ' ' + team[counter].name;
        }
        return names;
    }

    /**
     * Description: gets a special event
     * Arguments:
     *      - Iteam : the index of the team to use
     * Returns: a special event
     * */
    getSpecialEvent(Iteam) {
        let counter = 0;
        let event = {};
        //get a random index for a hero of this team
        counter = Math.floor(Math.random() * this.teams[Iteam].team.length);
        let rand = counter;
        //verify that this hero is alive and not immobile
        while (this.teams[Iteam].team[rand].alive !== true || this.teams[Iteam].team[rand].immobile === true) {
            if (rand === this.teams[Iteam].team.length - 1) {
                rand = 0;
            }
            else {
                rand = rand + 1;
            }
            //if we have looked through all heroes of this team then return
            if (rand === counter) {
                return 0;
            }
        }
        //get a random event
        if (this.teams[Iteam].team[rand].event.length > 0) {
            if (this.teams[Iteam].team[rand].event.length > 1) {
                let random = this.getRandom();
                event.description = this.teams[Iteam].team[rand].event[random];
            }
            event.description = this.teams[Iteam].team[rand].event[0];
        }
        else {
            return 0;
        }
        event.char = this.teams[Iteam].team[rand].name;
        event.image = this.teams[Iteam].team[rand].image;
        if (event.description.type === 'flee') {
            this.teams[Iteam].team[rand].atCombat = false;
        }
        //index of the hero
        event.counter = rand;
        return event;
    }

    /**
     * Description: plays a special event
     * */
    playSpecialEvent() {
        //choose a random team to set as our active team this round
        let Iteam = this.getRandom()
        let OTeam = 0;
        if (Iteam === 0) {
            OTeam = 1;
        }
        //get a special event from one of the characters
        let specialevent = this.getSpecialEvent(Iteam)
        let event = {};
        event.description = '';
        event.img = [];
        event.colour = [];
        event.chars = [];
        event.type = specialevent.type;
        //if the type of the specialevent is kill we choose a hero of the enemy team
        if (specialevent.description.type === 'kill') {
            event.description = specialevent.description.description.toString();
            event.img.push(specialevent.image);
            event.colour.push(this.getColour(Iteam));
            event.chars.push(specialevent.char);
            let index = event.description.indexOf('$');
            event.description = event.description.substring(0, index) + specialevent.char + event.description.substring(index + 2);
            index = event.description.indexOf('$');
            let charIndex = this.getCharacter(OTeam, '', true, false, false, false);
            //if no character could be found return
            if (charIndex === -1) {
                return 0;
            }
            //add the character to our event
            let char = this.teams[OTeam].team[charIndex];
            if (char.protected === false && char.atCombat === true) {
                event.chars.push(char.name)
                event.img.push(char.image)
                event.colour.push(this.getColour(OTeam));
                event.description = event.description.substring(0, index) + char.name + event.description.substring(index + 2);
            }
        }
        else if (specialevent.description.type === 'protect' || specialevent.type === 'help' || specialevent.type === 'heal') {
            event.description = specialevent.description.description.toString();
            event.img.push(specialevent.image)
            event.colour.push(this.getColour(Iteam));
            event.chars.push(specialevent.char)
            let index = event.description.indexOf('$');
            event.description = event.description.substring(0, index) + specialevent.char + event.description.substring(index + 2);
            index = event.description.indexOf('$');
            let charIndex = this.getCharacter(Iteam, specialevent.char, false, true, false, false);
            if (charIndex === -1) {
                return 0;
            }
            let char = this.teams[Iteam].team[charIndex];
            if (char.atCombat === true) {
                event.chars.push(char.name)
                event.img.push(char.image)
                event.colour.push(this.getColour(Iteam));
                event.description = event.description.substring(0, index) + char.name + event.description.substring(index + 2);
            }
        }
        else if (specialevent.description.type === 'flee') {
            event.description = specialevent.description.description.toString();
            event.img.push(specialevent.image)
            event.colour.push(this.getColour(Iteam));
            event.chars.push(specialevent.char)
            let index = event.description.indexOf('$');
            event.description = event.description.substring(0, index) + specialevent.char + event.description.substring(index + 2);
        }
        else if (specialevent.description.type === 'res' && this.teams[Iteam].countAlive < 5) {
            event.description = specialevent.description.description.toString();
            event.img.push(specialevent.image)
            event.colour.push(this.getColour(Iteam));
            event.chars.push(specialevent.char)
            let index = event.description.indexOf('$');
            event.description = event.description.substring(0, index) + specialevent.char + event.description.substring(index + 2);
            index = event.description.indexOf('$');
            let indexchar = this.getDeadCharacter(Iteam);
            if (indexchar !== -1) {
                let char = this.teams[Iteam].team[indexchar]
                event.img.push(char.image)
                event.colour.push(this.getColour(Iteam));
                event.chars.push(char.name)
                event.description = event.description.substring(0, index) + char.name + event.description.substring(index + 2);
            }
        }
        else if (specialevent.description.type === 'Bob') {
            event.description = specialevent.description.description.toString();
            let index = event.description.indexOf('$');
            event.description = event.description.substring(0, index) + specialevent.char + event.description.substring(index + 2);
            event.img.push('https://images.blz-contentstack.com/v3/assets/blt2477dcaf4ebd440c/bltc6f4b34d356c0754/637da13646a48b0e063e4a8d/ashe-00.jpg?format=webply&quality=90')
            event.colour.push(this.getColour(Iteam));
            event.chars.push("Bob");
            this.teams[Iteam].countAlive = this.teams[Iteam].countAlive + 1;
            this.teams[Iteam].team.push({
                name: 'Bob',
                alive: true,
                immobile: false,
                image: 'https://art.ngfiles.com/images/657000/657614_saultoons_bob-from-overwatch.png?f1541388641',
                atCombat: true,
                protected: false,
                event: {
                    type: "kill",
                    event: "$1 shot $2"
                }
            })
        }
        else if (specialevent.description.type === 'immobile') {
            event.description = specialevent.description.description.toString();
            event.img.push(specialevent.image)
            event.colour.push(this.getColour(Iteam));
            event.chars.push(specialevent.char)
            let index = event.description.indexOf('$');
            event.description = event.description.substring(0, index) + specialevent.char + event.description.substring(index + 2);
            index = event.description.indexOf('$');
            let charIndex = this.getCharacter(OTeam, '', false, false, true, false);
            if (charIndex === -1) {
                return 0;
            }
            let char = this.teams[OTeam].team[charIndex];
            if (char.atCombat === true) {
                event.chars.push(char.name)
                event.img.push(char.image)
                event.colour.push(this.getColour(OTeam));
                event.description = event.description.substring(0, index) + char.name + event.description.substring(index + 2);
            }
        }
        if (this.combat.length > 0 && event.description !== this.combat[this.combat.length - 1].description && event.description !== '' && event.description.indexOf('$') < 0) {
            this.combat.push(event);
        }
        else if (event.description !== '' && event.description.indexOf('$') < 0) {
            this.combat.push(event);
        }
    }

    /**
     * Description: gets a random character of a specific team
     * Arguments : 
     *      - Iteam : the indice of the team in this.teams
     *      - not : the name of a hero it can't be (a hero is not allowed to protect themselves, ...)
     *      - isKilled : if the chosen hero is killed
     *      - isProtected : if the chosen hero will be protected
     *      - isImmobile : if the chosen hero will be immobilized
     *      - hasFled : if the chosen hero has fled the scene
     * Returns the index of a random character of this.teams[Iteam].team
     * */
    getCharacter(team, not, isKilled, isProtected, isImmobile, hasFled) {
        let rand = 0;
        if (this.teams[team].team.length > 0) {
            rand = Math.floor(Math.random() * this.teams[team].countAlive);
            let char = this.teams[team].team[rand];
            //starting at the character with the index we found check if they are alive, at the combat and not the character we wan't to avoid
            //if he doesn't fulfill all three rules, then we choose the next character and retry
            for (let counter = 0; counter < 5; counter++) {
                if (not === char.name || char.alive !== true || char.atCombat === false) {
                    if (rand === this.teams[team].team.length - 1) {
                        rand = 0;
                    }
                    else {
                        rand = rand + 1;
                    }
                    char = this.teams[team].team[rand];
                }
            }
            //if the character found is dead then we return no characters
            //that means that there were no characters that could fill all those instructions
            if (char.alive === false || char.name === not) {
                return -1;
            }
            if (isProtected) {
                this.teams[team].team[rand].protected = true;
            }
            else {
                if (isKilled) {
                    this.teams[team].team[rand].alive = false;
                    this.teams[team].countAlive = this.teams[team].countAlive - 1;
                }
                else if (isImmobile) {
                    this.teams[team].team[rand].immobile = true;
                }
            }
            if (hasFled) {
                this.teams[team].team[rand].atCombat = false;
            }
        }
        return rand;
    }

    /**
     * Description: gets a random dead character of a specific team
     * Arguments : 
     *      - Iteam : the indice of the team in this.teams
     * Returns the index of a random dead character of this.teams[Iteam].team
     * */
    getDeadCharacter(Iteam) {
        for (let index = 0; index < (this.teams[Iteam].team).length; index++) {
            if (this.teams[Iteam].team[index].alive === false) {
                //this function is only used when the hero Mercy uses her special event res for the moment and ressurects another hero
                //so the random chosen hero will come back to life 
                this.teams[Iteam].team[index].alive = true;
                this.teams[Iteam].countAlive = this.teams[Iteam].countAlive + 1;
                return index;
            }
        }
        return -1;
    }


    /**
     * Description: gets a random number between 0 and 1
     * Returns 0 or 1
     * */
    getRandom() {
        let rand = Math.random() * 1;

        if (rand >= 0.5) {
            rand = 1;
        }
        else {
            rand = 0;
        }
        return rand
    }

}
