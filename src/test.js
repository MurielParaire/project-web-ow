class Test {
    constructor() {
        this.team1 = [{ 'name': 'Ana', 'alive': true }, { 'name': 'Mercy', 'alive': true }, { 'name': 'Soldier 76', 'alive': true }, { 'name': 'Tracer', 'alive': true }, { 'name': 'Reinhardt', 'alive': true }]
        this.team2 = [{ 'name': 'Kiriko', 'alive': true }, { 'name': 'Zenyatta', 'alive': true }, { 'name': 'Genji', 'alive': true }, { 'name': 'Hanzo', 'alive': true }, { 'name': 'D.Va', 'alive': true }]
        this.events = [{
            "type": "heal",
            "event": "$1 has fully healed $2"
        },
        {
            "type": "kill",
            "event": "$1 has killed $2"
        },
        {
            "type": "kill",
            "event": "$2 has annihilated $1"
        },
        {
            "type": "kill",
            "event": "$1 has snuck up and killed $2"
        },
        {
            "for": "Ana",
            "type": "kill",
            "event": "$2 put $1 to eternal sleep"
        },
        {
            "type": "protect",
            "event": "$1 has protected $2"
        },
        {
            "for": "Mercy",
            "type": "help",
            "event": "$1 has revived $1"
        },
        {
            "type": "protect",
            "for": "Genji",
            "event": "$1 has deflected any projectile flying in $1's direction"
        }
        ];
        this.countAlive = [5, 5]
        let counter = 0;
        while (this.countAlive[0] > 0 && this.countAlive[1] > 0)
        {
            if (this.events[counter].type === 'kill') {
                let event = this.events[counter].event.toString()
                let index = event.indexOf('$')
                let sub = event.substring(index, index + 2)
                let char = this.getChar(sub[1], false, '');
                
                event = event.substring(0, index) + char.name + event.substring(index + 2)
                index = event.indexOf('$')
                sub = event.substring(index, index + 2)
                char = this.getChar(sub[1], true, '')
                event = event.substring(0, index) + char.name + event.substring(index + 2)
                console.log(event)
            }
            else if (this.events[counter].type === 'protect') {
                let event = this.events[counter].event.toString()
                let index = event.indexOf('$')
                let sub = event.substring(index, index + 2)
                let charA = this.getChar(sub[1], false, '');
                
                event = event.substring(0, index) + charA.name + event.substring(index + 2)
                index = event.indexOf('$')
                sub = event.substring(index, index + 2)
                let charB = this.getChar(sub[1], false, charA.name) //CHANGE TODO
                event = event.substring(0, index) + charB.name + event.substring(index + 2)
                console.log(event)
            }
            if (counter === this.events.length - 1)
            {
                counter = -1
            }
            counter++
        }
    }


    getChar(sub, isKilled, name) {
        let char = ''
        if (sub === '1') {
            let rand = Math.floor(Math.random() * this.countAlive[0]);
            char = this.team1[rand]
            while (name === char.name)
            {
                rand = Math.floor(Math.random() * this.countAlive[0])
                char = this.team1[rand]
            }
            
            while (char.alive != true) {
                if (rand === this.team1.length - 1) {
                    rand = 0
                }
                else {
                    rand = rand + 1
                }
                char = this.team1[rand]
                if (name === char.name) {
                    rand = rand + 1;
                    if (rand > this.team1.length) {
                        rand = 0
                    }
                }
                char = this.team1[rand]
            }
            if (isKilled) {
                this.team1[rand].alive = false;
                this.countAlive[0] = this.countAlive[0] - 1
            }
        }
        else {
            let rand = Math.floor(Math.random() * this.countAlive[1])
            char = this.team2[rand]
            while (name === char.name)
            {
                rand = Math.floor(Math.random() * this.countAlive[0])
                char = this.team1[rand]
            }
            
            while (char.alive != true) {
                if (rand === this.team2.length - 1) {
                    rand = 0
                }
                else {
                    rand = rand + 1
                }
                
                char = this.team2[rand]
                if (name === char.name) {
                    rand = rand + 1;
                    if (rand > this.team1.length) {
                        rand = 0
                    }
                }
            }
            if (isKilled) {
                this.team2[rand].alive = false;
                this.countAlive[1] = this.countAlive[1] - 1
            }
        }
        return char
    }
}

let a = new Test()
console.log(a.team1)
console.log(a.team2)
console.log(a.countAlive)