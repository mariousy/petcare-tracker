import { defineStore } from 'pinia'
import axios from 'axios'

export const usePetsStore = defineStore('pets', {
  state: () => ({
    list: []
  }),
  actions: {
    async fetchPets() {
      const { data } = await axios.get('/api/pets')
      this.list = data
    },
    async addPet(pet) {
      const { data } = await axios.post('/api/pets', pet)
      this.list.push(data)
    },
    async removePet(id) {
      await axios.delete(`/api/pets/${id}`)
      this.list = this.list.filter(p => p.id !== id)
    }
  }
})
