<template>
    <section class="details">
        <section id="characterDetails">
            <h1>{{ this.$data.character.name }}</h1>
            <section id="role">
                <div v-if="this.$data.character.role === 'Support'">
                    <img src="@/assets/images/SupportLogo.png"
                        :alt="'image of ' + this.$data.character.name + 's role'" />
                </div>
                <div v-else-if="this.$data.character.role === 'DPS'">
                    <img src="@/assets/images/DPSLogo.png" :alt="'image of ' + this.$data.character.name + 's role'" />
                </div>
                <div v-else>
                    <img src="@/assets/images/TankLogo.png" :alt="'image of ' + this.$data.character.name + 's role'" />
                </div>
                <span>{{ this.$data.character.role }}</span>
            </section>
            <p>{{ this.$data.character.description }}</p>
        </section>
        <img id='charImage' :src="this.$data.character.image" :alt="'image of ' + this.$data.character.name" />
    </section>
</template>

<script>
import { store } from '@/stores/store.js';
import { useRoute } from 'vue-router'

export default {
    name: 'CharacterDetail',
    data() {
        return {
            character: {},
        }
    },
    methods: {
        async setCharacter() {
            if (store.character.name === 'test') {
                const route = useRoute();
                let name = route.params.name;
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
                let url = 'http://localhost:3000/character/name/' + name;
                let data = await fetch(url).catch((err) => console.log(err));
                let char = await data.json();
                if (char.length > 0)
                    store.character = char[0];
            }
            this.$data.character = store.character
            console.log(this.$data.character)
        }
    },
    async mounted() {
        this.setCharacter()
    }
}
</script>

<style scoped>
section>div>img {
    max-width: 20px;
    max-height: 20px;
    margin-right: 10px;
}

section>div {
    width: fit-content;
    display: flex;
    justify-content: center;
}

section>span {
    display: table-cell;
    vertical-align: bottom;
    font-size: 20px;
}

section>p {
    margin-top: 10px;
    margin-left: 30px;
    margin-right: 30px;
}

.details {
    display: grid;
    width: 50%;
    margin-left: auto;
    margin-right: auto;
    grid-template-columns: 1fr 1fr;
    padding-top: 20px;
}

.characterDetails {
    grid-column: 1;
    display: inline-flex;
    justify-content: center;
}

.charImage {
    grid-column: 2;
}

#role {
    display: flex;
    flex-wrap: nowrap;
    justify-content: center;

}


h1 {
    font-weight: bold;
}
</style>