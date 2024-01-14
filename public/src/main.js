import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')

const axios = require('axios');
axios.defaults.baseURL = 'http://localhost:3000/api';