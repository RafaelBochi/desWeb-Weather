import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)


import './plugins/axios'

import { library } from '@fortawesome/fontawesome-svg-core'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'


import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons'

import { faEye, faEyeSlash, faUser, faEnvelope, faRightFromBracket, faHeart as fasHeart} from '@fortawesome/free-solid-svg-icons'

library.add(faEye, faEyeSlash, faUser, faEnvelope, faRightFromBracket, farHeart, fasHeart)

app.use(createPinia())
app.use(router)
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')
