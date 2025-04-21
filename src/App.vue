<template>
  <div class="min-h-screen bg-gray-900 text-gray-100">
    <header class="bg-gray-800 border-b border-gray-700">
      <div class="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-16">
        <router-link to="/" class="text-2xl font-bold text-white">
          PetCare Tracker
        </router-link>
        <nav class="hidden md:flex space-x-8">
          <router-link to="/" class="text-gray-300 hover:text-white">Dashboard</router-link>
          <router-link to="/pets" class="text-gray-300 hover:text-white">Pets</router-link>
          <router-link to="/medications" class="text-gray-300 hover:text-white">Medications</router-link>
        </nav>
        <button @click="showMobile = !showMobile" class="md:hidden text-gray-300 hover:text-white">
          <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              v-if="!showMobile"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
            <path
              v-else
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div v-if="showMobile" class="md:hidden mt-2 space-y-1 bg-gray-800 p-2 rounded">
          <router-link to="/" class="block px-3 py-2 text-gray-300 hover:text-white rounded">Dashboard</router-link>
          <router-link to="/pets" class="block px-3 py-2 text-gray-300 hover:text-white rounded">Pets</router-link>
          <router-link to="/medications" class="block px-3 py-2 text-gray-300 hover:text-white rounded">Medications</router-link>
        </div>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-6 lg:px-8 py-10 space-y-10">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const showMobile = ref(false)
</script>
