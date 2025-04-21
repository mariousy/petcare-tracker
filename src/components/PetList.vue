<template>
    <section class="bg-gray-800 border border-gray-700 rounded-lg p-6">
      <h2 class="text-xl font-semibold mb-4 text-white">My Pets</h2>
  
      <ul class="space-y-3 mb-6">
        <li
          v-for="pet in petsStore.list"
          :key="pet.id"
          class="flex items-center"
        >
          <!-- Display vs Edit -->
          <div v-if="editId !== pet.id" class="flex-1">
            <span class="font-medium text-white">{{ pet.name }}</span>
            <span class="text-gray-400">({{ pet.type }})</span>
          </div>
          <div v-else class="grid grid-cols-2 gap-3 flex-1">
            <input
              v-model="editModel.name"
              class="bg-gray-700 text-white border border-gray-600 rounded p-2 focus:ring-2 focus:ring-blue-500"
            />
            <input
              v-model="editModel.type"
              class="bg-gray-700 text-white border border-gray-600 rounded p-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>
  
          <!-- Action Buttons -->
          <div class="flex space-x-3 ml-4">
            <button
              v-if="editId !== pet.id"
              @click="startEdit(pet)"
              class="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded"
            >
              Edit
            </button>
  
            <button
              v-if="editId === pet.id"
              @click="saveEdit(pet.id)"
              :disabled="!editModel.name || !editModel.type"
              class="bg-green-600 hover:bg-green-500 text-white px-3 py-1 rounded disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Save
            </button>
  
            <button
              v-if="editId === pet.id"
              @click="cancelEdit"
              class="bg-gray-600 hover:bg-gray-500 text-white px-3 py-1 rounded"
            >
              Cancel
            </button>
  
            <button
              @click="petsStore.removePet(pet.id)"
              class="bg-red-600 hover:bg-red-500 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        </li>
      </ul>
  
      <!-- Add New Pet -->
      <form @submit.prevent="onAdd" class="grid grid-cols-1 sm:grid-cols-[1fr,1fr,auto] gap-3">
        <input
          v-model="newPet.name"
          type="text"
          placeholder="Name"
          required
          class="bg-gray-700 text-white border border-gray-600 rounded p-2 focus:ring-2 focus:ring-blue-500"
        />
        <input
          v-model="newPet.type"
          type="text"
          placeholder="Type"
          required
          class="bg-gray-700 text-white border border-gray-600 rounded p-2 focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          class="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded transition"
        >
          Add Pet
        </button>
      </form>
    </section>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { usePetsStore }   from '../store/pets'
  
  const petsStore = usePetsStore()
  const newPet    = ref({ name: '', type: '' })
  
  // Inline editing state
  const editId    = ref(null)
  const editModel = ref({ name: '', type: '' })
  
  onMounted(() => petsStore.fetchPets())
  
  async function onAdd() {
    if (!newPet.value.name || !newPet.value.type) return
    await petsStore.addPet({ ...newPet.value })
    newPet.value = { name: '', type: '' }
  }
  
  function startEdit(pet) {
    editId.value = pet.id
    editModel.value = { name: pet.name, type: pet.type }
  }
  
  async function saveEdit(id) {
    await petsStore.removePet(id)       // mock PUT
    await petsStore.addPet({ id, ...editModel.value })
    editId.value = null
  }
  
  function cancelEdit() {
    editId.value = null
  }
  </script>
  