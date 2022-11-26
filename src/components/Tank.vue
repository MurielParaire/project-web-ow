<template>
   
    <div class="aselect" :data-value="value" :data-list="list">
        <div class="selector" @click="toggle()">
            <div class="label">
                <span><img src="../assets/images/TankLogo.png" alt="Tank logo"/> {{ value }}</span>
            </div>
            <div class="arrow" :class="{ expanded: visible }"></div>
            <div :class="{ hidden: !visible, visible }">
                <ul>
                    <li :class="{ current: item === value }" v-for="item in this.$data.tanks" :key="item"
                        @click="select(item)"> {{ item }}</li>
                </ul>
            </div>
        </div>
    </div>
</template>
  
<script>
import { Tank } from '../assets/enum/Heroes.js'


export default {
    data() {
        return {
            value: 'Select a tank',
            list: ["Orange", "Apple", "Kiwi", "Lemon", "Pineapple"],
            visible: false,
            options: ['list', 'of', 'options'],
            tanks: Tank
        }
    },
    methods: {
        toggle() {
            this.visible = !this.visible;
        },
        select(option) {
            this.value = option;
        }
    }
}
</script>
  

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Mogra|Roboto');

.aselect {
    width: 280px;
}

.aselect .selector {
    border: 1px solid gainsboro;
    background: #F8F8F8;
    position: relative;
    z-index: 1;
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

</style>