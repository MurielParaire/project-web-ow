import Team from './TeamClass.js'


export default class Test {
    constructor(a, b, events) {
        let teamA = new Team(a);
        let teamB = new Team(b)
        this.teams = [teamA, teamB]
        this.combat = []
        this.events = events;
        console.log('events')
        console.log(events)
        while (this.teams[0].countAlive > 0 && this.teams[1].countAlive > 0) {
            this.initCharactersRound();
            this.playRound()
        }
        if (this.teams[0].countAlive === 0) {
            this.winner = 'B';
        }
        else {
            this.winner = 'A';
        }
    }

    playRound() {
        for (let counter = 0; counter < 4; counter++) {
            if (this.teams[0].countAlive > 0 && this.teams[1].countAlive > 0) {
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
            console.log(char2.name)
            console.log(char2.role)
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
        counter = Math.floor(Math.random() * this.teams[Iteam].team.length);
        let rand = counter;
        while (this.teams[Iteam].team[rand].alive !== true || this.teams[Iteam].team[rand].immobile === true) {
            if (rand === this.teams[Iteam].team.length - 1) {
                rand = 0;
            }
            else {
                rand = rand + 1;
            }
            if (rand === counter) {
                return 0;
            }
        }

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
            let charIndex = this.getCharacter(OTeam, '', true, false, false, false);
            if (charIndex === -1) {
                return 0;
            }
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
            console.log('indexchar')
            console.log(indexchar)
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
        if (this.combat.length > 0 && event.description !== this.combat[this.combat.length - 1].event && event.description !== '') {
            this.combat.push(event);
        }
        else if (event.description !== '') {
            this.combat.push(event);
        }
    }


    getCharacter(team, not, isKilled, isProtected, isImmobile, hasFled) {
        let rand = 0;
        if (this.teams[team].team.length > 0) {
            rand = Math.floor(Math.random() * this.teams[team].countAlive);
            let char = this.teams[team].team[rand];
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
            if (char.alive === false) {
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
                if (isImmobile) {
                    this.teams[team].team[rand].immobile = true;
                }
            }
            if (hasFled) {
                this.teams[team].team[rand].atCombat = false;
            }
        }
        return rand;
    }

    getDeadCharacter(Iteam) {
        for (let index = 0; index < (this.teams[Iteam].team).length; index++) {
            console.log('this.teams[Iteam].team[index]')
            console.log(this.teams[Iteam].team[index])
            if (this.teams[Iteam].team[index].alive === false) {
                this.teams[Iteam].team[index].alive = true;
                this.teams[Iteam].countAlive = this.teams[Iteam].countAlive + 1;
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