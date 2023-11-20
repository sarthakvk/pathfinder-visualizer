<template>
    <select v-model="algo" required name="algorithm">
        <option selected value="bfs">BFS</option>
        <option value="dijkstra">Dijkstra</option>
    </select>
    <GridComponent :algorithm="algo" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import GridComponent from '@/components/Grid.vue';

export default defineComponent({
    components: {
        GridComponent,
    },
    setup() {
        const algo = ref<string>('bfs');

        return {
            algo,
        };
    },
});
</script>
