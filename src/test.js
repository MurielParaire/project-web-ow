/*
How to make the match : 
5v5
1. set both teams : alive=true, immobile=false, photo=?, atCombat = true (keeps track if characters fled the combat) TOK
2. get 10 random events with kill => if only 10 events with kill in db, then get all and rand in code TOK
3. get 1 special event per character TOK
4. FIGHTPHASE : 
    IN ROUNDS (5 TURNS)
    - get random between special / kill => number between 0 and 1
    - execute that special (attention for rez Mercy since one person needs to be dead, so reroll if on this special for her)
5. Winner
*/

/* FIGHTPHASE
need every character to do something
after 15 rounds look at all those that haven't done anything and make them do something



*/

export default class Test {
    constructor(a, b) {
        console.log('here')
        console.log(a)
        console.log(b)
        /*
        let team1 = [
            {
                name: 'Ana',
                alive: true,
                immobile: false,
                image: 'https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?cs=srgb&dl=pexels-pixabay-45201.jpg&fm=jpg',
                atCombat: true,
                protected: false,
                event: [
                    {
                        type: "immobile",
                        event: "$1 put $2 to eternal sleep"
                    },
                    {
                        type: "immobile",
                        event: "$1 put $2 to eternal sleep"
                    }
                ]
            },
            {
                name: 'Mercy',
                alive: true,
                immobile: false,
                image: 'https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?cs=srgb&dl=pexels-pixabay-45201.jpg&fm=jpg',
                atCombat: true,
                protected: false,
                event: [{
                    type: "res",
                    event: "$1 revived $2"
                }]
            },
            {
                name: 'Tracer',
                alive: true,
                immobile: false,
                image: 'https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?cs=srgb&dl=pexels-pixabay-45201.jpg&fm=jpg',
                atCombat: true,
                protected: false,
                event: [{
                    type: "flee",
                    event: "$1 ended up at spawn after using her recall"
                }]
            },
            {
                name: 'Ashe',
                alive: true,
                immobile: false,
                image: 'https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?cs=srgb&dl=pexels-pixabay-45201.jpg&fm=jpg',
                atCombat: true,
                protected: false,
                event: [{
                    type: "Bob",
                    event: "$1 called Bob for reinforcements."
                },
                {
                    type: "Bob",
                    event: "$1 asks Bob to help her."
                }]
            },
            {
                name: 'Reinhardt',
                alive: true,
                immobile: false,
                image: 'https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?cs=srgb&dl=pexels-pixabay-45201.jpg&fm=jpg',
                atCombat: true,
                protected: false,
                event: []
            }
        ];
        let team2 = [
            {
                name: 'Kiriko',
                alive: true,
                immobile: false,
                image: 'https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?cs=srgb&dl=pexels-pixabay-45201.jpg&fm=jpg',
                atCombat: true,
                protected: false,
                event: [{
                    type: "help",
                    event: "$1 cleared $2 of all negative effects"
                }]
            },
            {
                name: 'Zenyatta',
                alive: true,
                immobile: false,
                image: 'https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?cs=srgb&dl=pexels-pixabay-45201.jpg&fm=jpg',
                atCombat: true,
                protected: false,
                event: [{
                    type: "kill",
                    event: "$1 kicked $2 off a cliff"
                }]
            },
            {
                name: 'Genji',
                alive: true,
                immobile: false,
                image: 'https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?cs=srgb&dl=pexels-pixabay-45201.jpg&fm=jpg',
                atCombat: true,
                protected: false,
                event: [{
                    type: "protect",
                    event: "$1 deflected $2's projectiles."
                }]
            },
            {
                name: 'Hanzo',
                alive: true,
                immobile: false,
                image: 'https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?cs=srgb&dl=pexels-pixabay-45201.jpg&fm=jpg',
                atCombat: true,
                protected: false,
                event: [{
                    type: "kill",
                    event: "$1 put an arrow through $2's heart"
                }]
            },
            {
                name: 'Ramattra',
                alive: true,
                immobile: false,
                image: 'https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?cs=srgb&dl=pexels-pixabay-45201.jpg&fm=jpg',
                atCombat: true,
                protected: false,
                event: [{
                    type: "protect",
                    event: "$1 put his barrier in front of $2"
                }]
            }
        ];
        console.log(team1)
        console.log(team2)
        */
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
        while (this.countAlive[0] > 0 && this.countAlive[1] > 0) {
            this.playRound()
        }
        if (this.countAlive[0] === 0) {
            this.winner = 'Team A ' + this.namesToString(this.teams[0]);
        }
        else {
            this.winner = 'Team B ' + this.namesToString(this.teams[1]);
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
        this.initCharacters();
    }

    initCharacters() {
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
        event.description = normalevent.description.toString();
        let char = this.teams[Iteam][this.getCharacter(Iteam, '', false, false, false, false)];
        event.img.push(char.image)
        let index = event.description.indexOf('$');
        event.description = event.description.substring(0, index) + char.name + event.description.substring(index + 2);
        if (normalevent.type === 'kill') {
            index = event.description.indexOf('$');
            char = this.teams[OTeam][this.getCharacter(OTeam, '', true, false, false, false)];
            if (char.protected === false && char.atCombat === true) {
                event.img.push(char.image)
                event.description = event.description.substring(0, index) + char.name + event.description.substring(index + 2);
            }
        }
        else if (normalevent.type === 'protect' || normalevent.type === 'help') {
            index = event.description.indexOf('$');
            char = this.teams[Iteam][this.getCharacter(Iteam, normalevent.char, false, true, false, false)];
            if (char.protected === false && char.atCombat === true) {
                event.img.push(char.image)
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
        console.log(event)
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
        event.chars = [];
        if (specialevent.description.type === 'kill') {
            event.description = specialevent.description.description.toString();
            event.img.push(specialevent.image)
            event.chars.push(specialevent.char)
            let index = event.description.indexOf('$');
            event.description = event.description.substring(0, index) + specialevent.char + event.description.substring(index + 2);
            index = event.description.indexOf('$');
            let char = this.teams[OTeam][this.getCharacter(OTeam, '', true, false, false, false)];
            if (char.protected === false && char.atCombat === true) {
                event.chars.push(char.name)
                event.img.push(char.image)
                event.description = event.description.substring(0, index) + char.name + event.description.substring(index + 2);
            }
        }
        else if (specialevent.description.type === 'protect' || specialevent.type === 'help') {
            event.description = specialevent.description.description.toString();
            event.img.push(specialevent.image)
            event.chars.push(specialevent.char)
            let index = event.description.indexOf('$');
            event.description = event.description.substring(0, index) + specialevent.char + event.description.substring(index + 2);
            index = event.description.indexOf('$');
            let char = this.teams[Iteam][this.getCharacter(Iteam, specialevent.char, false, true, false, false)];
            if (char.atCombat === true) {
                event.chars.push(char.name)
                event.img.push(char.image)
                event.description = event.description.substring(0, index) + char.name + event.description.substring(index + 2);
            }
        }
        else if (specialevent.description.type === 'flee') {
            event.description = specialevent.description.description.toString();
            event.img.push(specialevent.image)
            event.chars.push(specialevent.char)
            let index = event.description.indexOf('$');
            event.description = event.description.substring(0, index) + specialevent.char + event.description.substring(index + 2);
        }
        else if (specialevent.description.type === 'res' && this.countAlive[Iteam] < 5) {
            event.description = specialevent.description.description.toString();
            event.img.push(specialevent.image)
            event.chars.push(specialevent.char)
            let index = event.description.indexOf('$');
            event.description = event.description.substring(0, index) + specialevent.char + event.description.substring(index + 2);
            index = event.description.indexOf('$');
            let indexchar = this.getDeadCharacter(Iteam);
            if (indexchar !== -1) {
                let char = this.teams[Iteam][indexchar]
                event.img.push(char.image)
                event.chars.push(char.name)
                event.description = event.description.substring(0, index) + char.name + event.description.substring(index + 2);
            }
        }
        else if (specialevent.description.type === 'Bob') {
            event.description = specialevent.description.description.toString();
            let index = event.description.indexOf('$');
            event.description = event.description.substring(0, index) + specialevent.char + event.description.substring(index + 2);
            event.img.push('https://images.blz-contentstack.com/v3/assets/blt2477dcaf4ebd440c/bltc6f4b34d356c0754/637da13646a48b0e063e4a8d/ashe-00.jpg?format=webply&quality=90')
            event.chars.push("Bob")
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
            event.chars.push(specialevent.char)
            let index = event.description.indexOf('$');
            event.description = event.description.substring(0, index) + specialevent.char + event.description.substring(index + 2);
            index = event.description.indexOf('$');
            let char = this.teams[Iteam][this.getCharacter(Iteam, specialevent.char, false, false, true, false)];
            if (char.atCombat === true) {
                event.chars.push(char.name)
                event.img.push(char.image)
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


//let test = new Test(team1, team2)
//console.log(test.combat)