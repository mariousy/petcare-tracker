<template>
    <div class="space-y-10">
      <!-- 1) Global Search Bar -->
      <div>
        <input
          v-model="search"
          type="text"
          placeholder="Search pets, tasks, meds..."
          class="bg-gray-700 text-white border border-gray-600 rounded p-2 w-full focus:ring-2 focus:ring-blue-500"
        />
      </div>
  
      <!-- 2) Add Pet FIRST -->
      <PetList :filter-text="search" />
  
      <!-- 3) Tasks Calendar NEXT -->
      <TaskCalendar :filter-text="search" />
  
      <!-- 4) Medications LAST -->
      <MedicationForm :filter-text="search" />
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import PetList        from '../components/PetList.vue'
  import TaskCalendar   from '../components/TaskCalendar.vue'
  import MedicationForm from '../components/MedicationForm.vue'
  
  const search = ref('')
  </script>
  