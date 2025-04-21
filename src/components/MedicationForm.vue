<template>
    <section class="bg-gray-800 border border-gray-700 rounded-lg p-6 space-y-6">
      <h2 class="text-xl font-semibold text-white">Medications</h2>
  
      <!-- inline edit + display list -->
      <ul class="space-y-3">
        <li
          v-for="med in medsStore.list"
          :key="med.id"
          class="flex items-center justify-between"
        >
          <!-- display mode -->
          <div v-if="editId !== med.id" class="flex-1">
            <span class="text-white font-medium">{{ med.name }}</span>
            <span class="text-gray-400">({{ petName(med.petId) }}, {{ med.schedule }})</span>
          </div>
  
          <!-- edit mode -->
          <div v-else class="grid grid-cols-3 gap-3 flex-1">
            <select
              v-model="editModel.petId"
              class="bg-gray-700 text-white border border-gray-600 rounded p-2 focus:ring-2 focus:ring-blue-500"
            >
              <option disabled value="">Pet</option>
              <option v-for="p in petsStore.list" :key="p.id" :value="p.id">{{ p.name }}</option>
            </select>
            <input
              v-model="editModel.name"
              placeholder="Medication"
              class="bg-gray-700 text-white border border-gray-600 rounded p-2 focus:ring-2 focus:ring-blue-500"
            />
            <input
              v-model="editModel.schedule"
              placeholder="Schedule"
              class="bg-gray-700 text-white border border-gray-600 rounded p-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>
  
          <!-- actions -->
          <div class="flex space-x-3 ml-4">
            <button
              v-if="editId !== med.id"
              @click="startMedEdit(med)"
              class="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded"
            >
              Edit
            </button>
            <button
              v-else
              @click="saveMedEdit(med.id)"
              :disabled="!editModel.petId||!editModel.name||!editModel.schedule"
              class="bg-green-600 hover:bg-green-500 text-white px-3 py-1 rounded disabled:opacity-50"
            >
              Save
            </button>
            <button
              v-if="editId === med.id"
              @click="cancelMedEdit"
              class="bg-gray-600 hover:bg-gray-500 text-white px-3 py-1 rounded"
            >
              Cancel
            </button>
            <button
              @click="medsStore.removeMedication(med.id)"
              class="bg-red-600 hover:bg-red-500 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        </li>
      </ul>
  
      <!-- add new -->
      <form
        @submit.prevent="onAdd"
        class="grid grid-cols-1 md:grid-cols-[1fr,1fr,1fr,auto] gap-3 items-center"
      >
        <select
          v-model="newMed.petId"
          required
          class="bg-gray-700 text-white border border-gray-600 rounded p-2 focus:ring-2 focus:ring-blue-500"
        >
          <option disabled value="">Select Pet</option>
          <option v-for="p in petsStore.list" :key="p.id" :value="p.id">{{ p.name }}</option>
        </select>
        <input
          v-model="newMed.name"
          placeholder="Medication Name"
          required
          class="bg-gray-700 text-white border border-gray-600 rounded p-2 focus:ring-2 focus:ring-blue-500"
        />
        <input
          v-model="newMed.schedule"
          placeholder="e.g. Monthly"
          required
          class="bg-gray-700 text-white border border-gray-600 rounded p-2 focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          class="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded transition"
        >
          Add Medication
        </button>
      </form>
    </section>
  </template>
  
  <script setup>
  import { ref, onMounted }      from 'vue'
  import { usePetsStore }        from '../store/pets'
  import { useMedicationsStore } from '../store/medications'
  
  const petsStore = usePetsStore()
  const medsStore = useMedicationsStore()
  
  const newMed    = ref({ petId: '', name: '', schedule: '' })
  
  // inline-edit state for meds
  const editId    = ref(null)
  const editModel = ref({ petId: '', name: '', schedule: '' })
  
  onMounted(async () => {
    await petsStore.fetchPets()
    await medsStore.fetchMedications()
  })
  
  function petName(id) {
    return petsStore.list.find(p => p.id === id)?.name || 'Unknown'
  }
  
  async function onAdd() {
    if (!newMed.value.petId || !newMed.value.name || !newMed.value.schedule) return
    await medsStore.addMedication({ ...newMed.value })
    newMed.value = { petId: '', name: '', schedule: '' }
  }
  
  function startMedEdit(med) {
    editId.value = med.id
    editModel.value = { petId: med.petId, name: med.name, schedule: med.schedule }
  }
  
  async function saveMedEdit(id) {
    await medsStore.removeMedication(id)
    await medsStore.addMedication({ id, ...editModel.value })
    editId.value = null
  }
  
  function cancelMedEdit() {
    editId.value = null
  }
  </script>
  