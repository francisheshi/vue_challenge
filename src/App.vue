<script setup lang="ts">
import { ref } from 'vue'

const filter = ref({
  minPrice: 0,
  maxPrice: Infinity,
})

const updateFilter = (newFilter: any) => {
  filter.value = newFilter
}
</script>

<template>
  <Filter @filterPrice="updateFilter" />
  <header class="header">
    <div class="wrapper left">
      <Overview />
    </div>
  </header>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  padding: 16px;
}
.wrapper {
  flex: 1;
  background-color: #f9fafb;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.left {
  margin-right: 8px;
}
.right {
  margin-left: 8px;
}
</style>
