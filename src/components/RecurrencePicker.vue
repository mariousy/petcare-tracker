<template>
    <div class="space-y-2">
      <label class="block text-gray-300">Recurrence</label>
      <select
        v-model="freq"
        class="bg-gray-700 text-white border border-gray-600 rounded p-2 w-full"
      >
        <option value="">None</option>
        <option value="DAILY">Daily</option>
        <option value="WEEKLY">Weekly</option>
        <option value="MONTHLY">Monthly</option>
        <option value="CUSTOM">Custom...</option>
      </select>
  
      <!-- custom options -->
      <div v-if="freq === 'CUSTOM'" class="grid grid-cols-2 gap-3">
        <div>
          <label class="block text-gray-300">Interval</label>
          <input
            type="number"
            v-model.number="interval"
            min="1"
            class="bg-gray-700 text-white border border-gray-600 rounded p-2 w-full"
          />
        </div>
        <div>
          <label class="block text-gray-300">Until</label>
          <input
            type="date"
            v-model="until"
            class="bg-gray-700 text-white border border-gray-600 rounded p-2 w-full"
          />
        </div>
        <div class="col-span-2">
          <label class="block text-gray-300 mb-1">Weekdays</label>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="day in weekdays"
              :key="day.value"
              type="button"
              @click="toggleWeekday(day.value)"
              :class="{
                'bg-blue-600 text-white': byweekday.includes(day.value),
                'bg-gray-600 text-gray-300': !byweekday.includes(day.value)
              }"
              class="px-2 py-1 rounded"
            >
              {{ day.label }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, watch, onMounted } from 'vue'
  import { RRule } from 'rrule'
  
  // props
  defineProps({
    modelValue: { type: String, default: '' }
  })
  const emit = defineEmits(['update:modelValue'])
  
  // local config
  const freq     = ref('')
  const interval = ref(1)
  const until    = ref('')
  const byweekday= ref([])
  
  // map for weekdays
  const weekdays = [
    { value: RRule.MO, label: 'Mon' },
    { value: RRule.TU, label: 'Tue' },
    { value: RRule.WE, label: 'Wed' },
    { value: RRule.TH, label: 'Thu' },
    { value: RRule.FR, label: 'Fri' },
    { value: RRule.SA, label: 'Sat' },
    { value: RRule.SU, label: 'Sun' },
  ]
  
  // toggle weekday in array
  function toggleWeekday(d) {
    byweekday.value = byweekday.value.includes(d)
      ? byweekday.value.filter(x => x !== d)
      : [...byweekday.value, d]
  }
  
  // whenever config changes, rebuild rule
  watch([freq, interval, until, byweekday], () => {
    if (!freq.value) {
      emit('update:modelValue', '')
      return
    }
    const opts = {
      freq: RRule[freq.value],
      interval: interval.value
    }
    if (until.value) opts.until = new Date(until.value)
    if (freq.value === 'WEEKLY' || freq.value === 'CUSTOM')
      opts.byweekday = byweekday.value
    const rule = new RRule(opts)
    emit('update:modelValue', rule.toString())
  })
  
  // parse incoming modelValue into config (basic)
  onMounted(() => {
    if (!modelValue) return
    try {
      const rule = RRule.fromString(modelValue)
      freq.value     = RRule.FREQUENCIES[rule.options.freq]
      interval.value = rule.options.interval || 1
      byweekday.value= rule.options.byweekday || []
      if (rule.options.until)
        until.value = rule.options.until.toISOString().slice(0,10)
    } catch {}
  })
  </script>
  