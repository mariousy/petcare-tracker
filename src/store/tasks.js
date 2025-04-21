import { defineStore } from 'pinia'
import axios from 'axios'

export const useTasksStore = defineStore('tasks', {
  state: () => ({
    list: []
  }),
  actions: {
    async fetchTasks() {
      const { data } = await axios.get('/api/tasks')
      this.list = data
    },
    async addTask(task) {
      // ensure new tasks default to not completed
      const { data } = await axios.post('/api/tasks', {
        ...task,
        completed: false,
        completedAt: null
      })
      this.list.push(data)
    },
    async removeTask(id) {
      await axios.delete(`/api/tasks/${id}`)
      this.list = this.list.filter(t => t.id !== id)
    },
    async updateTask(id, fields) {
      const { data } = await axios.patch(`/api/tasks/${id}`, fields)
      this.list = this.list.map(t => t.id === id ? data : t)
    }
  }
})
