import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useEnv } from '@/composables/useEnv'

import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'
import ConfirmationService from 'primevue/confirmationservice'
import { ToastService } from 'primevue'
import Material from '@primeuix/themes/material'
import googleAuth from 'vue3-google-login'
import OpenLayersMap from 'vue3-openlayers'

import 'primeicons/primeicons.css'
import 'vue3-openlayers/styles.css'
import '@/assets/style.css'

const app = createApp(App)
const env = useEnv()

app.use(createPinia())
app.use(router)
app.use(OpenLayersMap)
app.use(PrimeVue, {
  // Default theme configuration
  theme: {
    preset: Material,
    options: {
      prefix: 'p',
      darkModeSelector: 'system',
      cssLayer: {
        name: 'primevue',
      },
    },
  },
})
app.use(ConfirmationService)
app.use(ToastService)
app.use(googleAuth, {
  // clientId: '1003682943383-bauokm6jh77cq8l23qgf9fj5js0mgh0h.apps.googleusercontent.com',
  clientId: env.GOOGLE_CLIENT_ID,
})

app.mount('#app')
