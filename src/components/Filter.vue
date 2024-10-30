<template>
  <div>
    <label for="price-filter">Filter by Price:</label>
    <input type="number" v-model="priceFilter" placeholder="Enter price" />
    <button @click="filterByPrice">Filter</button>
    <button @click="clearFilter">Clear Filter</button>
  </div>

  <div>
    <button @click="sortByPriceAscending">Sort by Price Ascending</button>
    <button @click="sortByPriceDescending">Sort by Price Descending</button>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue'

const dateRanges = ref([])
const priceFilter = ref(null)

const emit = defineEmits<{
  (event: 'filterPrice', filter: { minPrice: number; maxPrice: number }): void
}>()

const sortByPriceAscending = () => {
  dateRanges.value.sort((a, b) => (a.price || 0) - (b.price || 0))
}

const sortByPriceDescending = () => {
  dateRanges.value.sort((a, b) => (b.price || 0) - (a.price || 0))
}

// Filtering function
const filterByPrice = () => {
  if (priceFilter.value === null) return
}

const clearFilter = () => {
  priceFilter.value = null
}
</script>

<style scoped>
.shifts {
  display: flex;
  justify-content: space-start;
}

.wrapper {
  border-radius: 8px;
  padding: 8px;
}

.left {
  margin-right: 8px;
}

.right {
  margin-left: 8px;
}
</style>
