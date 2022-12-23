
export default class Test {
    constructor(a, b) {
        console.log('here')
        console.log(a)
        console.log(b)

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
        event.type = normalevent.type
        event.description = normalevent.description;
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
        event.type = specialevent.type
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
/*
let team1 = [
    {
        "name": "Baptiste",
        "alive": false,
        "event": [
            {
                "image": "https://d15f34w2p8l1cc.cloudfront.net/overwatch/f979896f74ba22db2a92a85ae1260124ab0a26665957a624365e0f96e5ac5b5c.png",
                "name": "Baptiste",
                "type": "protect",
                "description": "$1 has protected $2 from certain death with his immobility field"
            }
        ],
        "image": "https://d15f34w2p8l1cc.cloudfront.net/overwatch/f979896f74ba22db2a92a85ae1260124ab0a26665957a624365e0f96e5ac5b5c.png",
        "immobile": false,
        "protected": false,
        "atCombat": true
    },
    {
        "name": "Kiriko",
        "alive": false,
        "event": [
            {
                "image": "https://d15f34w2p8l1cc.cloudfront.net/overwatch/088aff2153bdfa426984b1d5c912f6af0ab313f0865a81be0edd114e9a2f79f9.png",
                "name": "Kiriko",
                "type": "help",
                "description": "$1 cleansed $2 of all negative effects"
            }
        ],
        "image": "https://d15f34w2p8l1cc.cloudfront.net/overwatch/088aff2153bdfa426984b1d5c912f6af0ab313f0865a81be0edd114e9a2f79f9.png",
        "immobile": false,
        "protected": false,
        "atCombat": true
    },
    {
        "name": "Cassidy",
        "alive": false,
        "event": [
            {
                "image": "https://d15f34w2p8l1cc.cloudfront.net/overwatch/6cfb48b5597b657c2eafb1277dc5eef4a07eae90c265fcd37ed798189619f0a5.png"
            }
        ],
        "image": "https://d15f34w2p8l1cc.cloudfront.net/overwatch/6cfb48b5597b657c2eafb1277dc5eef4a07eae90c265fcd37ed798189619f0a5.png",
        "immobile": false,
        "protected": false,
        "atCombat": true
    },
    {
        "name": "Bastion",
        "alive": false,
        "event": [
            {
                "image": "https://d15f34w2p8l1cc.cloudfront.net/overwatch/4d715f722c42215072b5dd0240904aaed7b5285df0b2b082d0a7f1865b5ea992.png"
            }
        ],
        "image": "https://d15f34w2p8l1cc.cloudfront.net/overwatch/4d715f722c42215072b5dd0240904aaed7b5285df0b2b082d0a7f1865b5ea992.png",
        "immobile": false,
        "protected": false,
        "atCombat": true
    },
    {
        "name": "D.Va",
        "alive": false,
        "event": [
            {
                "image": "https://d15f34w2p8l1cc.cloudfront.net/overwatch/ca114f72193e4d58a85c087e9409242f1a31e808cf4058678b8cbf767c2a9a0a.png",
                "name": "D.Va",
                "type": "special",
                "description": "$1 was forced to eject from her Mech"
            },
            {
                "image": "https://d15f34w2p8l1cc.cloudfront.net/overwatch/ca114f72193e4d58a85c087e9409242f1a31e808cf4058678b8cbf767c2a9a0a.png",
                "name": "D.Va",
                "type": "kill",
                "description": "$1 has bombed $2"
            }
        ],
        "image": "https://d15f34w2p8l1cc.cloudfront.net/overwatch/ca114f72193e4d58a85c087e9409242f1a31e808cf4058678b8cbf767c2a9a0a.png",
        "immobile": false,
        "protected": false,
        "atCombat": true
    }
]
let team2 = [
    {
        "name": "Zenyatta",
        "alive": false,
        "event": [
            {
                "image": "https://d15f34w2p8l1cc.cloudfront.net/overwatch/71cabc939c577581f66b952f9c70891db779251e8e70f29de3c7bf494edacfe4.png"
            }
        ],
        "image": "https://d15f34w2p8l1cc.cloudfront.net/overwatch/71cabc939c577581f66b952f9c70891db779251e8e70f29de3c7bf494edacfe4.png",
        "immobile": false,
        "protected": false,
        "atCombat": true
    },
    {
        "name": "Moira",
        "alive": false,
        "event": [
            {
                "image": "https://d15f34w2p8l1cc.cloudfront.net/overwatch/000beeb5606e01497897fa9210dd3b1e78e1159ebfd8afdc9e989047d7d3d08f.png"
            }
        ],
        "image": "https://d15f34w2p8l1cc.cloudfront.net/overwatch/000beeb5606e01497897fa9210dd3b1e78e1159ebfd8afdc9e989047d7d3d08f.png",
        "immobile": false,
        "protected": false,
        "atCombat": true
    },
    {
        "name": "Hanzo",
        "alive": false,
        "event": [
            {
                "image": "https://d15f34w2p8l1cc.cloudfront.net/overwatch/aecd8fa677f0093344fab7ccb7c37516c764df3f5ff339a5a845a030a27ba7e0.png"
            }
        ],
        "image": "https://d15f34w2p8l1cc.cloudfront.net/overwatch/aecd8fa677f0093344fab7ccb7c37516c764df3f5ff339a5a845a030a27ba7e0.png",
        "immobile": false,
        "protected": false,
        "atCombat": true
    },
    {
        "name": "Echo",
        "alive": false,
        "event": [
            {
                "image": "https://d15f34w2p8l1cc.cloudfront.net/overwatch/f086bf235cc6b7f138609594218a8385c8e5f6405a39eceb0deb9afb429619fe.png"
            }
        ],
        "image": "https://d15f34w2p8l1cc.cloudfront.net/overwatch/f086bf235cc6b7f138609594218a8385c8e5f6405a39eceb0deb9afb429619fe.png",
        "immobile": false,
        "protected": false,
        "atCombat": true
    },
    {
        "name": "Doomfist",
        "alive": true,
        "event": [
            {
                "image": "https://d15f34w2p8l1cc.cloudfront.net/overwatch/13750471c693c1a360eb19d5ace229c8599a729cd961d72ebee0e157657b7d18.png"
            }
        ],
        "image": "https://d15f34w2p8l1cc.cloudfront.net/overwatch/13750471c693c1a360eb19d5ace229c8599a729cd961d72ebee0e157657b7d18.png",
        "immobile": false,
        "protected": false,
        "atCombat": true
    }
]
*/
//let test = new Test(team1, team2)
//console.log(test.combat)