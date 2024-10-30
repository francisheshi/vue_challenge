regulate the whole component for the logic required:
<template>
  <div class="wrapper-addShifts">
    <h2>Create / Edit</h2>
    <div>
      <div>
        <label for="title">Title</label>
        <input type="text" id="title" v-model="title" />
      </div>
      <div>
        <label for="description">Description</label>
        <input type="text" id="description" v-model="description" />
      </div>
      <div>
        <label for="date-range">Date Range</label>
        <input
          type="text"
          id="date-range"
          v-model="dateRange"
          @focus="showDatePicker = true"
          readonly
        />
        <div v-if="showDatePicker" class="date-picker">
          <input type="date" v-model="startDate" @change="updateDateRange" />
          <input type="date" v-model="endDate" @change="updateDateRange" />
          <button @click="addDateRange">Done</button>
        </div>
      </div>
    </div>
    <div
      class="wrapper"
      v-for="(range, rangeIndex) in dateRanges"
      :key="rangeIndex"
    >
      <!-- <button class="btn-logic right" @click="editShift">
        {{ shift.isEditing ? 'Done Editing' : 'Edit Shift' }}
      </button> -->
      <div class="header">
        <h3 v-if="rangeIndex === 0">Start Date: {{ range.startDate }}</h3>
        <h3 v-if="rangeIndex === 1">End Date: {{ range.endDate }}</h3>
      </div>
      <div class="flex-container">
        <div class="start_time">
          <label for="start-time" class="left">Start Time</label>
          <input type="time" v-model="range.startTime" />
        </div>
        <div class="end_time">
          <label for="end-time" class="center">End Time</label>
          <input type="time" v-model="range.endTime" />
        </div>
        <div class="pricing">
          <label for="price" class="right">Price</label>
          <input type="number" v-model="range.price" />
        </div>
      </div>
      <div class="type-container">
        <label for="type" class="type-label">Type</label>
        <select v-model="range.type">
          <option value="consultation">Consultation</option>
          <option value="telephone">Telephone</option>
          <option value="ambulance">Ambulance</option>
        </select>
      </div>
    </div>

    <div class="btn-logic">
      <button class="btn-logic left" @click="clearInputs">Delete</button>
      <button class="btn-logic right" @click="saveShift">Save</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue'

// Define emits for this component
const emit = defineEmits<{
  (
    event: 'saveShift',
    shift: {
      title: string
      description: string
      dateRanges: Array<{
        startDate: string
        endDate: string
        startTime: string
        endTime: string
        price: number | null
        type: string
      }>
    },
  ): void
}>()

const shifts = ref([])
const title = ref('')
const description = ref('')
const startDate = ref('')
const startTime = ref('')
const endTime = ref('')
const endDate = ref('')
const dateRange = ref('')
const showDatePicker = ref(false)
const dateRanges = ref([])

const updateDateRange = () => {
  dateRange.value = `${startDate.value} - ${endDate.value}`
}

const saveShift = () => {
  const newShift = {
    title: title.value,
    description: description.value,
    dateRanges: [...dateRanges.value], // Save the current date ranges
  }

  shifts.value.push(newShift)
  emit('saveShift', newShift)
  clearInputs()
}

const clearInputs = () => {
  title.value = ''
  description.value = ''
  startTime.value = ''
  endTime.value = ''
  startDate.value = ''
  endDate.value = ''
  dateRange.value = ''
  dateRanges.value = [] // Clear the date ranges as well
}

const addDateRange = () => {
  if (startDate.value && endDate.value) {
    dateRanges.value.push({
      startDate: startDate.value,
      endDate: endDate.value,
      startTime: '',
      endTime: '',
      price: null,
      type: '',
    })
    ;(startDate.value = startDate.value),
      (endDate.value = endDate.value),
      (dateRange.value = '')
    showDatePicker.value = false
  }
}

const editShift = shiftIndex => {
  shifts.value[shiftIndex].isEditing = !shifts.value[shiftIndex].isEditing
}
</script>

<style scoped>
.wrapper-addShifts {
  margin: 16px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  padding: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.wrapper {
  margin: 16px;
  background-color: darkslategrey;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  padding: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.flex-container {
  display: flex;
  justify-content: space-around;
  margin-bottom: 8px;
}

.btn-logic {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.left {
  margin-right: 8px;
}

.right {
  margin-left: 8px;
}

.type-container {
  margin-top: 8px;
}

.type-label {
  margin-right: 8px;
}

.type-select {
  padding: 4px;
}

.date-picker {
  display: flex;
  gap: 16px; /* Space between the date inputs */
  margin-top: 8px; /* Add some margin above the date inputs */
}

.date-picker input[type='date'] {
  padding: 4px;
}
</style>
