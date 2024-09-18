<template>
  <Pie
    id="pie-chart-id"
    :options="chartOptions"
    :data="chartData"
    v-if="chartData.labels && chartData.datasets"
  />
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { Ref } from "vue";

import type { GraphData } from "src/types/graph";
import { useGraphStore } from "@/stores/graph";

const graphStore = useGraphStore();

import { Pie } from "vue-chartjs";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);

const chartData: Ref<GraphData> = ref({ labels: [], datasets: [] });

const chartOptions = {
  responsive: true,
};

onMounted(async () => {
  const res = await graphStore.getGraphPie();
  if (res?.labels && res?.datasets) {
    chartData.value = {
      labels: res.labels,
      datasets: res.datasets,
    };
  }
});
</script>

<style scoped></style>
