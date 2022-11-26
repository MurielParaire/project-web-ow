<template>
    <img src="../assets/images/SupportLogo.png" alt="The support logo from Overwatch" />
</template>

<script>
import { Supports } from '../assets/enum/Heroes.js'




export default {
    name: 'support',
    data() {
        return {
            value: '',
            supports: Supports
        }
    }
}


</script>
<style scooped>
img {
    max-width: 5%;
    max-height: 5%;
}
</style>