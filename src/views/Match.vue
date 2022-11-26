<template>
    <section class="container grid">
        <div class="row1">
            <h1>Match</h1>
        </div>
        

        <section class="col-left">
            <h2>Team A : </h2>
            <Team></Team>
        </section>
        <section class="col-right">
            <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam id mi at sem scelerisque elementum. Ut
                ipsum nulla, blandit id mattis id, euismod varius massa. Suspendisse auctor egestas nunc, non
                gravida ligula rhoncus et. Sed quis volutpat ex, id vehicula ipsum. Nulla facilisi. Etiam rutrum
                quis ante feugiat facilisis. Maecenas nec pharetra augue. Donec consequat enim a lorem ultricies
                rhoncus. Nullam consequat id ex lacinia placerat.

                Fusce maximus lacus viverra porta bibendum. Praesent at iaculis metus, at tempor ligula. Aenean
                cursus ante consequat malesuada facilisis. Aenean faucibus felis sit amet nisl laoreet faucibus. Sed
                ultricies ex sit amet nibh lacinia pulvinar. Mauris consequat molestie felis non maximus. Integer
                dignissim viverra sapien aliquam faucibus. Etiam ut vehicula metus. Cras faucibus urna id ultrices
                faucibus. Quisque tellus orci, pellentesque vitae elit sed, cursus fringilla orci. Interdum et
                malesuada fames ac ante ipsum primis in faucibus. Curabitur sed pulvinar dolor. Phasellus velit
                neque, vehicula quis erat vel, sagittis commodo massa. Integer libero justo, molestie eu viverra
                lacinia, volutpat eget sapien. Sed ornare pulvinar ipsum, eget semper ipsum blandit in. </p>
        </section>


    </section>
</template>

<script>
import Team from '../components/Team.vue';

export default {
    name: 'match',
    components: {
        Team
    }
}

</script>


<style scooped>
.grid {
    display: grid;
    grid-gap: 10px;
}

.row1 {
    grid-row: 1;
    grid-column:span 2;
    justify-content: center;
}


.col-left {
    grid-row: 2;
    grid-column: 1;
}

.col-right {
    grid-row: 2;
    grid-column: 2;
}
</style>