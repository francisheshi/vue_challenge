import { createApp } from 'vue'
import App from './App.vue'
import './assets/tailwind.css'
import Overview from './components/Overview.vue'
import AddingShifts from './components/AddingShifts.vue'
import Filter from './components/Filter.vue'

const app = createApp(App)

app.component('Overview', Overview)
app.component('AddingShifts', AddingShifts)
app.component('Filter', Filter)

app.mount('#app')
