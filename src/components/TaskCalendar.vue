<template>
    <section class="bg-gray-800 border border-gray-700 rounded-lg p-6 space-y-6">
      <h2 class="text-xl font-semibold text-white">Tasks</h2>
  
      <!-- Add vs Edit form -->
      <form
        @submit.prevent="editId === null ? onAdd() : onSaveEdit()"
        class="grid grid-cols-1 md:grid-cols-[1fr,1fr,1fr,auto] gap-3 items-center mb-6"
      >
        <!-- ADD MODE -->
        <template v-if="editId === null">
          <select
            v-model="newTask.petId"
            required
            class="bg-gray-700 text-white border border-gray-600 rounded p-2 focus:ring-2 focus:ring-blue-500"
          >
            <option disabled value="">Select Pet</option>
            <option v-for="p in petsStore.list" :key="p.id" :value="p.id">
              {{ p.name }}
            </option>
          </select>
  
          <input
            v-model="newTask.date"
            type="date"
            required
            class="bg-gray-700 text-white border border-gray-600 rounded p-2 focus:ring-2 focus:ring-blue-500"
          />
  
          <input
            v-model="newTask.title"
            placeholder="Task Title"
            required
            class="bg-gray-700 text-white border border-gray-600 rounded p-2 focus:ring-2 focus:ring-blue-500"
          />
  
          <button
            type="submit"
            class="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded transition"
          >
            Add Task
          </button>
        </template>
  
        <!-- EDIT MODE -->
        <template v-else>
          <select
            v-model="editModel.petId"
            required
            class="bg-gray-700 text-white border border-gray-600 rounded p-2 focus:ring-2 focus:ring-blue-500"
          >
            <option disabled value="">Select Pet</option>
            <option v-for="p in petsStore.list" :key="p.id" :value="p.id">
              {{ p.name }}
            </option>
          </select>
  
          <input
            v-model="editModel.date"
            type="date"
            required
            class="bg-gray-700 text-white border border-gray-600 rounded p-2 focus:ring-2 focus:ring-blue-500"
          />
  
          <input
            v-model="editModel.title"
            placeholder="Task Title"
            required
            class="bg-gray-700 text-white border border-gray-600 rounded p-2 focus:ring-2 focus:ring-blue-500"
          />
  
          <div class="flex space-x-2">
            <button
              type="submit"
              class="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded transition"
            >
              Save
            </button>
            <button
              type="button"
              @click="cancelEdit"
              class="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded transition"
            >
              Cancel
            </button>
          </div>
        </template>
      </form>
  
  
      <!-- Task List -->
      <div v-for="(group, date) in groupedTasks" :key="date" class="mb-4">
        <h3 class="font-medium text-gray-200">{{ date }}</h3>
        <ul class="mt-2 space-y-2">
          <li
            v-for="t in group"
            :key="t.id"
            class="flex justify-between items-center"
          >
            <span class="text-gray-100">
              {{ t.title }}
              <small class="text-gray-400">({{ petName(t.petId) }})</small>
            </span>
            <div class="flex space-x-2">
              <button
                @click="startEdit(t)"
                class="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                @click="remove(t.id)"
                class="bg-red-600 hover:bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        </ul>
      </div>
    </section>
  </template>
  
  <script setup>
  import { ref, onMounted, computed } from 'vue'
  import { useTasksStore }            from '../store/tasks'
  import { usePetsStore }             from '../store/pets'
  
  const tasksStore = useTasksStore()
  const petsStore  = usePetsStore()
  
  const newTask   = ref({ petId: '', date: '', title: '' })
  
  const editId    = ref(null)
  const editModel = ref({ petId: '', date: '', title: '' })
  
  onMounted(async () => {
    await petsStore.fetchPets()
    await tasksStore.fetchTasks()
  })
  
  const groupedTasks = computed(() =>
    tasksStore.list.reduce((acc, t) => {
      ;(acc[t.date] ||= []).push(t)
      return acc
    }, {})
  )
  
  function petName(id) {
    return petsStore.list.find(p => p.id === id)?.name || 'Unknown'
  }
  
  async function onAdd() {
    if (!newTask.value.petId || !newTask.value.date || !newTask.value.title) return
    await tasksStore.addTask({ ...newTask.value })
    newTask.value = { petId: '', date: '', title: '' }
  }
  
  function startEdit(task) {
    editId.value = task.id
    editModel.value = { ...task }
  }
  
  async function onSaveEdit() {
    const id = editId.value
    await tasksStore.removeTask(id)
    await tasksStore.addTask({ id, ...editModel.value })
    editId.value = null
    newTask.value = { petId: '', date: '', title: '' }
  }
  
  function cancelEdit() {
    editId.value = null
  }
  
  function remove(id) {
    tasksStore.removeTask(id)
  }
  </script>