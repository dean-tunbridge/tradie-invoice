import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import PrimeVue from 'primevue/config'
import { TradesPreset } from './theme'

createApp(App)
  .use(PrimeVue, {
    theme: {
      preset: TradesPreset,
      options: {
        darkModeSelector: 'none',
        cssLayer: { name: 'primevue', order: 'theme, base, primevue' },
      },
    },
  })
  .mount('#app')
