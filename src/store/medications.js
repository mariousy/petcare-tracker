import { defineStore } from 'pinia'
import axios from 'axios'

export const useMedicationsStore = defineStore('medications', {
  state: () => ({
    list: []
  }),
  actions: {
    async fetchMedications() {
      const { data } = await axios.get('/api/medications')
      this.list = data
    },
    async addMedication(med) {
      const { data } = await axios.post('/api/medications', med)
      this.list.push(data)
    },
    async removeMedication(id) {
      await axios.delete(`/api/medications/${id}`)
      this.list = this.list.filter(m => m.id !== id)
    }
  }
})
