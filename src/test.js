
export default class Test {
    constructor(a, b) {
        this.teams = [a, b]
        this.combat = []
        this.events = [{
            "type": "kill",
            "description": "$1 has executed $2"
        },
        {
            "type": "kill",
            "description": "$1 has killed $2"
        },
        {
            "type": "kill",
            "description": "$2 has annihilated $1"
        },
        {
            "type": "kill",
            "description": "$1 has snuck up and killed $2"
        },
        {
            "type": "kill",
            "description": "$1 has executed $2"
        },
        {
            "type": "kill",
            "description": "$1 has killed $2"
        },
        {
            "type": "kill",
            "description": "$2 has annihilated $1"
        },
        {
            "type": "kill",
            "description": "$1 has snuck up and killed $2"
        },
        {
            "type": "kill",
            "description": "$1 has killed $2"
        },
        {
            "type": "kill",
            "description": "$2 has annihilated $1"
        },
        ];
        this.countAlive = [5, 5];
        this.initCharacters();
        while (this.countAlive[0] > 0 && this.countAlive[1] > 0) {
            this.initCharactersRound();
            this.playRound()
        }
        if (this.countAlive[0] === 0) {
            this.winner = 'A';
        }
        else {
            this.winner = 'B';
        }
    }

    playRound() {
        for (let counter = 0; counter < 4; counter++) {
            if (this.countAlive[0] > 0 && this.countAlive[1] > 0) {
                let rand = this.getRandom();
                if (rand === 0) {
                    this.playNormalEvent();
                }
                else {
                    this.playSpecialEvent();
                }
                if (counter === this.events.length - 1) {
                    counter = -1;
                }
                counter++
            }
        }
    }

    initCharacters() {
        (this.teams[0]).forEach(hero => {
            hero.immobile = false;
            hero.protected = false;
            hero.atCombat = true;
            hero.alive = true;
        });
        (this.teams[1]).forEach(hero => {
            hero.immobile = false;
            hero.protected = false;
            hero.atCombat = true;
            hero.alive = true;
        });
    }

    initCharactersRound() {
        (this.teams[0]).forEach(hero => {
            hero.immobile = false;
            hero.protected = false;
            hero.atCombat = true;
        });
        (this.teams[1]).forEach(hero => {
            hero.immobile = false;
            hero.protected = false;
            hero.atCombat = true;
        });
    }

    getColour(Team) {
        if (Team === 1) {
            return 'red';
        }
        return 'blue'
    }

    playNormalEvent() {
        let counter = Math.floor(Math.random() * this.events.length);
        let normalevent = this.events[counter];
        let event = {};
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
        let char = this.teams[Iteam][this.getCharacter(Iteam, '', false, false, false, false)];
        event.img.push(char.image);
        event.colour.push(this.getColour(Iteam));
        let index = event.description.indexOf('$');
        event.description = event.description.substring(0, index) + char.name + event.description.substring(index + 2);
        if (normalevent.type === 'kill') {
            index = event.description.indexOf('$');
            char = this.teams[OTeam][this.getCharacter(OTeam, '', true, false, false, false)];
            if (char.protected === false && char.atCombat === true) {
                event.img.push(char.image)
                event.colour.push(this.getColour(OTeam));
                event.description = event.description.substring(0, index) + char.name + event.description.substring(index + 2);
            }
        }
        else if (normalevent.type === 'protect' || normalevent.type === 'help') {
            index = event.description.indexOf('$');
            char = this.teams[Iteam][this.getCharacter(Iteam, normalevent.char, false, true, false, false)];
            if (char.protected === false && char.atCombat === true) {
                event.img.push(char.image)
                event.colour.push(this.getColour(Iteam));
                event.description = event.description.substring(0, index) + char.name + event.description.substring(index + 2);
            }
        }
        else if (normalevent.type === 'flee') {
            this.teams[Iteam][normalevent.counter].atCombat = false;
        }
        if (this.combat.length > 0 && event.description !== this.combat[this.combat.length - 1].event && event.description !== '') {
            this.combat.push(event);
        }
        else if (event.description !== '') {
            this.combat.push(event);
        }
    }

    namesToString(team) {
        let names = '';
        for (let counter = 0; counter < team.length; counter++) {
            names = names + ' ' + team[counter].name;
        }
        return names;
    }

    getSpecialEvent(Iteam) {
        let counter = 0;
        let event = {};
        counter = Math.floor(Math.random() * this.teams[Iteam].length);
        let rand = counter;
        while (this.teams[Iteam][rand].alive !== true || this.teams[Iteam][rand].immobile === true) {
            if (rand === this.teams[Iteam].length - 1) {
                rand = 0;
            }
            else {
                rand = rand + 1;
            }
            if (rand === counter) {
                return 0;
            }
        }
        if (this.teams[Iteam][rand].event.length > 0) {
            if (this.teams[Iteam][rand].event.length > 1) {
                let random = this.getRandom();
                event.description = this.teams[Iteam][rand].event[random];
            }
            event.description = this.teams[Iteam][rand].event[0];
        }
        else {
            return 0;
        }
        event.char = this.teams[Iteam][rand].name;
        event.image = this.teams[Iteam][rand].image;
        if (event.description.type === 'flee') {
            this.teams[Iteam][rand].atCombat = false;
        }
        event.counter = rand;
        return event;
    }

    playSpecialEvent() {
        let Iteam = this.getRandom()
        let OTeam = 0;
        if (Iteam === 0) {
            OTeam = 1;
        }
        let specialevent = this.getSpecialEvent(Iteam)
        let event = {};
        event.description = '';
        event.img = [];
        event.colour = [];
        event.chars = [];
        event.type = specialevent.type;
        if (specialevent.description.type === 'kill') {
            event.description = specialevent.description.description.toString();
            event.img.push(specialevent.image);
            event.colour.push(this.getColour(Iteam));
            event.chars.push(specialevent.char);
            let index = event.description.indexOf('$');
            event.description = event.description.substring(0, index) + specialevent.char + event.description.substring(index + 2);
            index = event.description.indexOf('$');
            let char = this.teams[OTeam][this.getCharacter(OTeam, '', true, false, false, false)];
            if (char.protected === false && char.atCombat === true) {
                event.chars.push(char.name)
                event.img.push(char.image)
                event.colour.push(this.getColour(OTeam));
                event.description = event.description.substring(0, index) + char.name + event.description.substring(index + 2);
            }
        }
        else if (specialevent.description.type === 'protect' || specialevent.type === 'help') {
            event.description = specialevent.description.description.toString();
            event.img.push(specialevent.image)
            event.colour.push(this.getColour(Iteam));
            event.chars.push(specialevent.char)
            let index = event.description.indexOf('$');
            event.description = event.description.substring(0, index) + specialevent.char + event.description.substring(index + 2);
            index = event.description.indexOf('$');
            let char = this.teams[Iteam][this.getCharacter(Iteam, specialevent.char, false, true, false, false)];
            if (char.atCombat === true) {
                event.chars.push(char.name)
                event.img.push(char.image)
                event.colour.push(this.getColour(Iteam));
                event.description = event.description.substring(0, index) + char.name + event.description.substring(index + 2);
            }
        }
        else if (specialevent.description.type === 'flee') {
            if (this.countAlive[Iteam] === 5) {
                return 0;
            }
            event.description = specialevent.description.description.toString();
            event.img.push(specialevent.image)
            event.colour.push(this.getColour(Iteam));
            event.chars.push(specialevent.char)
            let index = event.description.indexOf('$');
            event.description = event.description.substring(0, index) + specialevent.char + event.description.substring(index + 2);
        }
        else if (specialevent.description.type === 'res' && this.countAlive[Iteam] < 5) {
            event.description = specialevent.description.description.toString();
            event.img.push(specialevent.image)
            event.colour.push(this.getColour(Iteam));
            event.chars.push(specialevent.char)
            let index = event.description.indexOf('$');
            event.description = event.description.substring(0, index) + specialevent.char + event.description.substring(index + 2);
            index = event.description.indexOf('$');
            let indexchar = this.getDeadCharacter(Iteam);
            if (indexchar !== -1) {
                let char = this.teams[Iteam][indexchar]
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
            this.countAlive[Iteam] = this.countAlive[Iteam] + 1;
            this.teams[Iteam].push({
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
            let char = this.teams[Iteam][this.getCharacter(Iteam, specialevent.char, false, false, true, false)];
            if (char.atCombat === true) {
                event.chars.push(char.name)
                event.img.push(char.image)
                event.colour.push(this.getColour(Iteam));
                event.description = event.description.substring(0, index) + char.name + event.description.substring(index + 2);
            }
        }
        if (this.combat.length > 0 && event.description !== this.combat[this.combat.length - 1].event && event.description !== '') {
            this.combat.push(event);
        }
        else if (event.description !== '') {
            this.combat.push(event);
        }
    }


    getCharacter(team, not, isKilled, isProtected, isImmobile, hasFled) {
        let rand = 0;
        if (this.teams[team].length > 0) {
            rand = Math.floor(Math.random() * this.countAlive[team]);
            let char = this.teams[team][rand];
            for (let counter = 0; counter < 5; counter++) {
                if (not === char.name || char.alive !== true || char.atCombat === false) {
                    if (rand === this.teams[team].length - 1) {
                        rand = 0;
                    }
                    else {
                        rand = rand + 1;
                    }
                    char = this.teams[team][rand];
                }
            }
            if (char.alive === false) {
                return 0;
            }
            if (isProtected) {
                this.teams[team][rand].protected = true;
            }
            else {
                if (isKilled) {
                    this.teams[team][rand].alive = false;
                    this.countAlive[team] = this.countAlive[team] - 1;
                }
                if (isImmobile) {
                    this.teams[team][rand].immobile = true;
                }
            }
            if (hasFled) {
                this.teams[team][rand].atCombat = false;
            }
        }
        return rand;
    }

    getDeadCharacter(Iteam) {
        for (let index = 0; index < (this.teams[Iteam]).length; index++) {
            if (this.teams[Iteam][index].alive === false) {
                this.teams[Iteam][index].alive = true;
                this.countAlive[Iteam] = this.countAlive[Iteam] + 1;
                return index;
            }
        }
        return -1;
    }


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