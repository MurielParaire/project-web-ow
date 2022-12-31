<template>

<img :src="this.$props.character.image" :alt="'image of ' + this.$props.character.name"/>
<h2>{{this.$props.character.name}}</h2>

</template>

<script>

export default {
    name: 'Characters',
    props: {
        character: {
            required: true
        }
    }
}
</script>

<style scoped>
h2 {
  font-size: medium;
}
</style>