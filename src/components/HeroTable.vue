<template>

    <section class="table-responsive tab">
        <table id="tableHistory" class="table striped mb-0">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Role</th>
                    <th>Description</th>
                    <th>Image</th>
                    <th>delete</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="hero in this.heroes" :key="hero.id_char">
                    <td>{{ hero.name }}</td>
                    <td>{{ hero.role }}</td>
                    <td>{{ hero.description }}</td>
                    <td> <img :src="hero.image" :alt="'image of ' + hero.name" /></td>
                    <td class="danger" @click="deleteHero(hero)">-</td>
                </tr>
            </tbody>
        </table>
        <button class="previous" @click="$emit('heroprevious')">Previous</button>
        <button class="next" @click="$emit('heronext')">Next</button>
        <button class='close' @click="$emit('close')">Hide</button>
    </section>

</template>

<script>
import { deleteHeroById } from '../database/Character';


export default {
    name: "HeroTable",
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
        }
    }
}
</script>

<style scoped>
.tab {
    margin-left: auto;
    margin-right: auto;
    margin-top: 20px;
}

.tab>button {
    margin-top: 15px;
}

img {
    max-width: 50px;
    max-height: 50px;
}
</style>