<template>
   
    <div class="aselect" :data-value="value" :data-list="list">
        <div class="selector" @click="toggle()">
            <div class="label">
                <span><img src="../assets/images/SupportLogo.png" alt="Tank logo"/> {{ value }}</span>
            </div>
            <div class="arrow" :class="{ expanded: visible }"></div>
            <div :class="{ hidden: !visible, visible }">
                <ul>
                    <li :class="{ current: support === value }" v-for="support in this.$props.AllSupports" :key="support"
                        @click="select(support)"> {{ support }}</li>
                </ul>
            </div>
        </div>
    </div>
</template>
  
<script>
/**
 * description : select one Support
 */


export default {
    emits: ['setSupport'],
    data() {
        return {
            value: 'Select a Support',
            visible: false,
        }
    },
    props: {
        //use support given from parent so no duplicates in the same team
        AllSupports: {
            required: true
        }
    },
    methods: {
        /**
         * Description: toggles the visibility of the droddown bar which lets the user choose a hero
         * */
        toggle() {
            this.visible = !this.visible;
        },

        /**
         * Description: updates the selected value
         * */
        select(option) {
            this.value = option;
            this.$emit('setSupport', this.$data.value);
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