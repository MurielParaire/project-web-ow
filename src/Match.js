const fs = require('fs').promises

class Match {

    async pickHeroes() {

        for (let counter = 0; counter < 5; counter++) {
            let hero = content[Math.floor(Math.random() * content.length)]
            hero.alive = true
            this.heroes1.push(hero)
        }
        for (let counter = 0; counter < 5; counter++) {
            let hero = content[Math.floor(Math.random() * content.length)]
            hero.alive = true
            this.heroes2.push(hero)
        }
        this.pickEvents()
    }

    async pickEvents() {
        let content = ''
        let promise = fs.readFile('./events.json')
        content = (await promise).toString()
        content = JSON.parse(content)
        for (let counter = 0; counter < 3; counter++) {
            this.events.push(content[Math.floor(Math.random() * content.length)])
        }
        this.playMatch()
    }

    notFinished() {
        for (let counter = 0; counter < this.heroes1.length; counter++) {
            if (this.heroes1[Math.floor(Math.random() * this.heroes1.length)].alive === true) {
                for (let counter = 0; counter < this.heroes2.length; counter++) {
                    if (this.heroes2[Math.floor(Math.random() * this.heroes2.length)].alive === true) {
                        return true;
                    }
                }
            }
        }
        return false
    }

    playEvent(counter) {
        if (counter > this.events.length - 1) {
            this.pickEvents()
        }
        if (this.events[counter] === 'kill') {
            let event = this.events[counter]
            let index = event.indexOf('$')
            let sub = event.substring(index, index + 2)
            let char = ''
            if (sub[1] === '1') {
                char = this.heroes1[Math.floor(Math.random() * this.countAlive[0])].name
            }
            else {
                char = this.heroes2[Math.floor(Math.random() * this.countAlive[1])].name
            }
            event = event.substring(0, index) + char + event.substring(index + 2)
            index = event.indexOf('$')
            sub = event.substring(index, index + 2)
            char = ''
            if (sub[1] === '1') {
                char = this.heroes1[Math.floor(Math.random() * this.countAlive[0])].name
            }
            else {
                char = this.heroes2[Math.floor(Math.random() * this.countAlive[1])].name
            }
            event = event.substring(0, index) + char + event.substring(index + 2)
            console.log(event)
        }

    }

    playMatch() {
        let counter = 0
        while (this.notFinished()) {
            this.playEvent(counter)
            counter++
        }
    }


    constructor() {
        this.events = []
        this.heroes1 = []
        this.heroes2 = []
        this.countAlive = [5, 5]
        this.pickHeroes()
    }
}


let a  = new Match()