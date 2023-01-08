<template>

    <section class="event">
        <section class="imgs" v-for="(eventimg, index) in event.img" :key="index" >
            <img :src="eventimg" :alt="'image of ' + event.chars[index]" :class="event.colour[index]" />
        </section>
        <p> {{event.description}}</p>
    </section>
</template>

<script>
/**
 * description : shows one event with the images of both heroes and its description
 */


export default {
    name: 'Event',
    props: {
        event: {
            required : true
        }
    }
}
</script>

<style scoped>
.imgs {
    display: inline-block;
    
}

.imgs > img {
    max-width: 50px;
    max-height: 50px;
    margin-right: 10px;
    margin-left: 10px;
}

.red {
    background-color: rgb(255, 95, 95);
}

.blue {
    background-color: rgb(63, 141, 243);
}
</style>