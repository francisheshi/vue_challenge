<template>
  <h1>Shifts</h1>
  <div v-if="shift">
    <h3>{{ shift.title }}</h3>
    <h3>{{ shift.description }}</h3>
    <h3>Dates</h3>
    <div class="wrapper">
      <p>{{ shift.startDate }} to {{ shift.endDate }}</p>
      <p>{{ shift.startTime }}</p>
      <p>{{ shift.endTime }}</p>
      <p>{{ shift.price }}</p>
    </div>
  </div>

  <button @click="toggleAddingShifts">
    {{ isVisible ? 'Hide' : 'Add Shift' }}
  </button>

  <AddingShifts v-if="isVisible" @saveShift="updateShift" />
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps({
  filter: {
    type: Object,
    required: true,
  },
})

interface Shift {
  title: string
  description: string
  startDate: string
  endDate: string
  startTime: string
  endTime: string
  price: string
  type: string
}

const shifts = ref([])
const shift = ref<Shift | null>(null)
const isVisible = ref(false)

const filteredShifts = computed(() => {
  return shifts.value.filter(shift => {
    const price = parseFloat(shift.price)
    return (
      price >= (props.filter?.minPrice || 0) &&
      price <= (props.filter?.maxPrice || Infinity)
    )
  })
})

const toggleAddingShifts = () => {
  isVisible.value = !isVisible.value
}

const updateShift = (newShift: Shift) => {
  shift.value = newShift
  isVisible.value = false
}
</script>

<style scoped>
.wrapper {
  margin: 16px;
  background-color: lightgray;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  padding: 8px;
}
.btn-addShift {
  border: 1.2px solid black;
  border-radius: 8px;
  padding: 8px;
}
.shift-item {
  margin: 8px 0;
  padding: 8px;
  background-color: darkslategrey;
  color: white;
  border-radius: 4px;
}
</style>
