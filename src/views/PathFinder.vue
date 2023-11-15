<template>
    <GridComponent/>
</template>

<script lang="ts">

import GridComponent from '@/components/Grid.vue';
import { Options, Vue } from 'vue-class-component';

@Options({
    components: {
        GridComponent,
    }
})

export default class PathFinder extends Vue {

}

</script>