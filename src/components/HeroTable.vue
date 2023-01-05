<template>
    <section class="around">
        <button class='close' @click="$emit('close')">Hide</button>
        <section class="table-responsive tab">
            <table id="tableHistory" class="table striped mb-0">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Role</th>
                        <th>Description</th>
                        <th>Image</th>
                        <th>modify</th>
                        <th>delete</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="hero in this.heroes" :key="hero.id_char">
                        <td>{{ hero.name }}</td>
                        <td>{{ hero.role }}</td>
                        <td>{{ hero.description }}</td>
                        <td> <img class="heroimg" :src="hero.image" :alt="'image of ' + hero.name" /></td>
                        <td class="warning" @click="openmodifyHero(hero)"><img src="../assets/images/modify.png"
                                alt="png of a pen to modify the hero" class="addX" /></td>
                        <td class="danger" @click="deleteHero(hero)"><img src="../assets/images/x.png"
                                alt="X to close the window" class="deleteX" /></td>
                    </tr>
                </tbody>
            </table>

        </section>
        <button class="previous blueoutline " @click="$emit('heroprevious')">Previous</button>
        <button class="next blueoutline" @click="$emit('heronext')">Next</button>
        <ModaVue v-if="showmodifyHero" @submit="modifyHeroJS" :information="modifyHeroInfo"
            @close="this.$data.showmodifyHero = false"></ModaVue>
    </section>
</template>

<script>
import { deleteHeroById, modifyHero } from '../database/Character';
import ModaVue from './Moda.vue';
import { roles } from '../assets/enum/info.js'

export default {
    name: "HeroTable",
    components: {
        ModaVue
    },
    data() {
        return {
            showmodifyHero: false,
            modifyHeroInfo: {},
            selectedHero: {}
        }
    },
    props: {
        heroes: {
            required: true
        }
    },
    methods: {
        async deleteHero(hero) {
            if (confirm('Are you sure you want to delete the hero : ' + hero.name)) {
                let result = await deleteHeroById(hero.id_char);
                if (result !== 0) {
                    alert(hero.name + ' was successfully deleted.');
                }
                this.$emit('load');
            }
        },
        openmodifyHero(hero) {
            this.$data.selectedHero = hero;
            this.updateHeroInfo(hero);
            this.$data.showmodifyHero = true;
        },
        async modifyHeroJS() {
            let hero = this.getHero();
            let res = await modifyHero(hero);
            if (res !== 0) {
                this.$data.showmodifyHero = false;
            }
        },
        getHero() {
            let hero = this.$data.selectedHero;
            if (hero.name !== this.$data.modifyHeroInfo.attributes[0].value && '' !== this.$data.modifyHeroInfo.attributes[0].value) {
                hero.name = this.$data.modifyHeroInfo.attributes[0].value;
            }
            if (hero.role !== this.$data.modifyHeroInfo.attributes[1].value && '' !== this.$data.modifyHeroInfo.attributes[1].value) {
                hero.role = this.$data.modifyHeroInfo.attributes[1].value;
            }
            if (hero.description !== this.$data.modifyHeroInfo.attributes[2].value && '' !== this.$data.modifyHeroInfo.attributes[2].value) {
                hero.description = this.$data.modifyHeroInfo.attributes[2].value;
            }
            if (hero.image !== this.$data.modifyHeroInfo.attributes[3].value && '' !== this.$data.modifyHeroInfo.attributes[2].value) {
                hero.image = this.$data.modifyHeroInfo.attributes[3].value;
            }
            return hero;
        },
        updateHeroInfo(hero) {
            this.$data.modifyHeroInfo.attributes[0].value = hero.name;
            this.$data.modifyHeroInfo.attributes[0].placeholder = hero.name;
            this.$data.modifyHeroInfo.attributes[1].value = hero.role;
            this.$data.modifyHeroInfo.attributes[1].placeholder = hero.role;
            this.$data.modifyHeroInfo.attributes[2].value = hero.description;
            this.$data.modifyHeroInfo.attributes[2].placeholder = hero.description;
            this.$data.modifyHeroInfo.attributes[3].value = hero.image;
            this.$data.modifyHeroInfo.attributes[3].placeholder = hero.image;
        },
        initHeroInfo() {
            this.$data.modifyHeroInfo = {
                title: 'Create a new Hero',
                attributes: [
                    {
                        name: 'name',
                        input: 'input',
                        required: true,
                        placeholder: 'Mercy',
                        value: '',
                        max: 20
                    },
                    {
                        name: 'role',
                        input: 'dropdown',
                        options: roles,
                        required: true,
                        placeholder: '',
                        value: '',
                        max: 8
                    },
                    {
                        name: 'description',
                        input: 'textarea',
                        required: false,
                        placeholder: 'Mercy is a versatile healer who ...',
                        value: '',
                        max: 350
                    },
                    {
                        name: 'image',
                        input: 'textarea',
                        required: false,
                        placeholder: 'https://...',
                        value: '',
                        max: 200
                    }
                ]
            }
        }
    },
    mounted() {
        this.initHeroInfo();
    }
}
</script>

<style scoped>
.tab {
    margin-left: auto;
    margin-right: auto;
    margin-top: 20px;
    width: 100%;
}

.tab>button {
    margin-top: 15px;
}

.heroimg {
    max-width: 50px;
    max-height: 50px;
}
</style>