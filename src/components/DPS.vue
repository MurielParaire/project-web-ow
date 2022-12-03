<template>
   
    <div class="aselect" :data-value="value" :data-list="list">
        <div class="selector" @click="toggle()">
            <div class="label">
                <span><img src="../assets/images/TankLogo.png" alt="Tank logo"/> {{ value }}</span>
            </div>
            <div class="arrow" :class="{ expanded: visible }"></div>
            <div :class="{ hidden: !visible, visible }">
                <ul>
                    <li :class="{ current: dps === value }" v-for="dps in this.$props.AllDPS" :key="dps"
                        @click="select(dps)"> {{ dps }}</li>
                </ul>
            </div>
        </div>
    </div>
</template>
  
<script>


//use support given from parent so no duplicates
export default {
    emits: ['setDPS'],
    data() {
        return {
            value: 'Select a DPS',
            visible: false,
        }
    },
    props: {
        AllDPS: {
            required: true
        }
    },
    methods: {
        toggle() {
            this.visible = !this.visible;
        },
        select(option) {
            this.value = option;
            this.$emit('setDPS', this.$data.value);
        }
    }
}
</script>
  

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Mogra|Roboto');

.aselect {
    width: 280px;
    margin-top: 5%;
    margin-bottom : 5%;
}

.aselect .selector {
    border: 1px solid gainsboro;
    background: #F8F8F8;
    position: relative;
}

.aselect .selector .arrow {
    position: absolute;
    right: 10px;
    top: 40%;
    width: 0;
    height: 0;
    border-left: 7px solid transparent;
    border-right: 7px solid transparent;
    border-top: 10px solid #888;
    transform: rotateZ(0deg) translateY(0px);
    transition-duration: 0.3s;
    transition-timing-function: cubic-bezier(.59, 1.39, .37, 1.01);
}

.aselect .selector .expanded {
    transform: rotateZ(180deg) translateY(2px);
}

.aselect .selector .label {
    display: block;
    padding: 12px;
    font-size: 16px;
    color: #888;
}

ul {
    width: 100%;
    list-style-type: none;
    padding: 0;
    margin: 0;
    font-size: 16px;
    border: 1px solid gainsboro;
    position: absolute;
    z-index: 1;
    background: #fff;
}

li {
    padding: 12px;
    color: #666;


}

li:hover {
        color: white;
        background: seagreen;
    }

.current {
    background: #eaeaea;
}

.hidden {
    visibility: hidden;
}

.visible {
    visibility: visible;
}

img {
    max-width: 20px;
    max-height: 20px;
}

</style>