<template>
    <div class="space-y-6">
      <!-- Filtering & Sorting panel -->
      <div class="bg-white shadow rounded-lg p-4 flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
        <div>
          <label class="block text-gray-600">Filter by Pet:</label>
          <select v-model="filterPet" class="border-gray-300 rounded p-2 w-full">
            <option value="">All</option>
            <option v-for="p in pets" :key="p.id" :value="p.id">{{ p.name }}</option>
          </select>
        </div>
        <div>
          <label class="block text-gray-600">Filter by Date:</label>
          <input type="date" v-model="filterDate" class="border-gray-300 rounded p-2 w-full"/>
        </div>
        <div>
          <label class="block text-gray-600">Sort Pets:</label>
          <select v-model="sortPetsBy" class="border-gray-300 rounded p-2 w-full">
            <option value="name">Name</option>
            <option value="type">Type</option>
          </select>
        </div>
      </div>
  
      <!-- Tasks Calendar w/ Recurrence & Calendar View -->
      <TaskCalendar :filter-pet="filterPet" :filter-date="filterDate" />
  
      <!-- PetList w/ Inline Edit & Sort -->
      <PetList :sort-by="sortPetsBy" />
  
      <!-- Medications w/ Inline Edit & Validation -->
      <MedicationForm />
    </div>
  </template>
  
  <script>
  import { ref, onMounted, computed } from 'vue'
  import { usePetsStore }             from '../store/pets'
  import TaskCalendar                  from '../components/TaskCalendar.vue'
  import PetList                       from '../components/PetList.vue'
  import MedicationForm                from '../components/MedicationForm.vue'
  
  export default {
    name: 'DashboardOptions',
    components: { TaskCalendar, PetList, MedicationForm },
    setup() {
      const petsStore  = usePetsStore()
      const filterPet  = ref('')
      const filterDate = ref('')
      const sortPetsBy = ref('name')
  
      onMounted(() => petsStore.fetchPets())
  
      // sort in PetList by prop
      const pets = computed(() => {
        return [...petsStore.list].sort((a,b) => {
          const key = sortPetsBy.value
          return a[key].localeCompare(b[key])
        })
      })
  
      return { filterPet, filterDate, sortPetsBy, pets }
    }
  }
  </script>
  