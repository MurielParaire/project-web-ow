<template>

    <section class="event">
        <section class="imgs" v-for="(eventimg, index) in event.img" :key="index" >
            <img :src="eventimg" :alt="'image of ' + event.chars[index]" />
        </section>
        <p> {{event.description}}</p>
    </section>
</template>

<script>
export default {
    name: 'Event',
    props: {
        event: {
            required : true
        }
    },
    mounted() {
        console.log(this.event)
    }
}
</script>

<style scoop>
.imgs {
    display: inline-block;
    
}

.imgs > img {
    max-width: 50px;
    max-height: 50px;
}
</style>